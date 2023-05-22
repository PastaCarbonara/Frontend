import React from 'react';
import CardStack from '../components/CardStack';
import recipeService from '../services/RecipeService';
import { ActivityIndicator, Text, View } from 'react-native';
import tw from '../lib/tailwind';

export default function HomeScreen() {
    const { recipes, isLoading } = recipeService.useRecipes();

    return (
        <View style={tw`w-full h-full overflow-hidden`}>
            {isLoading ? (
                <View style={tw`flex-1 items-center justify-center`}>
                    <ActivityIndicator size="large" color="gray" />
                    <Text style={tw`text-2xl mt-2 text-gray-500`}>
                        Gerechten worden geladen...
                    </Text>
                </View>
            ) : recipes?.length === 0 ? (
                <View style={tw`flex-1 items-center justify-center`}>
                    <Text style={tw`text-2xl text-gray-500`}>
                        Geen recepten gevonden
                    </Text>
                </View>
            ) : (
                <CardStack recipes={recipes} />
            )}
        </View>
    );
}
