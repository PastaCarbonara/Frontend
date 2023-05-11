import React, { useCallback, useEffect, useState } from 'react';
import groupService from '../services/GroupService';
import { useIsFocused } from '@react-navigation/native';
import tw from '../lib/tailwind';
import { ActivityIndicator, ImageBackground, View } from 'react-native';
import HighlightedSessions from '../components/GroupInfo/HighlightedSessions';
import GroupMembers from '../components/GroupInfo/GroupMembers';
import Sessions from '../components/GroupInfo/Sessions';

export default function GroupScreen({ route }: { route: any }) {
    const { groupId } = route.params;
    const [groupData, setGroupData] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [upcomingSessions, setUpcomingSessions] = useState<any>();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const isFocused = useIsFocused();

    const refreshPageData = useCallback(() => {
        setIsRefreshing(true);
    }, []);

    useEffect(() => {
        console.log('refreshing data');
        const fetchData = async () => {
            try {
                const groupInfo = await groupService.fetchGroupInfo(groupId);
                setGroupData(groupInfo);
                setUpcomingSessions(
                    groupInfo.swipe_sessions.filter(
                        (session: any) =>
                            new Date(session.session_date) >=
                            new Date(new Date().toDateString())
                    )
                );
            } catch (error) {
                console.error('Failed to fetch groups:', error);
                // Handle the error (e.g., display an error message)
            } finally {
                setIsRefreshing(false);
                setIsLoading(false);
            }
        };
        void fetchData();
    }, [groupId, isFocused, isRefreshing]);
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
                <View style={tw`w-full p-4 mt-16 gap-6`}>
                    <HighlightedSessions sessions={upcomingSessions} />
                    <GroupMembers members={groupData.users} />
                    <Sessions
                        sessions={groupData.swipe_sessions}
                        onSessionsChange={refreshPageData}
                    />
                </View>
            ) : (
                <>Groep bestaat niet!</>
            )}
        </ImageBackground>
    );
}
