import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    View,
} from 'react-native';
import { Group, RootStackParamList } from '../types';
import groupService from '../services/GroupService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from '../lib/tailwind';
import NoGroupsFound from '../components/Groups/NoGroupsFound';
import GroupsFound from '../components/Groups/GroupsFound';
import FloatingActionButton from '../components/FloatingActionButton';

export default function MyGroupsScreen() {
    const [myGroups, setMyGroups] = useState<Group[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const groups = await groupService.fetchGroups();
                setMyGroups(groups);
            } catch (error) {
                console.error('Failed to fetch groups:', error);
                // Handle the error (e.g., display an error message)
            } finally {
                setIsLoading(false);
            }
        };
        void fetchData();
    }, []);
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View style={tw`bg-bg_color h-full`}>
            <ImageBackground
                style={tw`w-full self-center grow`}
                imageStyle={tw`w-full h-[231px] object-cover`}
                source={require('../assets/images/header_background.svg')}
            />
            <ScrollView
                style={tw`h-full mt-15`}
                contentContainerStyle={tw`h-full`}
            >
                {isLoading ? (
                    <View style={tw`flex-1 grow items-center justify-center`}>
                        <ActivityIndicator size="large" color="gray" />
                    </View>
                ) : myGroups?.length < 1 ? (
                    <NoGroupsFound />
                ) : (
                    <GroupsFound groups={myGroups} />
                )}
            </ScrollView>

            <FloatingActionButton
                icon={'plus'}
                color={'indigo_primary'}
                onPress={() => {
                    navigation.navigate('CreateGroup');
                }}
            />
        </View>
    );
}
