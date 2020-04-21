/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './screens/home';
import SingleProject from './screens/singleProject';
import Login from './components/auth/signIn';
import Register from './components/auth/signUp';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home">
          {props => <Home {...props} extraData={'someData'} />}
        </Stack.Screen>
        <Stack.Screen name="SingleProject">
        {props => <SingleProject {...props} extraData={'someData'} />}
        </Stack.Screen> 
        <Stack.Screen name="Login">
        {props => <Login {...props} extraData={'someData'} />}
        </Stack.Screen> 
        <Stack.Screen name="Register">
        {props => <Register {...props} extraData={'someData'} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
