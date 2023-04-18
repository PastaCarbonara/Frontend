import React from 'react';
import { ImageBackground, View } from 'react-native';
import tw from '../../lib/tailwind';
import GroupImagePicker from './GroupImagePicker';
import TextInputWithLabel from '../TextInputWithLabel';
import FloatingActionButton from '../FloatingActionButton';

export default function CreateGroup() {
    const [groupName, setGroupName] = React.useState<string | null>(null);
    const [groupImage, setGroupImage] = React.useState<string | null>(null);
    return (
        <ImageBackground
            source={require('../../assets/images/header_background.svg')}
            style={tw`w-full grow bg-bg_color`}
            imageStyle={tw`w-full h-[231px]`}
            resizeMode={'cover'}
        >
            <View style={tw`w-full p-4 mt-16 gap-6`}>
                <GroupImagePicker
                    onImageChange={(image) => {
                        setGroupImage(image);
                    }}
                />
                <TextInputWithLabel
                    label={'Groepsnaam'}
                    onInputChange={(name: string) => {
                        setGroupName(name);
                    }}
                    style={tw`flex-grow h-8`}
                    maxLength={100}
                />
            </View>
            <FloatingActionButton
                icon={'check'}
                onPress={() => {
                    console.log(groupName, groupImage);
                    //Create a new group
                }}
            />
        </ImageBackground>
    );
}
