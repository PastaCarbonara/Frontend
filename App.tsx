import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import {SessionWebsocketProvider} from "./contexts/SessionContext";
import Recipe from "./screens/Recipe";
import { useFonts } from 'expo-font';

export type RootStackParamList = {
    Root: undefined;
    Recipe: { id: number };
};
export type RootDrawerParamList = {
    Home: undefined;
    Profile: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    const [fontsLoaded] = useFonts({
        'Baloo-Regular': require('./assets/fonts/Baloo-Regular.ttf'),
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf')
    });
    return (
        <SessionWebsocketProvider>
            <NavigationContainer>
                <StackNavigator/>
            </NavigationContainer>
        </SessionWebsocketProvider>
    );
}

export function DrawerNavigator() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home}/>
            <Drawer.Screen name="Profile" component={Profile}/>
        </Drawer.Navigator>
    )
}

export function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Root"
                component={DrawerNavigator}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Recipe"
                component={Recipe}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
}
