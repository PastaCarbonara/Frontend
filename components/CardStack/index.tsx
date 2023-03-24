import React, {useContext, useRef} from 'react'
import Swiper from 'react-native-deck-swiper'
import Card from "../Card";
import {Recipe} from "../../types";
import {SessionWebsocketContext} from "../../contexts/SessionContext";

export default function CardStack({recipes = []}: { recipes: Recipe[] }) {

    const swiper = useRef<Swiper<any>>(null);
    const {isReady, lastMessage, send} = useContext(SessionWebsocketContext);

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
        swipe(false, cardIndex)
    }

    function onSwipeRight(cardIndex) {
        swipe(true, cardIndex)
    }

    function swipe(isLike: boolean, cardIndex: number) {
        if (isReady && recipes[cardIndex]) {
            send(JSON.stringify({
                "action": "REQUEST_RECIPE_LIKE",
                "payload": {
                    "like": isLike,
                    "recipe_id": recipes[cardIndex].id
                }
            }))
        } else {
            console.error('Something went wrong')
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
            stackSeparation={-35}
            stackScale={5}
            backgroundColor={'#fff'}
            onSwipedLeft={onSwipeLeft}
            onSwipedRight={onSwipeRight}
            disableBottomSwipe
            disableTopSwipe
        />
    )
}
