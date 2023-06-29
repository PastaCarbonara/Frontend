import React from 'react';
import { View } from 'react-native';
import tw from '../../lib/tailwind';
import ImagePickerComponent from '../ImagePickerComponent';
import TextInputWithLabel from '../TextInputWithLabel';
import FloatingActionButton from '../FloatingActionButton';
import groupService from '../../services/GroupService';
import { useNavigation } from '@react-navigation/native';
import { GroupStackParamList } from '../../types';
import { mutate } from 'swr';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackgroundImage from '../BackgroundImage';

export default function CreateGroup() {
    const [groupName, setGroupName] = React.useState<string | null>(null);
    const [groupImage, setGroupImage] = React.useState<File | null>(null);
    const navigation =
        useNavigation<NativeStackNavigationProp<GroupStackParamList>>();
    const [isLoading, setIsLoading] = React.useState(false);
    return (
        <BackgroundImage>
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
                disabled={
                    groupName === null || groupImage === null || isLoading
                }
                onPress={() => {
                    setIsLoading(true);
                    groupService
                        .createGroup({
                            image: groupImage!,
                            name: groupName!,
                        })
                        .then(async () => {
                            await mutate('/me/groups');
                            setIsLoading(false);
                            navigation.navigate('Groups');
                        });
                }}
            />
        </BackgroundImage>
    );
}
