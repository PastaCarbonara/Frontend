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
            <View style={tw`h-9/10 w-full bg-bg_color rounded-t-lg pt-5`}>
                <Text
                    style={tw`text-xl text-text_primary pb-4 px-3 font-Poppins-Bold text-center`}
                >
                    {title}
                </Text>
                <ScrollView>{children}</ScrollView>
            </View>
        </BottomSheet>
    );
}
