import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as RootNavigator from '../RootNavigator';
import {
    Group,
    SwipeSession,
    SwipeSessionStatus,
    WebSocketAction,
    WebSocketEvent,
} from '../types';
import { SOCKET_URL } from '@env';
import groupService from '../services/GroupService';
import { cookieHelper } from '../helpers/CookieHelper';
import { AuthContext } from './AuthContext';
import userService from '../services/UserService';

export type SessionContextType = {
    isReady: boolean;
    lastMessage: {};
    send: (webSocketEvent: WebSocketEvent) => void;
    currentSession: string | undefined;
    currentGroup: string | undefined;
    setCurrentGroup: (group: string | undefined) => void;
    userId: string | undefined;
    sessionId: string | undefined;
};

export const SessionWebsocketContext = React.createContext<SessionContextType>(
    {} as SessionContextType
);

export const SessionWebsocketProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [isReady, setIsReady] = useState(false);
    const [lastMessage, setLastMessage] = useState({});
    const [currentSession, setCurrentSession] = useState<string | undefined>(
        undefined
    );
    const [currentGroup, setCurrentGroup] = useState<string | undefined>(
        cookieHelper.getCookie('currentGroup')
    );
    const [sessionId, setSessionId] = useState<string | undefined>(undefined);
    const { authData, verifyToken } = React.useContext(AuthContext);
    const { me } = userService.useMe();
    const { groups } = groupService.useGroups();
    const { group } = groupService.useGroup(currentGroup);

    const ws: React.MutableRefObject<WebSocket | null> = useRef(null);
    const findGroupsWithActiveSession = useCallback(
        (_groups: Group[]) =>
            _groups?.filter((_group: Group) => {
                for (const swipe_session of _group.swipe_sessions) {
                    if (
                        swipe_session.status === SwipeSessionStatus.IN_PROGRESS
                    ) {
                        return true;
                    }
                }
                return false;
            }),
        []
    );
    const groupHasActiveSession = useCallback(
        (_groupId: string) => {
            const _currentGroup = groups?.find(
                (_group: Group) => _group.id === _groupId
            );
            for (const swipe_session of _currentGroup.swipe_sessions) {
                if (swipe_session.status === SwipeSessionStatus.IN_PROGRESS) {
                    return true;
                }
            }
            return false;
        },
        [groups]
    );

    useEffect(() => {
        if (!currentSession) {
            return;
        }
        const access_token = cookieHelper.getCookie('access_token');
        const sessionWebSocketAddress = `${SOCKET_URL}/swipe_sessions/${currentSession}?token=${access_token}`;
        const socket = new WebSocket(sessionWebSocketAddress);

        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    action: WebSocketAction.POOL_MESSAGE,
                    payload: {
                        message: 'User connected succesfully',
                    },
                })
            );
            setIsReady(true);
        };
        socket.onclose = () => setIsReady(false);
        socket.onmessage = (event) => {
            setLastMessage(event.data);

            handleWebSocketEvent(JSON.parse(event.data));
        };
        socket.onerror = (error) => {
            console.log(error);
        };

        ws.current = socket;

        return () => {
            socket.close();
        };
    }, [currentGroup, currentSession]);

    useEffect(() => {
        console.log('useEffect');
        const fetchInitialData = async () => {
            if (!currentGroup && (groups === undefined || groups?.length < 1))
                return;
            if (
                (!currentGroup && groups?.length > 0) ||
                (currentGroup &&
                    groups?.length > 0 &&
                    !groupHasActiveSession(currentGroup))
            ) {
                const groupsWithActiveSession =
                    findGroupsWithActiveSession(groups);
                setCurrentGroup(groupsWithActiveSession[0]?.id);
                cookieHelper.setCookie(
                    'currentGroup',
                    groupsWithActiveSession[0]?.id,
                    365000
                );
                return;
            }
            try {
                if (!group) return;
                const activeSession = group.swipe_sessions.find(
                    (session: SwipeSession) => session.status === 'Is bezig'
                );
                if (activeSession) {
                    setSessionId(activeSession.id);
                    setCurrentSession(`${activeSession.id}`);
                } else {
                    console.log('No active session found');
                    setSessionId(undefined);
                }
            } catch (error) {
                console.log('Error fetching user or group:', error);
            }
        };
        void fetchInitialData();
    }, [
        currentGroup,
        authData,
        verifyToken,
        groups,
        group,
        findGroupsWithActiveSession,
        groupHasActiveSession,
    ]);
    const send = (webSocketEvent: WebSocketEvent) => {
        ws.current?.send(JSON.stringify(webSocketEvent));
    };
    const handleWebSocketEvent = (messageEvent: {
        action: any;
        payload: any;
    }) => {
        switch (messageEvent.action) {
            case 'RECIPE_MATCH':
                console.log('RECIPE_MATCH', messageEvent.payload);
                RootNavigator.navigate('Match', {
                    recipe: messageEvent.payload?.recipe,
                });
                break;
        }
    };

    const session: SessionContextType = React.useMemo(
        () => ({
            isReady,
            lastMessage,
            currentSession,
            setCurrentSession,
            currentGroup,
            setCurrentGroup,
            send,
            userId: me?.id,
            sessionId,
        }),
        [isReady, lastMessage, currentSession, currentGroup, me, sessionId]
    );

    return (
        <SessionWebsocketContext.Provider value={session}>
            {children}
        </SessionWebsocketContext.Provider>
    );
};
