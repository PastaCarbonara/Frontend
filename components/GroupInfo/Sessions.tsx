import { Pressable, Text, View } from 'react-native';
import tw from '../../lib/tailwind';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

export default function Sessions() {
    return (
        <View>
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
        </View>
    );
}
