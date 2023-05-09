import React, { useEffect, useRef, useState } from 'react';
import * as RootNavigator from '../RootNavigator';
import { SwipeSession, User, WebSocketAction, WebSocketEvent } from '../types';
import { SOCKET_URL } from '@env';
import userService from '../services/UserService';
import groupService from '../services/GroupService';
import { cookieHelper } from '../helpers/CookieHelper';
import { AuthContext } from './AuthContext';

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
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [currentGroup, setCurrentGroup] = useState<string | undefined>(
        cookieHelper.getCookie('currentGroup')
    );
    const [sessionId, setSessionId] = useState<string | undefined>(undefined);
    const { verifyToken } = React.useContext(AuthContext);

    const ws: React.MutableRefObject<WebSocket | null> = useRef(null);

    useEffect(() => {
        if (!currentSession) {
            return;
        }
        const sessionWebSocketAddress = `${SOCKET_URL}/swipe_sessions/${currentSession}`;
        const socket = new WebSocket(sessionWebSocketAddress);

        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    action: WebSocketAction.SESSION_MESSAGE,
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
    }, [currentSession]);

    useEffect(() => {
        if (!currentGroup) {
            verifyToken().then((isVerified) => {
                if (!isVerified) return;
                groupService.fetchGroups().then((groups) => {
                    if (groups && groups.length > 0) {
                        setCurrentGroup(groups[0].id);
                    }
                });
                return;
            });
            return;
        }
        cookieHelper.setCookie('currentGroup', currentGroup, 365000);
        userService.fetchMe().then((user: User) => {
            setUserId(user.id);
            groupService.fetchGroupInfo(currentGroup).then((group) => {
                const activeSession = group.swipe_sessions.find(
                    (session: SwipeSession) => session.status === 'Is bezig'
                );
                if (activeSession) {
                    setSessionId(activeSession.id);
                    setCurrentSession(`${activeSession.id}/${user.id}`);
                } else {
                    console.log('No active session found');
                    setSessionId(undefined);
                }
            });
        });
    }, [currentGroup, verifyToken]);

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
            userId,
            sessionId,
        }),
        [isReady, lastMessage, currentSession, currentGroup, userId, sessionId]
    );

    return (
        <SessionWebsocketContext.Provider value={session}>
            {children}
        </SessionWebsocketContext.Provider>
    );
};
