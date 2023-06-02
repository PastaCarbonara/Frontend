import { ScrollView, Text, View } from 'react-native';
import tw from '../lib/tailwind';
import React, { ReactChild } from 'react';
import { BottomSheet } from 'react-native-btr';

export default function BottomSheetComponent({
    children,
    title,
    visible,
    onBackButtonPress,
    onBackdropPress,
}: {
    children: ReactChild;
    title: string;
    visible: boolean;
    onBackButtonPress: () => void;
    onBackdropPress: () => void;
}) {
    return (
        <BottomSheet
            visible={visible}
            onBackButtonPress={onBackButtonPress}
            onBackdropPress={onBackdropPress}
        >
            <View style={tw`h-120 w-full bg-bg_color rounded-t-lg pt-5`}>
                <Text
                    style={tw`text-xl text-text_primary mb-6 px-3 font-Poppins-Bold text-center`}
                >
                    {title}
                </Text>
                <ScrollView style={tw`px-3`}>{children}</ScrollView>
            </View>
        </BottomSheet>
    );
}
