import React, {useContext, useRef} from 'react'
import Swiper from 'react-native-deck-swiper'
import Card from "../Card";
import {Recipe} from "../../types";
import {SessionWebsocketContext} from "../../contexts/SessionContext";

export default function CardStack({recipes}: { recipes: Recipe[] }) {

    const swiper = useRef<Swiper<any>>(null);
    const {isReady, val, send} = useContext(SessionWebsocketContext);

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

    function onSwipeLeft(cardIndex) {
        if(isReady) {
            send(JSON.stringify({message: `${recipes[cardIndex].name}: Swiped left`}))
        }
    }

    function onSwipeRight(cardIndex) {
        if(isReady) {
            send(JSON.stringify({message: `${recipes[cardIndex].name}: Swiped right`}))
        }
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
