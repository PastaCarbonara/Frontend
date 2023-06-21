import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Image, ImageProps, ImageStyle } from 'expo-image';
import tw from '../lib/tailwind';

interface ImageBackgroundProps extends ImageProps {
    imageStyle: ImageStyle;
    children?: React.ReactNode;
}

export default function ImageBackground({
    imageStyle,
    children,
    ...props
}: ImageBackgroundProps) {
    return (
        <View style={[props.style]}>
            <Image
                {...props}
                placeholderContentFit={'cover'}
                transition={200}
                style={[imageStyle]}
            />
            <View style={[StyleSheet.absoluteFill, tw`h-full`]}>
                {children}
            </View>
        </View>
    );
}
