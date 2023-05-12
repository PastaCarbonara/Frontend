import { Pressable, Text, View } from 'react-native';
import React from 'react';
import ImagePickerComponent from '../ImagePickerComponent';
import BackgroundImage from '../BackgroundImage';
import tw from '../../lib/tailwind';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Tag from '../Tag';
export default function Profile({ user }: any) {
    const [userImage, setProfilePicture] = React.useState<File | null>(null);

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
                        onPress={() =>
                            console.log('naem = ' + user.display_name)
                        }
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
                            style={tw`flex-end self-center m-3`}
                        />
                    </Pressable>
                </View>
                {/*TODO: mapping tags from userlist*/}
                {/*TODO: detecting screen-edge and starting a new line when the screen-edge is detected*/}
                <View>
                    <Text style={tw`ml-3 text-xl text-text_primary`}>
                        Filters
                    </Text>
                    <View style={tw`w-full self-center mb-5 px-2 flex-row`}>
                        <Tag
                            tagValue={'Vegan'}
                            tagType={'dietary-preference'}
                        />
                        <Tag
                            tagValue={'Vegetarisch'}
                            tagType={'dietary-preference'}
                        />
                        <Tag tagValue={'Zonder noten'} tagType={'allergy'} />
                        <Tag tagValue={'Zonder Gluten'} tagType={'allergy'} />
                    </View>
                </View>
                {console.log(userImage)}
            </BackgroundImage>
        </View>
    );
}
