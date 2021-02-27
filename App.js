//import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, StatusBar, Platform, Text, Button, TouchableWithoutFeedback, Alert, View, Image, SafeAreaView } from 'react-native';
import { useDimensions } from '@react-native-community/hooks';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';

import WelcomeScreen from './app/screens/WelcomeScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import LoginScreen from './app/screens/LoginScreen';
import HomeScreen from './app/screens/HomeScreen';
import Auth from './app/auth/auth';
import securecache from './app/utility/securecache';
import AppNavigator from './app/navigation/AppNavigation';
import jwtDecode from 'jwt-decode';
import SuccessNavigator from './app/navigation/SuccessNavigation';


export default function App() {

  const [user, setUser] = useState();

  const automaticLogin = async () => {
    const token = await securecache.secureGet('token');
    if (!token) return;
    setUser(token);
  };
  
  useEffect(() => {
    automaticLogin();
  }, [])

  //return <WelcomeScreen />
  return ( 
  <Auth.Provider value={{user, setUser}}>
  
  <NavigationContainer>
 {user ? <SuccessNavigator /> : <AppNavigator />} 

  </NavigationContainer>
  
  </Auth.Provider>
  );
}