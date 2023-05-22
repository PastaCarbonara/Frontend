import { Pressable, Text, View } from 'react-native';
import ImagePickerComponent from '../ImagePickerComponent';
import BackgroundImage from '../BackgroundImage';
import tw from '../../lib/tailwind';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Tag from '../Tag';
import BottomSheetComponent from '../BottomSheetComponent';
import { BottomSheet } from 'react-native-btr';
import React, { useState } from 'react';
import CheckBoxComponent from '../CheckBoxComponent';
import userService from '../../services/UserService';
export default function Profile({ user, userTags, allTags }: any) {
    const [userImage, setProfilePicture] = React.useState<File | null>(null);
    const [visible, setVisible] = useState(false);
    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
        if (visible) {
            location.reload();
            console.log(userImage);
        }
    };

    return (
        <View style={tw`bg-bg_color min-h-full max-h-screen`}>
            <BackgroundImage>
                <View style={tw`w-full p-4 mt-16 gap-6`}>
                    <ImagePickerComponent
                        onImageChange={(image) => {
                            setProfilePicture(image);
                        }}
                    />
                </View>
                <View style={tw`w-full self-center mb-5`}>
                    <Text style={tw`ml-3 text-xl text-text_primary`}>
                        Profiel
                    </Text>
                    <Pressable
                        onPress={() =>
                            console.log('naem = ' + user.display_name)
                        }
                        style={tw`flex-row`}
                    >
                        <MaterialIcons
                            name="person"
                            size={24}
                            color="black"
                            style={tw`self-center m-3`}
                        />
                        <View
                            style={tw`flex-column flex-15 self-center w-full`}
                        >
                            <Text
                                style={tw`font-sans text-xs text-text_primary`}
                            >
                                Naam
                            </Text>
                            <Text style={tw`font-sans text-xl`}>
                                {user.display_name}
                            </Text>
                        </View>
                        <MaterialCommunityIcons
                            name="pencil"
                            size={24}
                            color="black"
                            style={tw`flex-end self-center m-3`}
                        />
                    </Pressable>
                </View>
                <View style={tw`w-full self-center mb-5`}>
                    <Text style={tw`ml-3 text-xl text-text_primary`}>
                        Account
                    </Text>
                    <Pressable
                        onPress={() => console.log('das email')}
                        style={tw`flex-row`}
                    >
                        <MaterialCommunityIcons
                            name="email"
                            size={24}
                            color="black"
                            style={tw`self-center m-3`}
                        />
                        <Text
                            style={tw`ml-3 font-sans self-center text-l w-full`}
                        >
                            Voeg een e-mail adres toe voor extra beveiliging
                        </Text>
                        <MaterialCommunityIcons
                            name="arrow-right"
                            size={24}
                            color="black"
                            style={tw`flex-end self-center m-3`}
                        />
                    </Pressable>
                </View>
                {/*TODO: mapping tags from userlist*/}
                <View>
                    <Text style={tw`ml-3 text-xl text-text_primary`}>
                        Filters
                    </Text>
                    <View
                        style={tw`w-full self-center mb-5 px-2 flex-row flex-wrap`}
                    >
                        {userTags?.map((tag: any) => (
                            <Tag tagValue={tag.name} tagType={tag.tag_type} />
                        ))}
                        <Pressable onPress={() => toggleBottomNavigationView()}>
                            <Tag tagValue={'Meer filters +'} tagType={'more'} />
                        </Pressable>
                    </View>
                </View>
                <View style={tw`w-full self-center mb-5`}>
                    <Text style={tw`text-xl text-text_primary ml-3`}>
                        Gevarenzone
                    </Text>
                    <Pressable
                        onPress={() => {
                            if (
                                confirm(
                                    'Uw account wordt hiermee permanent verwijderd, dit kan niet ongedaan gemaakt worden.\nWeet u zeker dat u verder wilt gaan?'
                                )
                            ) {
                                alert('Uw account is verwijderd');
                                location.reload();
                            } else {
                                console.log('blep');
                            }
                        }}
                        style={tw`w-full flex-row`}
                    >
                        <Text
                            style={tw`text-[#E81C00] text-xl mt-3 ml-3 flex-grow`}
                        >
                            Account verwijderen
                        </Text>
                        <MaterialCommunityIcons
                            name="delete"
                            size={24}
                            color="#E81C00"
                            style={tw`flex-end self-center m-3`}
                        />
                    </Pressable>
                </View>
            </BackgroundImage>
            <BottomSheet
                visible={visible}
                onBackButtonPress={toggleBottomNavigationView}
                onBackdropPress={toggleBottomNavigationView}
            >
                <BottomSheetComponent title={'Filters toevoegen'}>
                    {/*TODO: use actual tags*/}
                    <View style={tw`flex-column`}>
                        {allTags?.map((tag: any) =>
                            createCheckboxComponent(tag, userTags)
                        )}
                    </View>
                </BottomSheetComponent>
            </BottomSheet>
        </View>
    );
}

const createCheckboxComponent = (tag: any, userTags: any) => {
    // TODO: change the tag-status for the user when the state changes
    const checkState = userTags.some((userTag: any) => {
        return userTag.id === tag.id;
    });
    let newTags: number[] = [];
    const checkboxFunction = () => {
        if (!checkState) {
            newTags.push(tag.id);
            userService.addFilter(newTags);
        } else {
            userTags.splice(userTags.indexOf(tag), 1);
            userService.deleteFilter(tag.id);
        }
    };
    return (
        <CheckBoxComponent
            key={tag.name}
            label={tag.name}
            checkState={checkState}
            functionality={checkboxFunction}
        />
    );
};
