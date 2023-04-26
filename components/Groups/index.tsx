import React from 'react';
import { ImageBackground, View } from 'react-native';
import NoGroupsFound from './NoGroupsFound';
import GroupsFound from './GroupsFound';
import tw from '../../lib/tailwind';
import FloatingActionButton from '../FloatingActionButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';

export default function MyGroups({ myGroups }: any) {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View style={tw`bg-bg_color min-h-full`}>
            <ImageBackground
                style={tw`w-full self-center grow`}
                imageStyle={tw`w-full h-[231px] object-cover`}
                source={require('../../assets/images/header_background.svg')}
            >
                <View style={tw`h-full`}>
                    {myGroups?.length > 1 ? (
                        <NoGroupsFound />
                    ) : (
                        <GroupsFound groups={myGroups} />
                    )}
                    <FloatingActionButton
                        icon={'plus'}
                        color={'indigo_primary'}
                        onPress={() => {
                            navigation.navigate('CreateGroup');
                        }}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}
