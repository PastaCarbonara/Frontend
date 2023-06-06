import React, { useContext } from 'react';
import CardStack from '../components/CardStack';
import { ActivityIndicator, Text, View } from 'react-native';
import tw from '../lib/tailwind';
import { SessionWebsocketContext } from '../contexts/SessionContext';
import useSWRInfinite from 'swr/infinite';
import { fetcher } from '../services/Fetcher';
import { Recipe } from '../types';

export default function HomeScreen() {
    const pageSize = 10;
    const { data, isLoading, size, setSize } = useSWRInfinite<
        {
            recipes: Recipe[];
            total_count: number;
        },
        boolean
    >((index) => `/recipes?offset=${index * pageSize}`, fetcher);
    const recipes = data?.map((page) => page.recipes).flat() ?? [];
    const { isReady, currentGroup } = useContext(SessionWebsocketContext);
    const [numberOfCardsSwiped, setNumberOfCardsSwiped] = React.useState(0);

    return (
        <View style={tw`w-full h-full overflow-hidden`}>
            {isLoading ? (
                <View style={tw`flex-1 items-center justify-center`}>
                    <ActivityIndicator size="large" color="gray" />
                    <Text style={tw`text-2xl mt-2 text-gray-500`}>
                        Gerechten worden geladen...
                    </Text>
                </View>
            ) : !isReady ? (
                <View style={tw`flex-1 items-center justify-center`}>
                    <ActivityIndicator size="large" color="gray" />
                    <Text style={tw`text-2xl mt-2 text-gray-500`}>
                        Verbinding maken met de server...
                    </Text>
                </View>
            ) : recipes.length === 0 ? (
                <View style={tw`flex-1 items-center justify-center`}>
                    <Text style={tw`text-2xl text-gray-500`}>
                        Geen recepten gevonden
                    </Text>
                </View>
            ) : (
                <CardStack
                    recipes={recipes}
                    key={currentGroup}
                    onRecipeSwipe={async () => {
                        setNumberOfCardsSwiped(numberOfCardsSwiped + 1);
                        console.log(numberOfCardsSwiped);
                        if (numberOfCardsSwiped === size * pageSize - 5) {
                            setSize(size + 1);
                        }
                    }}
                />
            )}
        </View>
    );
}
