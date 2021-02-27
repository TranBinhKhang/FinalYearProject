import React, {useContext, useState} from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import {Button, Text, Image, SafeAreaView, StyleSheet, TextInput, Platform, View} from 'react-native';
import cache from '../utility/cache';
import securecache from '../utility/securecache';
import Auth from '../auth/auth';

const webaddress = 'http://192.168.1.142:4000';
const browseraddress = 'http://localhost:19006/'

function RegisterScreen(props) {
    const { user, setUser } = useContext(Auth);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userName, setUserName] = useState();
    const [isError, setIsError] = useState(false)

    const handleRegister = async () => {
        const accountObj = {
            email: email,
            password: password,
            userName: userName
          };

          const stuff = await axios.post('http://192.168.1.142:4000/api/register', accountObj)
          .then(setIsError(false))
          .catch(err =>{
            setIsError(true)
        });
        console.log(stuff.headers["x-auth-token"]);
        const user = jwtDecode(stuff.headers["x-auth-token"]);
        setUser(user);
            try {  
                await securecache.secureStore('token', stuff.headers["x-auth-token"]); 
            } catch (error) {
                console.log(error)
            }
        };

    return (
        <SafeAreaView style={styles.container}>
            <Image source={{uri: 'https://picsum.photos/200/300/',}} 
            style={styles.logo} />
            <Text style={styles.title}>Gemini Registration Form</Text>
            {isError && <Text style={styles.error}>Invalid account credentials</Text>}
            <TextInput 
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType='email-address'
            placeholder="Email"
            borderWidth={1}
            height={40}
            borderColor='#841584'
            onChangeText={text => setEmail(text)}
            />
            <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="password"
            secureTextEntry
            borderWidth={1}
            height={40}
            marginTop={10}
            borderColor='#841584'           
            onChangeText={text => setPassword(text)} 
            />
            <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            icon=''
            placeholder="username"
            borderWidth={1}
            height={40}
            marginTop={10}  
            borderColor='#841584'         
            onChangeText={text => setUserName(text)} 
            />
            {/* <View style={styles.loginButton}> */}
            <Button title='Register account' onPress={handleRegister}
                            color="#841584"></Button>
                            {/* </View> */}
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
        padding: 10,
        marginBottom: -50
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

export default RegisterScreen;