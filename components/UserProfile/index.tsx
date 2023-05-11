import { View } from 'react-native';
import React from 'react';
import ImagePickerComponent from '../ImagePickerComponent';
import BackgroundImage from '../BackgroundImage';
import tw from '../../lib/tailwind';
export default function Pr0ofile({ user }: any) {
    const [userImage, setProfilePicture] = React.useState<File | null>(null);

    return (
        <View>
            <BackgroundImage />

            <View style={tw`w-full p-4 mt-16 gap-6`}>
                <ImagePickerComponent
                    onImageChange={(image) => {
                        setProfilePicture(image);
                    }}
                />
            </View>
            <View>{console.log(user)}</View>
            <View>{console.log(userImage)}</View>
        </View>
    );
}
