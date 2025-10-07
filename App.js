import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Button } from 'react-native';
import Login from './pages/login';
import Todo from './pages/todo';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Home</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#ff5757' },
          headerTintColor: '#fff',
          drawerActiveTintColor: '#ff5757',
          drawerLabelStyle: { fontSize: 16 },
        }}
        drawerContent={(props) => (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
        )}
      >
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Drawer.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Drawer.Screen name="Todo" component={Todo} options={{ title: 'To-Do' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}