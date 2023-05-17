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
export default function Profile({ user, tags }: any) {
    const [userImage, setProfilePicture] = React.useState<File | null>(null);
    const [visible, setVisible] = useState(false);

    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
        console.log('mlem');
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
                <View>
                    <Text style={tw`ml-3 text-xl text-text_primary`}>
                        Filters
                    </Text>
                    <View
                        style={tw`w-full self-center mb-5 px-2 flex-row flex-wrap`}
                    >
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
                        <Tag tagValue={'Lactosevrij'} tagType={'allergy'} />
                        <Pressable onPress={() => toggleBottomNavigationView()}>
                            <Tag tagValue={'Meer filters +'} tagType={'more'} />
                        </Pressable>
                    </View>
                </View>
                <View style={tw`w-full self-center mb-5`}>
                    <Text style={tw`text-xl text-text_primary ml-3`}>
                        Gevarenzone
                    </Text>
                    {/*TODO: Throw popup when clicked*/}
                    <Pressable
                        onPress={() => console.log('DELL ATE MY PC')}
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
                {console.log(user)}
                {console.log(tags)}
                {console.log(userImage)}
            </BackgroundImage>
            <BottomSheet
                visible={visible}
                onBackButtonPress={toggleBottomNavigationView}
                onBackdropPress={toggleBottomNavigationView}
            >
                <BottomSheetComponent>
                    <Text style={tw`text-xl text-text_primary mb-6`}>
                        Filters toevoegen
                    </Text>
                    {/*TODO: use actual tags*/}
                    <View style={tw`flex-column`}>
                        {/*TODO: make the init state reflect the tag-status for the user*/}
                        {/*TODO: map the components to actual tags in the database*/}
                        {createCheckboxComponent('Vegan', true)}
                        {createCheckboxComponent('Vegetarian', false)}
                        {createCheckboxComponent('NNN', false)}
                    </View>
                </BottomSheetComponent>
            </BottomSheet>
        </View>
    );
}

const createCheckboxComponent = (tagName: string, boxState: boolean) => {
    // TODO: change the tag-status for the user when the state changes
    const checkboxFunction = () => {
        console.log(`le ${tagName} func be sicc yo`);
        console.log("neato! the well has been don't");
    };
    return (
        <CheckBoxComponent
            label={tagName}
            checkState={boxState}
            functionality={checkboxFunction}
        />
    );
};
