import { View } from 'react-native';
import tw from '../lib/tailwind';

export default function BottomSheetComponent({ children }: { children: any }) {
    return (
        <View style={tw`h-120 w-full bg-bg_color rounded-t-lg pt-5 px-3`}>
            {children}
        </View>
    );
}
