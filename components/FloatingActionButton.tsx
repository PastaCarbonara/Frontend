import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import tw from '../lib/tailwind';

export default function FloatingActionButton({ icon }: { icon: any }) {
    return (
        <View
            style={tw`w-14 h-14 bg-orange_primary items-center justify-center rounded-full absolute bottom-4 right-4`}
        >
            <Text style={tw`text-white`}>
                <MaterialCommunityIcons name={icon} size={24} />
            </Text>
        </View>
    );
}
