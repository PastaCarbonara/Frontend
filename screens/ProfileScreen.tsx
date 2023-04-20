import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

export default function ProfileScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View>
            <Text>Profile screen</Text>
            <Pressable
                onPress={() => {
                    navigation.navigate('Group', {
                        groupId: 'Qzyxv13gV69bejKo',
                    });
                }}
            >
                <Text>Press me</Text>
            </Pressable>
        </View>
    );
}
