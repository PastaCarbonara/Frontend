import tw from '../lib/tailwind';
import { ImageBackground } from 'react-native';

export default function BackgroundImage({ children }: any) {
    return (
        <ImageBackground
            style={tw`w-full self-center grow`}
            imageStyle={tw`w-full h-[231px] object-cover`}
            source={require('../assets/images/header_background.svg')}
        >
            {children}
        </ImageBackground>
    );
}
