import React, {useContext, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Text, Image, SafeAreaView, StyleSheet, TextInput, Platform, View} from 'react-native';
import jwtDecode from 'jwt-decode';
import * as SecureStore from "expo-secure-store";
import cache from '../utility/cache';
import securecache from '../utility/securecache';
import Auth from '../auth/auth';



function HomeScreen(props) {
    const { user, setUser } = useContext(Auth);

    const logout = async () => {
        setUser(null);
        await SecureStore.deleteItemAsync('token');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text>Hello, {user.userName}. Have fun studying.</Text>
            <Button title="log out" onPress={logout} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

    container: {
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        backgroundColor: 'white',
        flex: 0.6,
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 25
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#841584',
        marginBottom: 5,
    },
    error: {
        color: '#841584',
        marginBottom: 5,
        justifyContent: "center",
        textAlign: 'center',
        backgroundColor: "orange",
        borderWidth: 1,
        borderColor: 'red',
    },
   logo: {
       width: 90,
       height: 90,
       alignSelf: 'center',
       marginTop: 50,
       marginBottom: 20,
   },
   loginButton: {
    marginTop: 15,
    justifyContent: "center",
},
})

export default HomeScreen;