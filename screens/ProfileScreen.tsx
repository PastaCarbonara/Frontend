import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { cookieHelper } from '../helpers/CookieHelper';

export default function ProfileScreen() {
    return (
        <View>
            <Text>Profile screen</Text>
            <Pressable
                onPress={async () => {
                    console.log(cookieHelper.getCookie('access_token'));
                    console.log(cookieHelper.getCookie('refresh_token'));
                }}
            >
                <Text>Press me</Text>
            </Pressable>
        </View>
    );
}
