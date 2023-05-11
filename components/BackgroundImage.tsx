import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import tw from '../lib/tailwind';
import { ImageBackground } from 'react-native';

export default function BackgroundImage() {
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <ImageBackground
            style={tw`w-full self-center grow`}
            imageStyle={tw`w-full h-[231px] object-cover`}
            source={require('../assets/images/header_background.svg')}
        />
    );
}
