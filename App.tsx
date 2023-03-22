import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import {SessionWebsocketProvider} from "./contexts/SessionContext";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
      <SessionWebsocketProvider>
          <NavigationContainer>
              <Drawer.Navigator initialRouteName="Home">
                  <Drawer.Screen name="Home" component={Home} />
                  <Drawer.Screen name="Profile" component={Profile} />
              </Drawer.Navigator>
          </NavigationContainer>
      </SessionWebsocketProvider>
  );
}
