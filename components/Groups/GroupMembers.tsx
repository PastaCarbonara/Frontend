import React, { Fragment } from 'react';
import { Text, View } from 'react-native';
import tw from '../../lib/tailwind';
import { User } from '../../types';
import { Image } from 'expo-image';

export default function GroupMembers({ groupMembers }: any) {
    const maxLength = 4;
    const modifier = 1;
    return (
        <Fragment>
            <View style={tw`w-full gap-1`}>
                {groupMembers?.length <= maxLength ? (
                    <View style={tw`flex flex-row`}>
                        {groupMembers?.map((groupMember: any) => (
                            <View key={groupMembers?.indexOf(groupMember)}>
                                {memberImage(groupMember)}
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={tw`flex flex-row`}>
                        {groupMembers
                            ?.slice(0, maxLength - modifier)
                            ?.map((groupMember: any) => (
                                <View key={groupMembers?.indexOf(groupMember)}>
                                    {memberImage(groupMember)}
                                </View>
                            ))}
                        <Text style={tw`w-9 h-9 mt-2.5`}>{`+${
                            groupMembers?.length - maxLength + modifier
                        }`}</Text>
                    </View>
                )}
            </View>
        </Fragment>
    );
}

function memberImage(groupMember: User) {
    return (
        <Fragment>
            <Image
                placeholder={{
                    uri:
                        groupMember.image?.urls.xs ??
                        `https://api.dicebear.com/6.x/lorelei/svg?seed=${groupMember?.id}`,
                }}
                source={[
                    {
                        uri:
                            groupMember.image?.urls.lg ??
                            `https://api.dicebear.com/6.x/lorelei/svg?seed=${groupMember?.id}`,
                        width: 1000,
                        height: 1000,
                    },
                    {
                        uri:
                            groupMember.image?.urls.md ??
                            `https://api.dicebear.com/6.x/lorelei/svg?seed=${groupMember?.id}`,
                        width: 800,
                        height: 800,
                    },
                    {
                        uri:
                            groupMember.image?.urls.sm ??
                            `https://api.dicebear.com/6.x/lorelei/svg?seed=${groupMember?.id}`,
                        width: 250,
                        height: 250,
                    },
                ]}
                style={tw`w-9 h-9 rounded 2x1 align-middle`}
            />
        </Fragment>
    );
}
