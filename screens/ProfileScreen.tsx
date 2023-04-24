import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { API_URL } from '@env';
import * as SecureStore from 'expo-secure-store';
import tw from '../lib/tailwind';

export default function ProfileScreen() {
    const [tokens, setToken] = useState();
    let username: string = '';
    let password: string = '';

    useEffect(() => {
        login(username, password)
            .then((authTokens) => {
                setToken(tokens);
                return authTokens;
            })
            .then((authTokens) => setTokensSecurely(authTokens))
            .then(() => console.log('TOKEN SET!'));
    }, []);
    return (
        <View>
            <Text style={tw`m-5 p-5 self-center`}>login page desu yo</Text>
            <TextInput
                style={tw`h-15 w-[85%] border-4 rounded self-center p-5 mt-5`}
                key={'username'}
                placeholder={'username'}
                placeholderTextColor={'#777777'}
                onChangeText={(text) => (username = text)}
            />
            <TextInput
                style={tw`h-15 w-[85%] border-4 rounded self-center p-5 mt-5`}
                key={'password'}
                placeholder={'password'}
                placeholderTextColor={'#777777'}
                onChangeText={(text) => (password = text)}
            />
            <Button
                onPress={async () => {
                    const secureTokens = await getTokensSecurely();
                    if (secureTokens) {
                        login(username, password).then
                        (() => refreshAuthToken(secureTokens))
                            .then((authTokens) => {
                                return authTokens;
                            })
                            .then((authTokens) => setTokensSecurely(authTokens))
                            .then(() => getTokensSecurely())
                            .then((data) => {
                                console.log('cl001');
                                console.log(data);
                            });
                    } else {
                        login(username, password)
                            .then((authTokens) => {
                                console.log('cl002');
                                console.log(authTokens);
                                setToken(authTokens);
                                return authTokens;
                            })
                            .then((authTokens) => setTokensSecurely(authTokens))
                            .then(() => getTokensSecurely())
                            .then((data) => {
                                console.log('cl003');
                                console.log(data);
                            });
                    }
                }}
                title={'buttoff'}
            />
        </View>
    );
}
function setTokensSecurely(unstoredTokens) {
    console.log('cl004');
    console.log(unstoredTokens);
    SecureStore.setItemAsync('auth-token', unstoredTokens[0]);
    SecureStore.setItemAsync('refresh-token', unstoredTokens[1]);
}

function getTokensSecurely() {
    return SecureStore.getItemAsync('auth-token')
        .then((data) => {
            return [data, SecureStore.getItemAsync('refresh-token')];
        })
        .then((data) => {
            if (data) {
                return data;
            }
            alert('You are not logged in!');
        });
}

function login(username: string, password: string) {
    return fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('cl000');
            console.log(data);
            return [data.access_token, data.refresh_token];
        });
}

function tokenLogin(refreshToken: string, uuid: string) {
    return fetch(`${API_URL}/auth/client-token-login`, {
        method: 'POST',
        headers: {
            Authorization: `bearer ${refreshToken}`,
        },
        body: JSON.stringify({
            token: uuid,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        });
}

function refreshAuthToken(authTokens) {
    return fetch(`${API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            access_token: authTokens[0],
            password: authTokens[1],
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            return [data.access_token, data.refresh_token];
        });
}
