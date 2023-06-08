import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import tw from '../../../lib/tailwind';

export default function NoGroupsFound() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View style={tw`w-full items-center`}>
            <View
                style={tw`items-center w-full justify-items-center mt-20 h-30`}
            >
                <View style={tw`bg-white w-85/100 rounded-6x1`}>
                    <Text style={tw`font-sans pt-7 text-center`}>
                        Je hebt nog geen groepen
                    </Text>
                    <TouchableOpacity
                        style={tw`w-85/100 m-4 bg-orange_primary rounded-3x1 font-sans text-center self-center`}
                        onPress={() => {
                            navigation?.navigate('CreateGroup');
                        }}
                    >
                        <Text style={tw`font-Poppins-Bold text-white p-2`}>
                            Maak een groep
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Image
                    source={require('../../../assets/images/Sadge_Munchie.svg')}
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
    );
}
