import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button, Icon } from 'native-base';
import LoginScreen from './src/screens/LoginScreen';
import RNRestart from 'react-native-restart';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
      <Icon name="home" type="FontAwesome5" />
      <Button onPress={() => {
        global.token = null;
        RNRestart.Restart();
      }}><Text>Logout</Text></Button>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {

  const [token, setToken] = useState(global.token);

  const loggedIn = x => {
    global.token = x;
    setToken(x);
  }

  if (!token) {
    return <LoginScreen loggedIn={loggedIn} />
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color, size: fontSize }) => <Icon name="home" style={{ color, fontSize }} /> }} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}