import React, { Fragment } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import tw from '../../lib/tailwind';

export default function NoGroupsFound() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <Fragment>
            <View
                style={tw`items-center w-full justify-items-center mt-35 h-30`}
            >
                <Text
                    style={tw`font-sans pt-7 bg-white text-center w-85/100 h-120/100 rounded-6x1`}
                >
                    Je hebt nog geen groepen
                    <TouchableOpacity
                        style={tw`w-85/100, mt-3, bg-orange_primary rounded-3x1`}
                        onPress={() => {
                            navigation.navigate('Create New Group');
                        }}
                    >
                        <Text style={tw`font-Poppins-Bold text-white p-2`}>
                            Maak een groep
                        </Text>
                    </TouchableOpacity>
                </Text>
            </View>
        </Fragment>
    );
}
