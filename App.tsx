import 'react-native-gesture-handler';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import {SessionWebsocketProvider} from "./contexts/SessionContext";
import Recipe from "./screens/Recipe";

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
