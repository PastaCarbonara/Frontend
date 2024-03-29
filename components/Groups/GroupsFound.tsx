import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from '../../lib/tailwind';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GroupMembers from './GroupMembers';
import { Group, GroupStackParamList } from '../../types';
import { Image } from 'expo-image';

export default function GroupsFound({ groups }: { groups: Group[] }) {
    const navigation =
        useNavigation<NativeStackNavigationProp<GroupStackParamList>>();
    return (
        <View style={tw`flex justify-between grow h-full`}>
            <View style={tw`w-full p-4 gap-6 max-h-full`}>
                <View style={tw`gap-2.5`}>
                    {groups.map((group: Group) => (
                        <Pressable
                            style={tw`items-center p-4 gap-2 border border-dashed border-orange_primary rounded-3xl flex bg-bg_color`}
                            key={group?.id}
                            onPress={() => {
                                navigation.navigate('Group', {
                                    groupId: group.id,
                                });
                            }}
                        >
                            <View
                                style={tw`w-full flex flex-row gap-2 items-center`}
                            >
                                <View
                                    style={tw`w-18 h-18 items-center bg-white border border-white shadow-md rounded`}
                                >
                                    <Image
                                        placeholder={{
                                            uri: group.image?.urls.xs,
                                        }}
                                        source={{
                                            uri: group.image?.urls.lg,
                                        }}
                                        style={tw`w-18 h-18 rounded`}
                                    />
                                </View>
                                <View style={tw`gap-0 grow justify-end flex-1`}>
                                    <Text
                                        style={tw`font-Poppins-Bold text-base text-text_primary`}
                                    >
                                        {group?.name}
                                    </Text>
                                    <View>
                                        <GroupMembers
                                            groupMembers={group?.users}
                                        />
                                    </View>
                                </View>
                                <View
                                    style={tw`items-center justify-center p-2.5 gap-4 bg-orange_primary rounded-3 aspect-square w-12 h-12`}
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
        </View>
    );
}
