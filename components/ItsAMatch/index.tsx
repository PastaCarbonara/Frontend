import { Text, View } from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import { Recipe } from '../../types';
import Confetti from './Confetti';
import ImageBackground from '../ImageBackground';
import { Image } from 'expo-image';

export default function ItsAMatch({
    matchedRecipe,
}: {
    matchedRecipe: Recipe;
}) {
    return (
        <View style={tw`bg-indigo_secondary absolute overflow-hidden inset-0`}>
            <Text
                style={tw`text-5xl absolute font-sans font-bold mt-10 text-white self-center top-2`}
            >
                It's a match!
            </Text>
            <Image
                style={tw`w-[125%] h-[125%] absolute left-1/2 -bottom-[40%] ml-[-62.5%]`}
                source={require('../../assets/images/munchie_pancakes.png')}
                resizeMode={'contain'}
            />
            <View style={tw`absolute self-center top-34`}>
                <ImageBackground
                    style={tw`w-24 h-24 rounded-full bg-orange_primary self-center`}
                    imageStyle={tw`w-24 h-24 rounded-full border-4 border-white`}
                    placeholder={{
                        uri: matchedRecipe?.image?.urls?.xs,
                    }}
                    source={[
                        {
                            uri: matchedRecipe?.image?.urls.lg,
                            width: 1000,
                            height: 1000,
                        },
                        {
                            uri: matchedRecipe?.image?.urls?.md,
                            width: 800,
                            height: 800,
                        },
                        {
                            uri: matchedRecipe?.image?.urls?.sm,
                            width: 250,
                            height: 250,
                        },
                        {
                            uri: matchedRecipe?.image?.urls?.thumbnail,
                            width: 100,
                            height: 100,
                        },
                    ]}
                />
                <Text style={tw`text-2xl font-display text-white self-center`}>
                    {matchedRecipe.name}
                </Text>
            </View>
            <Confetti />
        </View>
    );
}
