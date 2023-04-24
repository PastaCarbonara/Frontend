import React from 'react';
import { ImageBackground, View } from 'react-native';
import NoGroupsFound from './NoGroupsFound';
import GroupsFound from './GroupsFound';
import tw from '../../lib/tailwind';

export default function MyGroups({ myGroups }: any) {
    return (
        <View style={tw`bg-bg_color h-full`}>
            <ImageBackground
                style={tw`w-full self-center grow`}
                imageStyle={tw`w-full h-[231px] object-cover`}
                source={require('../../assets/images/header_background.svg')}
            >
                <View style={tw`h-full`}>
                    {myGroups?.length < 1 ? (
                        <NoGroupsFound />
                    ) : (
                        <GroupsFound groups={myGroups} />
                    )}
                </View>
            </ImageBackground>
        </View>
    );
}
