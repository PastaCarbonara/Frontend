import React, { useContext, useEffect, useState } from 'react';
import CardStack from '../components/CardStack';
import { Group, Recipe, SwipeSession } from '../types';
import recipeService from '../services/RecipeService';
import { SessionWebsocketContext } from '../contexts/SessionContext';
import { Text, View } from 'react-native';
import tw from '../lib/tailwind';
import userService from '../services/UserService';
import groupService from '../services/GroupService';

export default function HomeScreen() {
    const [data, setData] = useState<Recipe[]>([]);
    const [userId, setUserId] = useState<string | undefined>(undefined);
    const [sessionId, setSessionId] = useState<string | undefined>(undefined);
    const { currentSession, setCurrentSession } = useContext(
        SessionWebsocketContext
    );

    useEffect(() => {
        userService.fetchMe().then((user) => {
            setUserId(user.id);
        });
        groupService.fetchGroups().then((groups: Group[]) => {
            // Find the group with status "active"
            const activeSession = groups[0]?.swipe_sessions.find(
                (session: SwipeSession) => session.status === 'Is bezig'
            );
            if (activeSession) {
                setSessionId(activeSession.id);
            } else {
                console.log('No active session found');
                setSessionId(undefined);
            }
        });
        recipeService.fetchRecipes().then((recipes) => {
            setData(recipes);
        });
    }, [currentSession, setCurrentSession]);

    useEffect(() => {
        if (sessionId && userId) {
            setCurrentSession(`${sessionId}/${userId}`);
        }
    }, [sessionId, setCurrentSession, userId]);

    return (
        <View style={tw`w-full h-full overflow-hidden`}>
            {data.length === 0 ? (
                <View style={tw`flex-1 items-center justify-center`}>
                    <Text style={tw`text-2xl text-gray-500`}>
                        Recepten worden geladen...
                    </Text>
                </View>
            ) : (
                <CardStack recipes={data} />
            )}
        </View>
    );
}
