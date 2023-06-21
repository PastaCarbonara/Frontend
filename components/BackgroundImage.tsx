import tw from '../lib/tailwind';
import React from 'react';
import { ImageBackground } from 'react-native';

export default function BackgroundImage({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ImageBackground
            style={tw`w-full self-center grow bg-bg_color`}
            imageStyle={tw`w-full h-[231px] object-cover`}
            source={require('../assets/images/header_background.svg')}
        >
            {children}
        </ImageBackground>
    );
}
