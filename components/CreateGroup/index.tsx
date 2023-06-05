import React from 'react';
import { ImageBackground, View } from 'react-native';
import tw from '../../lib/tailwind';
import ImagePickerComponent from '../ImagePickerComponent';
import TextInputWithLabel from '../TextInputWithLabel';
import FloatingActionButton from '../FloatingActionButton';
import groupService from '../../services/GroupService';
import { useNavigation } from '@react-navigation/native';
import { GroupStackParamList } from '../../types';
import { mutate } from 'swr';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export default function CreateGroup() {
    const [groupName, setGroupName] = React.useState<string | null>(null);
    const [groupImage, setGroupImage] = React.useState<File | null>(null);
    const navigation =
        useNavigation<NativeStackNavigationProp<GroupStackParamList>>();
    return (
        <ImageBackground
            source={require('../../assets/images/header_background.svg')}
            style={tw`w-full grow bg-bg_color`}
            imageStyle={tw`w-full h-[231px]`}
            resizeMode={'cover'}
        >
            <View style={tw`w-full p-4 mt-16 gap-6`}>
                <ImagePickerComponent
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
                disabled={groupName === null || groupImage === null}
                onPress={() => {
                    groupService
                        .createGroup({
                            image: groupImage!,
                            name: groupName!,
                        })
                        .then(async () => {
                            await mutate('/me/groups');
                            navigation.navigate('Groups');
                        });
                }}
            />
        </ImageBackground>
    );
}
