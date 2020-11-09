import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon, Spinner } from 'native-base';
import authToken from './src/lib/authToken';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import SitterScreen from './src/screens/SitterScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabs = [
  { name: "Home", component: HomeScreen, icon: "home" },
  { name: "Search", component: SearchScreen, icon: "search" },
  { name: "Settings", component: SettingsScreen, icon: "user" },
];

export default function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState();

  useEffect(() => {
    (async () => {
      setToken(await authToken.get());
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Spinner />
  }

  const loggedIn = x => {
    authToken.set(x);
    setToken(x);
  }

  if (!token) {
    return <LoginScreen loggedIn={loggedIn} />
  }

  const Tabs = () => (
    <Tab.Navigator>
      {tabs.map((x, i) => (
        <Tab.Screen
          key={i}
          name={x.name}
          component={x.component}
          options={{
            tabBarIcon: ({ color, size: fontSize }) => (
              <Icon name={x.icon} type="FontAwesome5" style={{ color, fontSize }} />
            )
          }} />
      ))}
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Join Bubble !" component={Tabs} />
        <Stack.Screen name="SitterScreen" component={SitterScreen} options={({ route }) => ({ title: route.params.user.fullName })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}