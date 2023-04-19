import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import tw from '../../lib/tailwind';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GroupMembers from './GroupMembers';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export default function GroupsFound({ groups }: any) {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View style={tw`flex flex-column justify-between grow h-full`}>
            <View style={tw`w-full p-4 mt-16 gap-6`}>
                <View style={tw`gap-2.5`}>
                    {groups.map((userGroup: any) => (
                        <Pressable
                            style={tw`items-center p-4 gap-2 border border-dashed border-orange_primary rounded-3xl flex flex-column bg-bg_color`}
                            key={userGroup.id}
                            onPress={() => {
                                console.log(userGroup.id);
                                // navigation.navigate('Group', {
                                //     id: userGroup.id,
                                // });
                            }}
                        >
                            <View style={tw`w-full flex flex-row gap-2`}>
                                <View
                                    style={tw`w-18 h-18 items-center bg-white border border-white shadow-md rounded-2xl`}
                                >
                                    <Image
                                        source={{
                                            uri: `https://api.dicebear.com/6.x/lorelei/svg?seed=${userGroup.id}`,
                                        }}
                                        style={tw`w-18 h-18 rounded-2xl`}
                                    />
                                </View>
                                <View style={tw`gap-0 grow justify-end`}>
                                    <Text
                                        style={tw`font-Poppins-Bold text-base text-text_primary`}
                                    >
                                        {userGroup.name}
                                    </Text>
                                    <View>
                                        <GroupMembers
                                            groupMembers={userGroup.users}
                                        />
                                    </View>
                                </View>
                                <View
                                    style={tw`items-center justify-center p-2.5 gap-4 mt-2.5 bg-orange_primary rounded-3g aspect-square w-12 h-12`}
                                >
                                    <MaterialCommunityIcons
                                        style={tw`text-white`}
                                        name="arrow-right"
                                        size={24}
                                    />
                                </View>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </View>
            <View>
                <Pressable
                    style={tw`items-center justify-center p-2.5 bg-indigo_secondary rounded-full w-12 h-12 absolute right-4 bottom-4`}
                    onPress={() => {
                        navigation.navigate('Create New Group');
                    }}
                >
                    <Text style={tw`text-white`}>+</Text>
                </Pressable>
            </View>
        </View>
    );
}
