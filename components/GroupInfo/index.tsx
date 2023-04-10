import {
    Image,
    ImageBackground,
    Pressable,
    ScrollView,
    Text,
    View,
} from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function GroupInfo() {
    return (
        <ImageBackground
            source={require('../../assets/images/header_background.svg')}
            style={tw`w-full h-full bg-bg_color`}
            imageStyle={tw`w-full h-[231px]`}
            resizeMode={'contain'}
        >
            <View style={tw`w-full p-4 mt-16 gap-6`}>
                <View
                    style={tw`flex-col items-center pt-10 pb-6 gap-4 bg-white shadow-md rounded-3xl`}
                >
                    <Text
                        style={tw`font-sans text-base font-bold text-text_primary`}
                    >
                        Je hebt nog geen sessies
                    </Text>
                    <Pressable
                        style={tw`items-center justify-center p-4 gap-4 min-w-28 h-9 bg-orange_primary rounded-lg `}
                    >
                        <Text
                            style={tw`font-sans font-bold text-base leading-normal text-white`}
                        >
                            Maak sessie
                        </Text>
                    </Pressable>
                </View>
                <View style={tw`gap-2.5`}>
                    <Text
                        style={tw`font-sans text-lg font-bold text-text_primary`}
                    >
                        Groepleden
                    </Text>
                    <ScrollView horizontal contentContainerStyle={tw`gap-2.5`}>
                        <View
                            style={tw`flex justify-center items-center p-4 w-16 h-16 bg-indigo_secondary/20 border-dashed border border-indigo_primary rounded-4`}
                        >
                            <MaterialCommunityIcons
                                name="plus"
                                size={28}
                                style={tw`text-indigo_primary`}
                            />
                        </View>
                        <View
                            style={tw`w-16 h-16 bg-indigo_secondary/20 rounded-4`}
                        >
                            <Image
                                style={tw`w-16 h-16 rounded-4`}
                                source={{
                                    uri: 'https://picsum.photos/id/10/60/60',
                                }}
                            />
                        </View>
                        <View
                            style={tw`w-16 h-16 bg-indigo_secondary/20 rounded-4`}
                        >
                            <Image
                                style={tw`w-16 h-16 rounded-4`}
                                source={{
                                    uri: 'https://picsum.photos/id/222/60/60',
                                }}
                            />
                        </View>
                        <View
                            style={tw`w-16 h-16 bg-indigo_secondary/20 rounded-4`}
                        >
                            <Image
                                style={tw`w-16 h-16 rounded-4`}
                                source={{
                                    uri: 'https://picsum.photos/id/353/60/60',
                                }}
                            />
                        </View>
                        <View
                            style={tw`w-16 h-16 bg-indigo_secondary/20 rounded-4`}
                        >
                            <Image
                                style={tw`w-16 h-16 rounded-4`}
                                source={{
                                    uri: 'https://picsum.photos/id/485/60/60',
                                }}
                            />
                        </View>
                        <View
                            style={tw`w-16 h-16 bg-indigo_secondary/20 rounded-4`}
                        >
                            <Image
                                style={tw`w-16 h-16 rounded-4`}
                                source={{
                                    uri: 'https://picsum.photos/id/531/60/60',
                                }}
                            />
                        </View>
                        <View
                            style={tw`w-16 h-16 bg-indigo_secondary/20 rounded-4`}
                        >
                            <Image
                                style={tw`w-16 h-16 rounded-4`}
                                source={{
                                    uri: 'https://picsum.photos/id/621/60/60',
                                }}
                            />
                        </View>
                    </ScrollView>
                </View>
                <View>
                    <View style={tw`flex flex-row justify-between`}>
                        <Text
                            style={tw`font-sans text-lg font-bold text-text_primary`}
                        >
                            Sessies
                        </Text>
                        <Pressable style={tw`flex flex-row items-center`}>
                            <Text
                                style={tw`font-sans text-sm text-text_primary`}
                            >
                                Sessie toevoegen
                            </Text>
                            <MaterialCommunityIcons
                                name={'plus'}
                                size={28}
                                style={tw`text-text_primary`}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}
