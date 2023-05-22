import { ScrollView, Text, View } from 'react-native';
import tw from '../lib/tailwind';
import React from 'react';

export default function BottomSheetComponent({
    children,
    title,
}: {
    children: any;
    title: string;
}) {
    return (
        <View style={tw`h-120 w-full bg-bg_color rounded-t-lg pt-5`}>
            <Text style={tw`text-xl text-text_primary mb-6 px-3`}>{title}</Text>
            <ScrollView style={tw`px-3`}>{children}</ScrollView>
        </View>
    );
}
