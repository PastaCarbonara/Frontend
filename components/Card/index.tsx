import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { Recipe } from '../../types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { LinearGradient } from 'expo-linear-gradient';
import tw from '../../lib/tailwind';
import ImageBackground from '../ImageBackground';

type cardProps = {
    recipe: Recipe;
    onLike: () => void;
    onDislike: () => void;
};

export default function Card({ recipe, onLike, onDislike }: cardProps) {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View
            style={tw`w-full h-9/10 flex-col rounded-3xl shadow-black shadow-opacity-25 shadow-offset-[0px]/[4px] shadow-radius-1 elevation-6 bg-white`}
        >
            <ImageBackground
                style={tw`w-full rounded-3xl flex-1 justify-between`}
                placeholder={{
                    uri: recipe?.image?.urls?.xs,
                }}
                source={[
                    { uri: recipe?.image?.urls?.lg, width: 1000, height: 1000 },
                    { uri: recipe?.image?.urls?.md, width: 800, height: 800 },
                    { uri: recipe?.image?.urls?.sm, width: 250, height: 250 },
                ]}
                imageStyle={tw`w-full rounded-3xl flex-1 justify-between absolute`}
            >
                <LinearGradient
                    colors={['#000000B8', '#00000000']}
                    style={tw`flex-1 rounded-3xl h-1/2`}
                    end={{ x: 0, y: 0.5 }}
                >
                    <Text
                        style={tw.style(
                            `text-2xl text-white text-center mt-5 font-display`
                        )}
                    >
                        {recipe?.name}
                    </Text>
                </LinearGradient>
                <View style={tw`p-4 bottom-0`}>
                    <View
                        style={tw`flex-row justify-between items-center w-full`}
                    >
                        <TouchableOpacity
                            onPress={onDislike}
                            style={tw`flex-row justify-center items-center w-16 h-16 p-1.5 rounded-full bg-white shadow-black shadow-opacity-25 shadow-offset-[0px]/[4px] shadow-radius-1 elevation-6`}
                        >
                            <MaterialCommunityIcons
                                name="close-thick"
                                size={28}
                                color="#D94513"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('Recipe', {
                                    id: recipe?.id,
                                });
                            }}
                            style={tw`flex-row justify-center items-center w-14 h-14 p-1.5 rounded-full bg-white shadow-black shadow-opacity-25 shadow-offset-[0px]/[4px] shadow-radius-1 elevation-6`}
                        >
                            <Ionicons
                                name="information"
                                size={28}
                                color="#584DBB"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onLike}
                            style={tw`flex-row justify-center items-center w-16 h-16 p-1.5 rounded-full bg-white shadow-black shadow-opacity-25 shadow-offset-[0px]/[4px] shadow-radius-1 elevation-6`}
                        >
                            <MaterialCommunityIcons
                                name="check-bold"
                                size={28}
                                color="#A8C899"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}
