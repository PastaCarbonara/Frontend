import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Image, ImageProps, ImageStyle } from 'expo-image';

interface ImageBackgroundProps extends ImageProps {
    imageStyle: ImageStyle;
    children: React.ReactNode;
}

export default function ImageBackground({
    imageStyle,
    children,
    ...props
}: ImageBackgroundProps) {
    return (
        <View style={[props.style]}>
            <Image {...props} style={[imageStyle]} />
            <View style={StyleSheet.absoluteFill}>{children}</View>
        </View>
    );
}
