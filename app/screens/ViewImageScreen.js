import React from 'react';
import { ImageBackground, View, StyleSheet, Image, Text } from 'react-native';

function ViewImageScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.exit}></View>
            <View style={styles.delete}></View>
        <Image
        resizeMode="contain"
        style={styles.image}
        source={require("./cat.png")}
        />
        </View>
    );
}


const styles = StyleSheet.create({

    container: {
        backgroundColor: 'black',
        flex: 1,
    },

    exit: {
        width: 50,
        height: 50,
        backgroundColor: 'red',
        position: 'absolute',
        top: 40,
        left: 30,
    },

    delete: {
        width: 50,
        height: 50,
        backgroundColor: 'green',
        position: 'absolute',
        top: 40,
        right: 30,
    },
    
    image: {
        width: '100%',
        height: '100%',
    }
})

export default ViewImageScreen;