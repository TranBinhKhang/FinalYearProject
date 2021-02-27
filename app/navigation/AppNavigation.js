
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';

import WelcomeScreen from '../screens/WelcomeScreen';
import ViewImageScreen from '../screens/ViewImageScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();
const AppNavigator = () => (
    <Stack.Navigator initialRouteName="Welcome Screen">
        <Stack.Screen name="Welcome Screen" component={WelcomeScreen} options={{
          headerShown: false
        }}/>
      <Stack.Screen name="Login" component={LoginScreen} options={{
        headerTitleAlign: 'center'
      }}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{
        headerTitleAlign: 'center'
      }}/>
    </Stack.Navigator>
);

export default AppNavigator;