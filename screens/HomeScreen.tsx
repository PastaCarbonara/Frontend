import React, { useEffect, useState } from 'react';
import CardStack from '../components/CardStack';
import { Recipe } from '../types';
import recipeService from '../services/RecipeService';
import { Text, View } from 'react-native';
import tw from '../lib/tailwind';

export default function HomeScreen() {
    const [data, setData] = useState<Recipe[]>([]);

    useEffect(() => {
        recipeService.fetchRecipes().then((recipes) => {
            setData(recipes);
        });
    }, []);
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
