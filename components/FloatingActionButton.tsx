import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tw from '../lib/tailwind';

export default function FloatingActionButton({
    icon,
    onPress,
    color = 'orange_primary',
    textColor = 'white',
}: {
    icon: any;
    onPress: () => void;
    color?: 'orange_primary' | 'indigo_primary';
    textColor?: 'white' | 'text_primary';
}) {
    return (
        <Pressable onPress={onPress} style={tw`absolute bottom-4 right-4`}>
            <View
                style={tw.style(
                    `w-14 h-14 bg-${color} items-center justify-center rounded-full`
                )}
            >
                <Text style={tw.style(`text-${textColor}`)}>
                    <MaterialCommunityIcons name={icon} size={24} />
                </Text>
            </View>
        </Pressable>
    );
}
