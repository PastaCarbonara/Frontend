import { ImageBackground, View } from 'react-native';
import React from 'react';
import tw from '../../lib/tailwind';
import HighlightedSessions from './HighlightedSessions';
import GroupMembers from './GroupMembers';
import Sessions from './Sessions';

export default function GroupInfo({ group }: { group: any }) {
    const { swipe_sessions, users } = group;
    const upcoming_sessions = swipe_sessions.filter(
        (session: any) =>
            new Date(session.session_date) >=
            new Date(new Date().toDateString())
    );

    return group ? (
        <ImageBackground
            source={require('../../assets/images/header_background.svg')}
            style={tw`w-full grow bg-bg_color`}
            imageStyle={tw`w-full h-[231px]`}
            resizeMode={'cover'}
        >
            <View style={tw`w-full p-4 mt-16 gap-6`}>
                <HighlightedSessions sessions={upcoming_sessions} />
                <GroupMembers members={users} />
                <Sessions sessions={swipe_sessions} />
            </View>
        </ImageBackground>
    ) : (
        <>Loading...</>
    );
}
