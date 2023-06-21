import React from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { GroupStackParamList } from '../types';
import groupService from '../services/GroupService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import tw from '../lib/tailwind';
import NoGroupsFound from '../components/Groups/NoGroupsFound';
import GroupsFound from '../components/Groups/GroupsFound';
import FloatingActionButton from '../components/FloatingActionButton';
import ImageBackground from '../components/ImageBackground';

export default function MyGroupsScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<GroupStackParamList>>();
    const { groups, isLoading } = groupService.useGroups();

    return (
        <View style={tw` h-full`}>
            <ImageBackground
                style={tw`w-full self-center grow bg-bg_color`}
                imageStyle={tw`w-full h-[231px] object-cover`}
                source={require('../assets/images/header_background.svg')}
            >
                <ScrollView
                    style={tw`h-full mt-15`}
                    contentContainerStyle={tw`h-full`}
                >
                    {isLoading ? (
                        <View
                            style={tw`flex-1 grow items-center justify-center`}
                        >
                            <ActivityIndicator size="large" color="gray" />
                        </View>
                    ) : groups?.length < 1 ? (
                        <NoGroupsFound />
                    ) : (
                        <GroupsFound groups={groups} />
                    )}
                </ScrollView>

                <FloatingActionButton
                    icon={'plus'}
                    color={'indigo_primary'}
                    onPress={() => {
                        navigation.navigate('CreateGroup');
                    }}
                />
            </ImageBackground>
        </View>
    );
}
