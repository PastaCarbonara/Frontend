import React, {useRef} from 'react'
import Swiper from 'react-native-deck-swiper'
import Card from "../Card";
import {Recipe} from "../../types";

export default function CardStack({recipes}: { recipes: Recipe[] }) {

    const swiper = useRef<Swiper<any>>(null);

    function onLike() {
        if (swiper.current) {
            swiper.current.swipeRight();
        }
    }

    function onDislike() {
        if (swiper.current) {
            swiper.current.swipeLeft();
        }
    }

    function onSwipeLeft() {
        console.log('Swiped left')
    }

    function onSwipeRight() {
        console.log('Swiped right')

    }

    return (
        <Swiper
            cards={recipes || []}
            renderCard={(card, index) => (
                <Card
                    recipe={card}
                    key={index}
                    onLike={onLike}
                    onDislike={onDislike}
                />
            )}
            ref={swiper}
            stackSize={3}
            stackSeparation={-20}
            backgroundColor={''}
            onSwipedLeft={onSwipeLeft}
            onSwipedRight={onSwipeRight}
        />
    )
}
