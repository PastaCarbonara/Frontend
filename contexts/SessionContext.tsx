import React, { useEffect, useRef, useState } from 'react'
import * as RootNavigator from '../RootNavigator'

export type SessionContextType = {
    isReady: Boolean;
    lastMessage: {};
    send: (payload: any) => void;
};

export const SessionWebsocketContext = React.createContext<SessionContextType>(
    {} as SessionContextType
);

export const SessionWebsocketProvider = ({ children }) => {
    const [isReady, setIsReady] = useState(false);
    const [lastMessage, setLastMessage] = useState({});

    const ws: React.MutableRefObject<WebSocket | null> = useRef(null);

    useEffect(() => {
        const socket = new WebSocket(
            'ws://localhost:8000/api/latest/swipe_sessions/MNwEX2e8mo9OGWqQ/DMmQkBb7gbEv47q2'
        );

        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    action: 'REQUEST_SESSION_MESSAGE',
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
    }, []);

    const send = (payload) => {
        ws.current?.send(payload);
    };

    const handleWebSocketEvent = (messageEvent: { action: any; payload: any; }) => {
        console.log(messageEvent)
        switch(messageEvent.action) {
            case 'RESPONSE_RECIPE_MATCH':
                console.log('RESPONSE_RECIPE_MATCH', messageEvent.payload);
                RootNavigator.navigate('Match', { recipe: messageEvent.payload?.recipe });
                break;
        }
    }

    const session: SessionContextType = React.useMemo(
        () => ({
            isReady,
            lastMessage,
            send,
        }),
        [lastMessage, isReady]
    );

    return (
        <SessionWebsocketContext.Provider value={session}>
            {children}
        </SessionWebsocketContext.Provider>
    );
};
