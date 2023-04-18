import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tw from '../lib/tailwind';

export default function FloatingActionButton({
    icon,
    onPress,
}: {
    icon: any;
    onPress: () => void;
}) {
    return (
        <Pressable onPress={onPress} style={tw`absolute bottom-4 right-4`}>
            <View
                style={tw`w-14 h-14 bg-orange_primary items-center justify-center rounded-full`}
            >
                <Text style={tw`text-white`}>
                    <MaterialCommunityIcons name={icon} size={24} />
                </Text>
            </View>
        </Pressable>
    );
}
