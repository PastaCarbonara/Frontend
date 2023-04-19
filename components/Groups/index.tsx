import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import NoGroupsFound from './NoGroupsFound';
import GroupsFound from './GroupsFound';
import tw from '../../lib/tailwind';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import FloatingActionButton from '../FloatingActionButton';

export default function MyGroups({ myGroups }: any) {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View style={tw`bg-bg_color h-full`}>
            <ImageBackground
                style={tw`w-full self-center grow`}
                imageStyle={tw`w-full h-[231px] object-cover`}
                source={require('../../assets/images/header_background.svg')}
            >
                <View style={tw`h-full`}>
                    {myGroups?.length >= 1 ? (
                        <View
                            style={tw`flex flex-column justify-between grow h-full`}
                        >
                            <GroupsFound groups={myGroups} />
                            <FloatingActionButton
                                icon={'plus'}
                                color={'indigo_primary'}
                                onPress={() => {
                                    navigation.navigate('CreateGroup');
                                }}
                            />
                        </View>
                    ) : (
                        <View style={tw`w-full items-center`}>
                            <NoGroupsFound />
                            <View>
                                <Image
                                    source={require('../../assets/images/Sadge_Munchie.svg')}
                                    style={tw`w-full aspect-square mt-[10%]`}
                                    resizeMode={'contain'}
                                />
                                <Text
                                    style={tw`font-Poppins-Bold text-xl mt-[15%] text-text_primary/60`}
                                >
                                    Je hebt nog geen groepen ...
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            </ImageBackground>
        </View>
    );
}
