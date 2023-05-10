import React, { useEffect, useState } from 'react';
import CardStack from '../components/CardStack';
import { Recipe } from '../types';
import recipeService from '../services/RecipeService';
import { ActivityIndicator, Text, View } from 'react-native';
import tw from '../lib/tailwind';

export default function HomeScreen() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedRecipes = await recipeService.fetchRecipes();
                setRecipes(fetchedRecipes);
            } catch (error) {
                console.log('Failed to fetch recipes:', error);
            } finally {
                setIsLoading(false);
            }
        };
        void fetchData();
    }, []);
    return (
        <View style={tw`w-full h-full overflow-hidden`}>
            {isLoading ? (
                <View style={tw`flex-1 items-center justify-center`}>
                    <ActivityIndicator size="large" color="gray" />
                    <Text style={tw`text-2xl mt-2 text-gray-500`}>
                        Gerechten worden geladen...
                    </Text>
                </View>
            ) : recipes.length === 0 ? (
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
