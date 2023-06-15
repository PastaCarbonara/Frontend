import React from 'react';
import groupService from '../services/GroupService';
import { Image, Pressable, Text, View } from 'react-native';
import tw from '../lib/tailwind';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GroupStackParamList } from '../types';

export default function InviteScreen({ route }: { route: any }) {
    const { id } = route.params;
    const navigation =
        useNavigation<NativeStackNavigationProp<GroupStackParamList>>();
    const { group } = groupService.useGroupPreview(id);
    const acceptInvite = () => {
        groupService.acceptInvite(id).then(() => {
            navigation.replace('Group', {
                groupId: group.id,
            });
        });
    };
    return (
        <View style={tw`w-full grow bg-bg_color justify-center items-center`}>
            {group ? (
                <View style={tw`items-center gap-2`}>
                    <Text style={tw`font-display text-3xl mb-4`}>
                        Je bent uitgenodigd voor:
                    </Text>
                    <View style={tw`w-16 h-16 rounded-4`}>
                        <Image
                            style={tw`w-16 h-16 rounded-4`}
                            source={{
                                uri:
                                    group.image?.urls.lg ||
                                    `https://placehold.co/400`,
                            }}
                        />
                    </View>
                    <Text style={tw`font-sans`}>{group.name}</Text>
                    <Pressable
                        style={tw`items-center justify-center p-4 gap-4 h-9 bg-orange_primary rounded-lg `}
                        onPress={acceptInvite}
                    >
                        <Text style={tw`text-white font-bold text-base`}>
                            Accepteer
                        </Text>
                    </Pressable>
                </View>
            ) : (
                <></>
            )}
        </View>
    );
}
