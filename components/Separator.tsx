import { View } from 'react-native';
import React from 'react';
import tw from '../lib/tailwind';
export default function Separator({ style }: { style: string }) {
    return (
        <View
            style={tw.style(`${style} w-full h-0`, { borderBottomWidth: 1 })}
        />
    );
}
