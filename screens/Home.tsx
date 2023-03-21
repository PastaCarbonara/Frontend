import React, {useEffect, useState} from 'react';
import CardStack from "../components/Swiper";
import {Recipe} from "../types";
import recipeService from "../services/recipeService";

export default function Home() {
    const [data, setData] = useState<Recipe[]>([]);
    useEffect(() => {
        recipeService.fetchRecipes()
            .then((recipes) => {
                setData(recipes)
            })
    }, [])
    let ws = new WebSocket('ws://localhost:8000/api/latest/swipe_sessions/DMmQkBb7gbEv47q2/DMmQkBb7gbEv47q2')

    ws.onopen = () => {
        console.log('connected to websocket')
        ws.send(
            JSON.stringify({
                message: 'message'
            })
        )
    }
    return (
        <CardStack recipes={data}/>
    );
}