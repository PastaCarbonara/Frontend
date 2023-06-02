import React, { useCallback } from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    getFocusedRouteNameFromRoute,
    LinkingOptions,
    NavigationContainer,
    RouteProp,
} from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import {
    SessionWebsocketContext,
    SessionWebsocketProvider,
} from './contexts/SessionContext';
import RecipeScreen from './screens/RecipeScreen';
import MatchScreen from './screens/MatchScreen';
import {
    Group,
    GroupStackParamList,
    RootDrawerParamList,
    RootStackParamList,
} from './types';
import { navigationRef } from './RootNavigator';
import { useFonts } from 'expo-font';
import MyGroupsScreen from './screens/MyGroupsScreen';
import GroupScreen from './screens/GroupScreen';
import CreateGroupScreen from './screens/CreateGroupScreen';
import { AuthProvider } from './contexts/AuthContext';
import Dropdown from './components/Dropdown';
import groupService from './services/GroupService';
import { Text } from 'react-native';
import * as Linking from 'expo-linking';
import InviteScreen from './screens/InviteScreen';

const prefix = Linking.createURL('/');
const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();
const GroupsStack = createNativeStackNavigator<GroupStackParamList>();

export default function App() {
    const linking: LinkingOptions<RootStackParamList> = {
        prefixes: [prefix],
        config: {
            initialRouteName: 'Root',
            screens: {
                Root: {
                    initialRouteName: 'Home',
                    screens: {
                        Home: '',
                        Profile: 'profile',
                        Groups: {
                            //@ts-ignore typescript doesn't understand the types for initialRouteName here, but it is correct
                            initialRouteName: 'Groups',
                            screens: {
                                Groups: 'groups',
                                Group: 'group/:groupId',
                                Invite: 'group/:id/join',
                                CreateGroup: 'groups/new',
                            },
                        },
                    },
                },
                Recipe: 'recipe/:id',
            },
        },
    };

    useFonts({
        'Baloo-Regular': require('./assets/fonts/Baloo-Regular.ttf'),
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    });
    return (
        <AuthProvider>
            <SessionWebsocketProvider>
                <NavigationContainer linking={linking} ref={navigationRef}>
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
    const drawerHeaderShown = (
        route: RouteProp<RootDrawerParamList, keyof RootDrawerParamList>
    ) => {
        const focusedRouteName = getFocusedRouteNameFromRoute(route);
        return (
            (route.name === 'Groups' && !focusedRouteName) ||
            focusedRouteName === 'Groups' ||
            route.name === 'Home' ||
            route.name === 'Profile'
        );
    };
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => {
                return {
                    headerShown: drawerHeaderShown(route),
                };
            }}
        >
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: headerTitle,
                    headerTitleAlign: 'center',
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                }}
            />
            <Drawer.Screen
                name="Groups"
                component={GroupsStackNavigator}
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
        </Stack.Navigator>
    );
}

export function GroupsStackNavigator() {
    return (
        <GroupsStack.Navigator>
            <GroupsStack.Screen
                name="Groups"
                component={MyGroupsScreen}
                options={{ headerShown: false }}
            />
            <GroupsStack.Screen name="Invite" component={InviteScreen} />
            <GroupsStack.Screen
                name={'CreateGroup'}
                options={{
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                    headerTitle: 'Groep maken',
                    animation: 'slide_from_right',
                }}
                component={CreateGroupScreen}
            />
            <GroupsStack.Screen
                name="Group"
                component={GroupScreen}
                options={{
                    headerTransparent: true,
                    headerTitleAlign: 'center',
                }}
            />
        </GroupsStack.Navigator>
    );
}

function SwipeScreenHeader({ ...props }: { props: any }) {
    const { currentGroup, setCurrentGroup } = React.useContext(
        SessionWebsocketContext
    );
    const { groups } = groupService.useGroups();
    const onChange = (option: Group) => {
        setCurrentGroup(option.id);
    };
    const currentGroupObject = groups?.find(
        (group: Group) => group.id === currentGroup
    );
    return groups?.length > 0 ? (
        <Dropdown
            options={groups}
            onChange={onChange}
            initialOption={currentGroupObject}
            {...props}
        />
    ) : (
        <Text>Home</Text>
    );
}
