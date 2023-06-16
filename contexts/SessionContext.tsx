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
    const [recipes, setRecipes] = useState<Recipe[]>(
        //json parse the cookie or return an empty array, but the cookie could also be undefined so we need to check for that
        cookieHelper.getCookie('recipes') === undefined
            ? []
            : JSON.parse(cookieHelper.getCookie('recipes') || '[]')
    );

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
                    RootNavigator.navigate('Match', {
                        recipe: messageEvent.payload?.recipe,
                    });
                    break;
                case 'RECIPE_SWIPE':
                    console.log('RECIPE_SWIPE', messageEvent.payload);
                    break;
                case 'GET_RECIPES':
                    console.log('GET_RECIPES', messageEvent.payload);
                    const newRecipes = [
                        ...recipes,
                        ...messageEvent.payload?.recipes,
                    ];
                    console.log('newRecipes', JSON.stringify(newRecipes));
                    console.log('setting cookie');
                    cookieHelper.setCookie(
                        'recipes',
                        JSON.stringify(newRecipes),
                        14
                    );
                    console.log('cookie set');
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
            // If recipes are not set, get them from the server
            getRecipes();
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
        const findGroupsWithActiveSession = (_groups: Group[]) =>
            _groups?.filter((_group: Group) => {
                for (const swipe_session of _group.swipe_sessions) {
                    if (
                        swipe_session.status === SwipeSessionStatus.IN_PROGRESS
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
    const send = useCallback((webSocketEvent: WebSocketEvent) => {
        ws.current?.send(JSON.stringify(webSocketEvent));
    }, []);

    const getRecipes = useCallback(() => {
        if (recipes.length > 0) return;
        send({
            action: WebSocketAction.GET_RECIPES,
        });
    }, [recipes.length, send]);

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
        }),
        [
            isReady,
            lastMessage,
            currentSession,
            currentGroup,
            send,
            me?.id,
            sessionId,
            groupsWithActiveSession,
            recipes,
        ]
    );

    return (
        <SessionWebsocketContext.Provider value={session}>
            {children}
        </SessionWebsocketContext.Provider>
    );
};
