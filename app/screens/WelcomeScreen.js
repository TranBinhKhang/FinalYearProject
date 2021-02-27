import React from 'react';
import { ImageBackground, View, StyleSheet, Image, Text, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';

function WelcomeScreen(props) {
    return (
        <ImageBackground
        style={styles.background}
        source={require("./background.png")}
        >
            <View style={styles.logoContainer}>

        <Image style={styles.logo} source={require("./favicon.png")}/>
        <Text>Welcome to EnglishApp</Text>
            </View>
            <View style={styles.loginButton}>
            <Button title="Login" onPress={() => props.navigation.navigate('Login')} />

            
            <Button title="Register" onPress={() => props.navigation.navigate('Register')} />
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    logoContainer: {
        position: "absolute",
        top: 10,
        alignItems: "center"
    },
    loginButton: {
        width: '50%',
        height: 70,
        justifyContent: "center",
        backgroundColor: 'blue',
    },
    logo:{
        width: 80,
        height: 80,
    },
    registerButton: {
        width: '50%',
        height: 70,
        justifyContent: "center",
        backgroundColor: 'teal',
    }

})

export default WelcomeScreen;