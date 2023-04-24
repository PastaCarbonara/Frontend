import React, { useContext } from 'react';
import { Pressable, Text, View } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';

export default function ProfileScreen() {
    const auth = useContext(AuthContext);
    return (
        <View>
            <Text>Profile screen</Text>
            <Pressable
                onPress={async () => {
                    console.log(auth.getCookie('access_token'));
                }}
            >
                <Text>Press me</Text>
            </Pressable>
        </View>
    );
}
