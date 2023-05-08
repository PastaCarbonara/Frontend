import React, { useCallback, useEffect } from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import {
    SessionWebsocketContext,
    SessionWebsocketProvider,
} from './contexts/SessionContext';
import RecipeScreen from './screens/RecipeScreen';
import MatchScreen from './screens/MatchScreen';
import { Group, RootDrawerParamList, RootStackParamList } from './types';
import { navigationRef } from './RootNavigator';
import { useFonts } from 'expo-font';
import MyGroupsScreen from './screens/MyGroupsScreen';
import GroupScreen from './screens/GroupScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';
import { AuthProvider } from './contexts/AuthContext';
import Dropdown from './components/Dropdown';
import groupService from './services/GroupService';
import { Text } from 'react-native';

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    useFonts({
        'Baloo-Regular': require('./assets/fonts/Baloo-Regular.ttf'),
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    });
    return (
        <AuthProvider>
            <SessionWebsocketProvider>
                <NavigationContainer ref={navigationRef}>
                    <StackNavigator />
                </NavigationContainer>
            </SessionWebsocketProvider>
        </AuthProvider>
    );
}

export function DrawerNavigator() {
    const headerTitle = useCallback((props: any) => {
        return <SwipeScreenHeader props={props} />;
    }, []);
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: headerTitle,
                    headerTitleAlign: 'center',
                }}
            />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen
                name="Groups"
                component={MyGroupsScreen}
                options={{ headerTransparent: true }}
            />
        </Drawer.Navigator>
    );
}

export function StackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: 'slide_from_right',
            }}
        >
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
            <Stack.Screen
                name={'CreateGroup'}
                options={{
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitle: 'Groep maken',
                    animation: 'slide_from_right',
                }}
                component={CreateGroupScreen}
            />
            <Stack.Screen
                name="Group"
                component={GroupScreen}
                options={{
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                }}
            />
        </Stack.Navigator>
    );
}

function SwipeScreenHeader({ props }: { props: any }) {
    const [groups, setGroups] = React.useState<Group[]>([]);
    const [groupNames, setGroupNames] = React.useState<string[]>([]);
    const { setCurrentGroup } = React.useContext(SessionWebsocketContext);
    const onChange = (value: string) => {
        const currentGroup = groups.find((group) => group.name === value);
        if (!currentGroup) return;
        setCurrentGroup(currentGroup.id);
    };
    useEffect(() => {
        groupService.fetchGroups().then((res) => {
            setGroups(res);
            setGroupNames(res.map((group: Group) => group.name));
        });
    }, []);
    return groups.length > 0 ? (
        <Dropdown options={groupNames} onChange={onChange} {...props} />
    ) : (
        <Text>Home</Text>
    );
}
