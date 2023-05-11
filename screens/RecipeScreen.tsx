import React from 'react';
import RecipeInfo from '../components/RecipeInfo';
import recipeService from '../services/RecipeService';
import { ActivityIndicator, View, Text } from 'react-native';
import tw from '../lib/tailwind';

export default function RecipeScreen({ route }: { route: any }) {
    const { id } = route.params;
    const { recipe, isLoading } = recipeService.useRecipe(id);

    return (
        <>
            {isLoading ? (
                <View style={tw`flex-1 grow items-center justify-center`}>
                    <ActivityIndicator size="large" color="gray" />
                </View>
            ) : recipe ? (
                <RecipeInfo recipeInfo={recipe} />
            ) : (
                <View style={tw`flex-1 items-center justify-center`}>
                    <Text style={tw`text-2xl text-gray-500`}>
                        Geen recept gevonden
                    </Text>
                </View>
            )}
        </>
    );
}
