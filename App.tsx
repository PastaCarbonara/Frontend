import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Profile from './screens/Profile';
import { SessionWebsocketProvider } from './contexts/SessionContext';
import RecipeScreen from './screens/RecipeScreen';
import { useFonts } from 'expo-font';
import MatchScreen from "./screens/MatchScreen";
import { Recipe } from './types';

export type RootStackParamList = {
    Root: undefined;
    Recipe: { id: number };
    Match: { recipe: Recipe };
};
export type RootDrawerParamList = {
    Home: undefined;
    Profile: undefined;
    Match: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    const [fontsLoaded] = useFonts({
        'Baloo-Regular': require('./assets/fonts/Baloo-Regular.ttf'),
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    });
    return (
        <SessionWebsocketProvider>
            <NavigationContainer>
                <StackNavigator />
            </NavigationContainer>
        </SessionWebsocketProvider>
    );
}

export function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Match" component={MatchScreen} options={{headerShown: false}} />
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
