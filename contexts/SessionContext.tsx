import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as RootNavigator from '../RootNavigator';
import {
    Group,
    Recipe,
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
import { mutate } from 'swr';

export type SessionContextType = {
    isReady: boolean;
    lastMessage: {};
    send: (webSocketEvent: WebSocketEvent) => void;
    currentSession: string | undefined;
    currentGroup: string | undefined;
    setCurrentGroup: (group: string | undefined) => void;
    userId: string | undefined;
    sessionId: string | undefined;
    groupsWithActiveSession: Group[];
    recipes: Recipe[];
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
    fetchingRecipes: boolean;
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
    const [groupsWithActiveSession, setGroupsWithActiveSession] = useState<
        Group[]
    >([]);
    const [recipes, setRecipes] = useState<Recipe[]>(() => {
        const localData = localStorage.getItem(`${sessionId}-recipes`);
        return localData !== null ? JSON.parse(localData) : [];
    });
    const [fetchingRecipes, setFetchingRecipes] = useState(false);

    const ws: React.MutableRefObject<WebSocket | null> = useRef(null);

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

        const handleWebSocketEvent = async (messageEvent: {
            action: WebSocketAction;
            payload: any;
        }) => {
            switch (messageEvent.action) {
                case 'RECIPE_MATCH':
                    console.log('RECIPE_MATCH', messageEvent.payload);
                    await mutate('/me/groups');
                    await mutate(`/groups/${currentGroup}`);
                    cookieHelper.deleteCookie('currentGroup');
                    localStorage.removeItem(`${sessionId}-recipes`);
                    socket.close();
                    RootNavigator.navigate('Match', {
                        recipe: messageEvent.payload?.recipe,
                    });
                    break;
                case 'GET_RECIPES':
                    console.log('GET_RECIPES', messageEvent.payload);
                    //append new recipes to existing recipes in localstorage
                    const localData = localStorage.getItem(
                        `${sessionId}-recipes`
                    );
                    const localRecipes =
                        localData !== null ? JSON.parse(localData) : [];
                    const newRecipes = [
                        ...localRecipes,
                        ...messageEvent.payload?.recipes,
                    ];
                    localStorage.setItem(
                        `${sessionId}-recipes`,
                        JSON.stringify(newRecipes)
                    );
                    setRecipes(newRecipes);
                    setFetchingRecipes(false);
                    break;
            }
        };

        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    action: WebSocketAction.POOL_MESSAGE,
                    payload: {
                        message: 'User connected succesfully',
                    },
                })
            );
            setRecipes(
                JSON.parse(localStorage.getItem(`${sessionId}-recipes`) || '[]')
            );
            setIsReady(true);
            console.log('User connected succesfully');
        };
        socket.onclose = () => {
            console.log('Session closed');
            setIsReady(false);
        };
        socket.onmessage = async (event) => {
            setLastMessage(event.data);

            await handleWebSocketEvent(JSON.parse(event.data));
        };
        socket.onerror = (error) => {
            console.log(error);
        };

        ws.current = socket;

        return () => {
            socket.close();
        };
    }, [currentGroup, currentSession, sessionId]);

    useEffect(() => {
        const findGroupsWithActiveSession = (_groups: Group[]) =>
            _groups?.filter((_group: Group) => {
                for (const swipe_session of _group.swipe_sessions) {
                    if (
                        swipe_session.status ===
                            SwipeSessionStatus.IN_PROGRESS &&
                        !(
                            new Date(swipe_session.session_date) <=
                            new Date(new Date().toDateString())
                        )
                    ) {
                        return true;
                    }
                }
                return false;
            });
        const fetchInitialData = async () => {
            if (!currentGroup && (groups === undefined || groups?.length < 1))
                return;
            if (
                (!currentGroup && groups?.length > 0) ||
                (currentGroup &&
                    groups?.length > 0 &&
                    !groupHasActiveSession(currentGroup))
            ) {
                const _groupsWithActiveSession =
                    findGroupsWithActiveSession(groups);
                setGroupsWithActiveSession(_groupsWithActiveSession);
                setCurrentGroup(_groupsWithActiveSession[0]?.id);
                cookieHelper.setCookie(
                    'currentGroup',
                    _groupsWithActiveSession[0]?.id,
                    365000
                );
                return;
            }
            if (groups?.length > 0) {
                setGroupsWithActiveSession(findGroupsWithActiveSession(groups));
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
        groupHasActiveSession,
    ]);
    const send = (webSocketEvent: WebSocketEvent) => {
        if (webSocketEvent.action === 'GET_RECIPES') {
            setFetchingRecipes(true);
        }
        ws.current?.send(JSON.stringify(webSocketEvent));
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
            groupsWithActiveSession,
            recipes,
            setRecipes,
            fetchingRecipes,
        }),
        [
            isReady,
            lastMessage,
            currentSession,
            currentGroup,
            me?.id,
            sessionId,
            groupsWithActiveSession,
            recipes,
            fetchingRecipes,
        ]
    );

    return (
        <SessionWebsocketContext.Provider value={session}>
            {children}
        </SessionWebsocketContext.Provider>
    );
};
