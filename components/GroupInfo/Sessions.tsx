import { Image, Pressable, Text, View } from 'react-native';
import tw from '../../lib/tailwind';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

export default function Sessions() {
    const sessions = [
        { uri: 'https://picsum.photos/id/10/60/60' },
        { uri: 'https://picsum.photos/id/222/60/60' },
        { uri: 'https://picsum.photos/id/353/60/60' },
        { uri: 'https://picsum.photos/id/485/60/60' },
        { uri: 'https://picsum.photos/id/531/60/60' },
        { uri: 'https://picsum.photos/id/786/60/60' },
    ];
    return (
        <View style={tw`gap-2.5`}>
            <View style={tw`flex flex-row justify-between`}>
                <Text style={tw`font-sans text-lg font-bold text-text_primary`}>
                    Sessies
                </Text>
                <Pressable style={tw`flex flex-row items-center`}>
                    <Text style={tw`font-sans text-sm text-text_primary`}>
                        Sessie toevoegen
                    </Text>
                    <MaterialCommunityIcons
                        name={'plus'}
                        size={28}
                        style={tw`text-text_primary`}
                    />
                </Pressable>
            </View>
            <View style={tw`gap-2.5`}>
                {sessions.map((session) => (
                    <View
                        style={tw`flex-row items-center p-4 gap-2 border border-dashed border-orange_primary rounded-3xl`}
                        key={session.uri}
                    >
                        <View
                            style={tw`w-12 h-12 items-center bg-white border border-white shadow-md rounded-2xl`}
                        >
                            <Image
                                source={session}
                                style={tw`w-12 h-12 rounded-2xl`}
                            />
                        </View>
                        <View style={tw`gap-0 grow`}>
                            <Text
                                style={tw`font-sans text-base font-bold text-text_primary`}
                            >
                                Gerecht naam
                            </Text>
                            <Text style={tw`font-sans text-xs text-gray-500`}>
                                12/12/2021
                            </Text>
                        </View>
                        <Pressable
                            style={tw`items-center justify-center p-4 gap-4 h-9 bg-orange_primary rounded-lg `}
                        >
                            <Text
                                style={tw`font-sans font-bold text-base leading-normal text-white`}
                            >
                                Start
                            </Text>
                        </Pressable>
                    </View>
                ))}
            </View>
        </View>
    );
}
