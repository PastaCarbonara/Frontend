import React, { useEffect, useRef, useState } from 'react';
import * as RootNavigator from '../RootNavigator';
import { WebSocketAction, WebSocketEvent } from '../types';
import { SOCKET_URL } from '@env';

export type SessionContextType = {
    isReady: boolean;
    lastMessage: {};
    send: (webSocketEvent: WebSocketEvent) => void;
    currentSession: string | undefined;
    setCurrentSession: (session: string | undefined) => void;
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
            send,
        }),
        [isReady, lastMessage, currentSession]
    );

    return (
        <SessionWebsocketContext.Provider value={session}>
            {children}
        </SessionWebsocketContext.Provider>
    );
};
