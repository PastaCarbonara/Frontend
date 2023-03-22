import React, {useEffect, useRef, useState} from "react";

export type SessionContextType = {
    isReady: Boolean;
    val: {};
    send: (payload: any) => void;
}

export const SessionWebsocketContext = React.createContext<SessionContextType>({} as SessionContextType);

export const SessionWebsocketProvider = ({children}) => {
    const [isReady, setIsReady] = useState(false);
    const [val, setVal] = useState(null);

    const ws = useRef(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/api/latest/swipe_sessions/DMmQkBb7gbEv47q2/DMmQkBb7gbEv47q2");

        socket.onopen = () => {
            socket.send(
                JSON.stringify({
                    message: 'User connected to session'
                })
            )
            setIsReady(true)
        };
        socket.onclose = () => setIsReady(false);
        socket.onmessage = (event) => {
            setVal(event.data)
        };

        ws.current = socket;

        return () => {
            socket.close();
        };
    }, []);

    const send = (payload) => {
        ws.current?.send(payload)
    }

    const session: SessionContextType = React.useMemo(
        () => ({
            isReady,
            val,
            send,
        }), [val, isReady]);


    return (
        <SessionWebsocketContext.Provider value={session}>
            {children}
        </SessionWebsocketContext.Provider>
    );
}