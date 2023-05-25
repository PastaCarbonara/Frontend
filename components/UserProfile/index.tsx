import { Pressable, Text, View } from 'react-native';
import ImagePickerComponent from '../ImagePickerComponent';
import BackgroundImage from '../BackgroundImage';
import tw from '../../lib/tailwind';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Tag from '../Tag';
import BottomSheetComponent from '../BottomSheetComponent';
import React, { useEffect, useState } from 'react';
import CheckBoxComponent from '../CheckBoxComponent';
import userService from '../../services/UserService';
import UserService from '../../services/UserService';
import TextInputWithLabel from '../TextInputWithLabel';

export default function Profile({
    user,
    userTags,
    allTags,
}: {
    user: any;
    userTags: Array<object>;
    allTags: Array<object>;
}) {
    const [userImage, setUserImage] = React.useState<File | undefined>(
        undefined
    );
    const [visible, setVisible] = useState(false);
    const [userName, setUserName] = useState<string>(user.display_name);

    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
        if (visible) {
            location.reload();
        }
    };
    useEffect(() => {
        UserService.updateUser(user.display_name, userImage).then((response) =>
            console.log(response)
        );
    }, [user.display_name, userImage]);
    return (
        <View style={tw`bg-bg_color min-h-full max-h-screen`}>
            <BackgroundImage>
                <View style={tw`w-full p-4 mt-16 gap-6`}>
                    <ImagePickerComponent
                        initialImage={user?.image?.file_url}
                        onImageChange={(image) => {
                            setUserImage(image);
                        }}
                    />
                </View>
                <View style={tw`w-full self-center mb-5`}>
                    <Text style={tw`ml-3 text-xl text-text_primary`}>
                        Profiel
                    </Text>
                    <View style={tw`flex-row w-full`}>
                        <MaterialIcons
                            name="person"
                            size={24}
                            color="black"
                            style={tw`self-center m-3`}
                        />
                        <TextInputWithLabel
                            label={'Naam'}
                            style={tw`h-8 font-sans text-xl w-fit`}
                            maxLength={42}
                            defaultValue={user.display_name}
                            onInputChange={setUserName}
                            onFocus={() => setUserName(user?.display_name)}
                            onBlur={() =>
                                userName
                                    ? UserService.updateUser(
                                          userName,
                                          userImage,
                                          [user.image]
                                      )
                                    : console.log('Username is undefined')
                            }
                        />
                        <MaterialCommunityIcons
                            name="pencil"
                            size={24}
                            color="black"
                            style={tw`self-center m-3`}
                        />
                    </View>
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
                        <Text style={tw`font-sans self-center text-l w-full`}>
                            Voeg een e-mail adres toe voor extra beveiliging
                        </Text>
                        <MaterialCommunityIcons
                            name="arrow-right"
                            size={24}
                            color="black"
                            style={tw`self-center m-3`}
                        />
                    </Pressable>
                </View>
                <View>
                    <Text style={tw`ml-3 text-xl text-text_primary`}>
                        Filters
                    </Text>
                    <View
                        style={tw`w-full self-center mb-5 px-2 flex-row flex-wrap`}
                    >
                        {userTags?.map((tag: any) => (
                            <Tag
                                tagValue={tag.name}
                                tagType={tag.tag_type}
                                key={tag.id}
                            />
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

            <BottomSheetComponent
                title={'Filters toevoegen'}
                visible={visible}
                onBackButtonPress={toggleBottomNavigationView}
                onBackdropPress={toggleBottomNavigationView}
            >
                <View style={tw`flex-column`}>
                    {allTags?.map((tag: object) =>
                        createCheckboxComponent(tag, userTags)
                    )}
                </View>
            </BottomSheetComponent>
        </View>
    );
}

const createCheckboxComponent = (tag: any, userTags: Array<object>) => {
    let checkState = userTags.some((userTag: any) => {
        return userTag.id === tag.id;
    });

    let newTags: number[] = [];
    const checkboxOnChangeBehaviour = () => {
        if (!checkState) {
            newTags.push(tag.id);
            userService.addFilter(newTags);
            checkState = !checkState;
        } else {
            userTags.splice(userTags.indexOf(tag), 1);
            newTags.splice(newTags.indexOf(tag), 1);
            userService.deleteFilter(tag.id);
            checkState = !checkState;
        }
    };
    return (
        <CheckBoxComponent
            key={tag.id}
            label={tag.name}
            checkState={checkState}
            onChange={checkboxOnChangeBehaviour}
        />
    );
};
