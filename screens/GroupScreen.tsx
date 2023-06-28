import React, { useEffect, useState } from 'react';
import groupService from '../services/GroupService';
import tw from '../lib/tailwind';
import { ActivityIndicator, View } from 'react-native';
import HighlightedSessions from '../components/GroupInfo/HighlightedSessions';
import GroupMembers from '../components/GroupInfo/GroupMembers';
import Sessions from '../components/GroupInfo/Sessions';
import { Group, GroupStackParamList } from '../types';
import ImagePickerComponent from '../components/ImagePickerComponent';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackgroundImage from '../components/BackgroundImage';

export default function GroupScreen({ route }: { route: any }) {
    const { groupId } = route.params;
    const [groupData, setGroupData] = useState<Group>();
    const [isLoading, setIsLoading] = useState(true);
    const [upcomingSessions, setUpcomingSessions] = useState<any>();
    const { group } = groupService.useGroup(groupId);
    const navigation =
        useNavigation<NativeStackNavigationProp<GroupStackParamList>>();

    useEffect(() => {
        const fetchData = async () => {
            if (!group) return;
            navigation.setOptions({ title: group.name });
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
    }, [group, groupId, navigation]);
    return (
        <BackgroundImage>
            {isLoading ? (
                <View style={tw`flex-1 grow items-center justify-center`}>
                    <ActivityIndicator size="large" color="gray" />
                </View>
            ) : groupData ? (
                <View style={tw`w-full mt-16 gap-6`}>
                    <View style={tw`w-full mt-6 gap-6`}>
                        <ImagePickerComponent
                            initialImage={group.image?.urls.lg}
                        />
                    </View>
                    <View style={tw`px-4`}>
                        <GroupMembers members={groupData.users} />
                    </View>

                    <HighlightedSessions sessions={upcomingSessions} />
                    <View style={tw`px-4 mb-8 gap-6`}>
                        <Sessions sessions={groupData.swipe_sessions} />
                    </View>
                </View>
            ) : (
                <>Groep bestaat niet!</>
            )}
        </BackgroundImage>
    );
}
