import React, { Fragment } from 'react';
import { Image, Text, View } from 'react-native';
import tw from '../../lib/tailwind';

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

function memberImage(groupMember: any) {
    return (
        <Fragment>
            <Image
                source={{
                    uri: `https://api.dicebear.com/6.x/lorelei/svg?seed=${groupMember?.id}`,
                }}
                style={tw`w-9 h-9 rounded 2x1 align-middle`}
            />
        </Fragment>
    );
}
