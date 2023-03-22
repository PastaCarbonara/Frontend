import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Recipe from "./screens/Recipe";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Stack.Screen name={"Recipe"} component={Recipe}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export function MyStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="App" component={ App } />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
