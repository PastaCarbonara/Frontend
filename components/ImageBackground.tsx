import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { Image, ImageProps, ImageStyle } from 'expo-image';
import tw from '../lib/tailwind';

interface ImageBackgroundProps extends ImageProps {
    imageStyle: ImageStyle | ImageStyle[];
    childrenContainerStyle?: ViewStyle | ViewStyle[];
    children?: React.ReactNode;
}

export default function ImageBackground({
    imageStyle,
    childrenContainerStyle,
    children,
    ...props
}: ImageBackgroundProps) {
    return (
        <View style={[props.style]}>
            <Image
                {...props}
                placeholderContentFit={'cover'}
                transition={200}
                style={imageStyle}
            />
            <View
                style={[
                    tw`h-full`,
                    StyleSheet.absoluteFill,
                    childrenContainerStyle,
                ]}
            >
                {children}
            </View>
        </View>
    );
}
