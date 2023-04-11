import React, { useContext, useEffect, useState } from 'react';
import CardStack from '../components/CardStack';
import { Recipe } from '../types';
import recipeService from '../services/RecipeService';
import { SessionWebsocketContext } from '../contexts/SessionContext';
import { View } from 'react-native';
import tw from '../lib/tailwind';

export default function HomeScreen() {
    const [data, setData] = useState<Recipe[]>([]);
    const { currentSession, setCurrentSession } = useContext(
        SessionWebsocketContext
    );
    const sessionId = '5BdWlO3lzqxyEp8g';
    const userId = '5BdWlO3lzqxyEp8g';

    useEffect(() => {
        setCurrentSession(`${sessionId}/${userId}`);
        recipeService.fetchRecipes().then((recipes) => {
            setData(recipes);
        });
    }, [currentSession, setCurrentSession]);

    return (
        <View style={tw`w-full h-full overflow-hidden`}>
            <CardStack recipes={data} />
        </View>
    );
}
