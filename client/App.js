import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Spinner } from 'native-base';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import authToken from './src/lib/authToken';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const tabs = [
  { name: "Home", component: HomeScreen, icon: "home" },
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

  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}