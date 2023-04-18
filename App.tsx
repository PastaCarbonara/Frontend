import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import { SessionWebsocketProvider } from './contexts/SessionContext';
import RecipeScreen from './screens/RecipeScreen';
import MatchScreen from './screens/MatchScreen';
import { RootDrawerParamList, RootStackParamList } from './types';
import { navigationRef } from './RootNavigator';
import { useFonts } from 'expo-font';
import GroupScreen from './screens/GroupScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    useFonts({
        'Baloo-Regular': require('./assets/fonts/Baloo-Regular.ttf'),
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    });
    return (
        <SessionWebsocketProvider>
            <NavigationContainer ref={navigationRef}>
                <StackNavigator />
            </NavigationContainer>
        </SessionWebsocketProvider>
    );
}

export function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="CreateGroup">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen
                name="Groups"
                component={GroupScreen}
                options={{
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                }}
            />
            <Drawer.Screen
                name={'CreateGroup'}
                options={{
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitle: 'Groep maken',
                }}
                component={CreateGroupScreen}
            />
        </Drawer.Navigator>
    );
}

export function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={DrawerNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Recipe"
                component={RecipeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Match"
                component={MatchScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
