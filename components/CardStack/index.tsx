import React, { useContext, useRef } from 'react';
import Swiper from 'react-native-deck-swiper';
import Card from '../Card';
import { Recipe, WebSocketAction } from '../../types';
import { SessionWebsocketContext } from '../../contexts/SessionContext';

export default function CardStack({
    recipes = [],
    onRecipeSwipe,
}: {
    recipes: Recipe[];
    onRecipeSwipe?: (recipeId: number) => void;
}) {
    const swiper = useRef<Swiper<any>>(null);
    const { isReady, send } = useContext(SessionWebsocketContext);

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

    function onSwipeLeft(cardIndex: number) {
        swipe(false, cardIndex);
    }

    function onSwipeRight(cardIndex: number) {
        swipe(true, cardIndex);
    }

    function swipe(isLike: boolean, cardIndex: number) {
        if (isReady) {
            if (recipes[cardIndex]) {
                send({
                    action: WebSocketAction.RECIPE_SWIPE,
                    payload: {
                        like: isLike,
                        recipe_id: recipes[cardIndex].id,
                    },
                });
            } else {
                console.error('Recipe does not exist');
            }
        } else {
            console.error('Something went wrong, websocket is not ready');
        }
    }

    return (
        <Swiper
            cards={recipes || []}
            renderCard={(card) => (
                <Card
                    recipe={card}
                    key={card.id}
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
            onSwiped={(cardIndex) => {
                const recipeId = recipes[cardIndex]?.id;
                if (recipeId && onRecipeSwipe) {
                    return onRecipeSwipe(recipeId);
                }
            }}
            key={recipes.length}
        />
    );
}
