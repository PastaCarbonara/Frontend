import React, { useEffect, useState } from 'react';
import groupService from '../services/GroupService';
import tw from '../lib/tailwind';
import { ActivityIndicator, ImageBackground, View } from 'react-native';
import HighlightedSessions from '../components/GroupInfo/HighlightedSessions';
import GroupMembers from '../components/GroupInfo/GroupMembers';
import Sessions from '../components/GroupInfo/Sessions';
import { Group } from '../types';

export default function GroupScreen({ route }: { route: any }) {
    const { groupId } = route.params;
    const [groupData, setGroupData] = useState<Group>();
    const [isLoading, setIsLoading] = useState(true);
    const [upcomingSessions, setUpcomingSessions] = useState<any>();
    const { group } = groupService.useGroup(groupId);

    useEffect(() => {
        const fetchData = async () => {
            if (!group) return;
            try {
                setGroupData(group);
                setUpcomingSessions(
                    group.swipe_sessions.filter(
                        (session: any) =>
                            new Date(session.session_date) >=
                            new Date(new Date().toDateString())
                    )
                );
            } catch (error) {
                console.error('Failed to fetch groups:', error);
                // Handle the error (e.g., display an error message)
            } finally {
                setIsLoading(false);
            }
        };
        void fetchData();
    }, [group, groupId]);
    return (
        <ImageBackground
            source={require('../assets/images/header_background.svg')}
            style={tw`w-full grow bg-bg_color`}
            imageStyle={tw`w-full h-[231px]`}
            resizeMode={'cover'}
        >
            {isLoading ? (
                <View style={tw`flex-1 grow items-center justify-center`}>
                    <ActivityIndicator size="large" color="gray" />
                </View>
            ) : groupData ? (
                <View style={tw`w-full mt-16 gap-6`}>
                    <View style={tw``}>
                        <HighlightedSessions sessions={upcomingSessions} />
                    </View>

                    <View style={tw`p-4 gap-6`}>
                        <GroupMembers members={groupData.users} />
                        <Sessions sessions={groupData.swipe_sessions} />
                    </View>
                </View>
            ) : (
                <>Groep bestaat niet!</>
            )}
        </ImageBackground>
    );
}
