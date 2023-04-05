import React, { useContext, useEffect, useState } from 'react';
import CardStack from '../components/CardStack';
import { Recipe } from '../types';
import recipeService from '../services/RecipeService';
import { SessionWebsocketContext } from '../contexts/SessionContext';

export default function HomeScreen() {
    const [data, setData] = useState<Recipe[]>([]);
    const { currentSession, setCurrentSession } = useContext(
        SessionWebsocketContext
    );

    useEffect(() => {
        setCurrentSession('MNwEX2e8mo9OGWqQ/DMmQkBb7gbEv47q2');
        recipeService.fetchRecipes().then((recipes) => {
            setData(recipes);
        });
    }, [currentSession, setCurrentSession]);

    return <CardStack recipes={data} />;
}
