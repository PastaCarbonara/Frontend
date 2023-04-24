import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from '../../lib/tailwind';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GroupMembers from './GroupMembers';
import { RootStackParamList } from '../../types';

export default function GroupsFound({ groups }: any) {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View style={tw`flex flex-column justify-between grow h-full`}>
            <View style={tw`w-full p-4 mt-16 gap-6`}>
                <View style={tw`gap-2.5`}>
                    {groups.map((group: any) => (
                        <Pressable
                            style={tw`items-center p-4 gap-2 border border-dashed border-orange_primary rounded-3xl flex flex-column bg-bg_color`}
                            key={group?.id}
                            onPress={() => {
                                console.log(group?.id);
                                navigation.navigate('Group', {
                                    groupId: group.id,
                                });
                            }}
                        >
                            <View style={tw`w-full flex flex-row gap-2`}>
                                <View
                                    style={tw`w-18 h-18 items-center bg-white border border-white shadow-md rounded-2xl`}
                                >
                                    <Image
                                        source={{
                                            uri:
                                                `https://munchiestore.blob.core.windows.net/munchie-images/${group.filename}` ||
                                                `https://placehold.co/400`,
                                        }}
                                        style={tw`w-18 h-18 rounded-2xl`}
                                    />
                                </View>
                                <View style={tw`gap-0 grow justify-end`}>
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
        </View>
    );
}
