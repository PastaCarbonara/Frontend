import React from 'react'
import Swiper from 'react-native-deck-swiper'
import Card from "../Card";
import {Recipe} from "../../types";

export default function Test({recipes}: {recipes: Recipe[]}) {
    const onSwipeLeft = () => {
        console.log('Swiped left')
    }
    const onSwipeRight = () => {
        console.log('Swiped right')
    }

    return (
        <Swiper
            cards={recipes}
            renderCard={(card, index) => (<Card recipe={card} key={index}/>)}
            stackSize={3}
            stackSeparation={-20}
            backgroundColor={''}
            onSwipedLeft={onSwipeLeft}
            onSwipedRight={onSwipeRight}
        />
    )
}
