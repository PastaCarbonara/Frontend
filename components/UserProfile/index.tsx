import { Pressable, Text, View } from 'react-native';
import ImagePickerComponent from '../ImagePickerComponent';
import BackgroundImage from '../BackgroundImage';
import tw from '../../lib/tailwind';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import TagComponent from '../TagComponent';
import BottomSheetComponent from '../BottomSheetComponent';
import React, { useState } from 'react';
import CheckBoxComponent from '../CheckBoxComponent';
import userService from '../../services/UserService';
import TextInputWithLabel from '../TextInputWithLabel';
import { User, Tag } from '../../types';
import * as Linking from 'expo-linking';
import { mutate } from 'swr';
import imageService from '../../services/ImageService';

export default function Profile({
    user,
    userTags,
    allTags,
}: {
    user: User;
    userTags: Array<Tag>;
    allTags: Array<Tag>;
}) {
    const [visible, setVisible] = useState(false);
    const [userName, setUserName] = useState<string>(user.display_name);
    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };

    allTags.sort((a: Tag, b: Tag) => tagSorter(a, b));
    userTags.sort((a: Tag, b: Tag) => tagSorter(a, b));

    function tagSorter(a: Tag, b: Tag) {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }

    const [userAllergies, userDiets] = filterTagsByType(userTags);
    const [allAllergies, allDiets] = filterTagsByType(allTags);

    function filterTagsByType(tags: Array<Tag>): Array<Tag>[] {
        let allergies: Array<Tag> = [];
        let diet: Array<Tag> = [];
        tags.filter((tag) => {
            if (tag.tag_type === 'Allergieën') {
                allergies.push(tag);
            }
            if (tag.tag_type === 'Dieet') {
                diet.push(tag);
            }
        });
        return [allergies, diet];
    }

    return (
        <View style={tw`bg-bg_color min-h-full max-h-full w-auto`}>
            <BackgroundImage>
                <View style={tw`w-full p-4 mt-16 gap-6`}>
                    <ImagePickerComponent
                        initialImage={user?.image?.file_url}
                        onImageChange={(image) => {
                            imageService
                                .uploadImages({
                                    images: [image],
                                })
                                .then((imageFile) => {
                                    userService
                                        .updateUser(userName, imageFile)
                                        .then(async () => {
                                            await mutate('/me');
                                        });
                                });
                        }}
                    />
                </View>
                <View style={tw`w-full self-center mb-5`}>
                    <Text style={tw`ml-3 text-xl text-text_primary`}>
                        Profiel
                    </Text>
                    <View style={tw`flex-row`}>
                        <MaterialIcons
                            name="person"
                            size={24}
                            color="#333333"
                            style={tw`self-center m-3`}
                        />
                        <TextInputWithLabel
                            label={'Naam'}
                            style={tw`h-8 font-sans text-xl flex-1 w-full`}
                            maxLength={32}
                            defaultValue={userName}
                            onInputChange={setUserName}
                            onFocus={() => setUserName(user?.display_name)}
                            onBlur={() =>
                                userName.trim()
                                    ? userService
                                          .updateUser(userName.trim(), [
                                              user.image,
                                          ])
                                          .then(async () => {
                                              await mutate('/me');
                                          })
                                    : console.error('Username is undefined')
                            }
                        />
                        <MaterialCommunityIcons
                            name="pencil"
                            size={24}
                            color="#333333"
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
                            color="#333333"
                            style={tw`self-center m-3`}
                        />
                        <Text style={tw`font-sans self-center text-l w-full`}>
                            Voeg een e-mail adres toe voor extra beveiliging
                        </Text>
                        <MaterialCommunityIcons
                            name="arrow-right"
                            size={24}
                            color="#333333"
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
                        {userDiets?.map((tag: Tag) => (
                            <TagComponent
                                tagValue={tag.name}
                                tagType={tag.tag_type}
                                key={tag.id}
                            />
                        ))}
                        {userAllergies?.map((tag: Tag) => (
                            <TagComponent
                                tagValue={tag.name}
                                tagType={tag.tag_type}
                                key={tag.id}
                            />
                        ))}
                        <Pressable onPress={() => toggleBottomNavigationView()}>
                            <TagComponent
                                tagValue={'Meer filters +'}
                                tagType={'more'}
                            />
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
                                userService
                                    .deleteMe()
                                    .then(() => {
                                        alert('Uw account is verwijderd');
                                    })
                                    .then(() => {
                                        location.replace(
                                            Linking.createURL('/')
                                        );
                                    });
                            }
                        }}
                        style={tw`w-full flex-row`}
                    >
                        <Text style={tw`text-[#E81C00] text-xl mt-3 ml-3 grow`}>
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
                    <Text
                        style={tw`px-3 bg-indigo_primary text-xl text-white px-4 py-3 font-Poppins-Regular`}
                    >
                        Dieet
                    </Text>
                    <View style={tw`flex-column`}>
                        {allDiets?.map((tag: Tag) =>
                            createCheckboxComponent(tag, userTags)
                        )}
                    </View>
                    <Text
                        style={tw`bg-orange_primary text-xl text-white px-4 py-3 font-Poppins-Regular`}
                    >
                        Allergieën
                    </Text>
                    <View style={tw`flex-column`}>
                        {allAllergies?.map((tag: Tag) =>
                            createCheckboxComponent(tag, userTags)
                        )}
                    </View>
                </View>
            </BottomSheetComponent>
        </View>
    );
}

const createCheckboxComponent = (tag: Tag, userTags: Array<Tag>) => {
    let checkState = userTags.some((userTag: Tag) => {
        return userTag.id === tag.id;
    });

    let newTags: number[] = [];
    const checkboxOnChangeBehaviour = () => {
        if (!checkState) {
            newTags.push(tag.id);
            userService.addFilter(newTags).then(async () => {
                await mutate('/me/filters');
            });
            checkState = !checkState;
        } else {
            userTags.splice(userTags.indexOf(tag), 1);
            newTags.splice(newTags.indexOf(tag.id), 1);
            userService.deleteFilter(tag.id).then(async () => {
                await mutate('/me/filters');
            });
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
