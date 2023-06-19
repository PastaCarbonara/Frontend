import React, { useContext, useEffect } from 'react';
import CardStack from '../components/CardStack';
import { ActivityIndicator, Text, View } from 'react-native';
import tw from '../lib/tailwind';
import { SessionWebsocketContext } from '../contexts/SessionContext';
import { WebSocketAction } from '../types';

export default function HomeScreen() {
    const {
        isReady,
        currentGroup,
        groupsWithActiveSession,
        recipes,
        setRecipes,
        send,
        fetchingRecipes,
    } = useContext(SessionWebsocketContext);
    useEffect(() => {
        if (isReady && !fetchingRecipes && recipes.length < 3) {
            send({
                action: WebSocketAction.GET_RECIPES,
            });
        }
    }, [fetchingRecipes, isReady, recipes, send]);

    return (
        <View style={tw`w-full h-full overflow-hidden`}>
            {fetchingRecipes ? (
                <View style={tw`flex-1 items-center justify-center`}>
                    <ActivityIndicator size="large" color="gray" />
                    <Text style={tw`text-2xl mt-2 text-gray-500`}>
                        Gerechten worden geladen...
                    </Text>
                </View>
            ) : groupsWithActiveSession.length < 1 ? (
                <View style={tw`flex-1 items-center justify-center`}>
                    <Text style={tw`text-2xl text-gray-500`}>
                        Geen actieve sessies gevonden
                    </Text>
                </View>
            ) : !isReady ? (
                <View style={tw`flex-1 items-center justify-center`}>
                    <ActivityIndicator size="large" color="gray" />
                    <Text style={tw`text-2xl mt-2 text-gray-500`}>
                        Verbinding maken met de server...
                    </Text>
                </View>
            ) : recipes.length === 0 ? (
                <View style={tw`flex-1 items-center justify-center`}>
                    <Text style={tw`text-2xl text-gray-500`}>
                        Geen recepten gevonden
                    </Text>
                </View>
            ) : (
                <CardStack
                    recipes={recipes}
                    key={currentGroup}
                    onRecipeSwipe={(recipeId) => {
                        const newRecipes = recipes.filter(
                            (recipe) => recipe.id !== recipeId
                        );
                        localStorage.setItem(
                            `${currentGroup}-recipes`,
                            JSON.stringify(newRecipes)
                        );
                        setRecipes(newRecipes);
                    }}
                />
            )}
        </View>
    );
}
