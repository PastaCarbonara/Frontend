import React, { useEffect, useState } from 'react';
import CardStack from '../components/CardStack';
import { Recipe } from '../types';
import recipeService from '../services/RecipeService';

export default function Home() {
    const [data, setData] = useState<Recipe[]>([]);

    useEffect(() => {
        recipeService.fetchRecipes().then((recipes) => {
            setData(recipes);
        });
    }, []);

    return <CardStack recipes={data} />;
}
