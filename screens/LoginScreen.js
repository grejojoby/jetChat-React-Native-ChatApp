import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemeProvider, Button, Input, Image } from "react-native-elements";
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';
// require('../assets/jotokIcon.png');

const LoginScreen = ({ navigation }) => {

    const theme = {
        colors: {
            primary: '#2B3595',
            secondary: 'white'
        },
        Button: {
            titleStyle: {
                // color: 'white',
            },
        },
    };

    const [email, setEmail] = useState('');
    const [password, setPssword] = useState('');
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // console.log(authUser)
                navigation.replace("Home")
            }
        })
        return unsubscribe;
    }, []);
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch(error => alert(error.message))
    }

    return (
        <ScrollView style={styles.scrollContainer}>
        <KeyboardAvoidingView behavior='padding' style={styles.container} keyboardVerticalOffset={50}>
            <StatusBar style="light" />
            <Image source={require('../assets/logo.png')}
                style={{ width: 200, height: 200 }}
            />

            <View style={styles.inputContainer}>
                <Input placeholder="Email"
                    autoFocus
                    type="email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) => setPssword(text)}
                    onSubmitEditing={signIn}
                />
            </View>
            <ThemeProvider theme={theme}>
                <Button raised containerStyle={styles.buttonContainer} onPress={signIn} title="Login"/>
                <Button containerStyle={styles.buttonSecContainer} onPress={() => navigation.navigate('Register')} type="outline" title="Register" />
            </ThemeProvider>
            <View style={{ height: 20 }} />
        </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    scrollContainer: {
        paddingVertical: 20,
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        marginTop: 40,
        marginBottom: 20,
        width: 300
    },
    button: {
        width: 200,
        marginTop: 10,
        backgroundColor: "#2B3595",
        color: 'white'
    },
    buttonContainer: {
        width: 200,
        marginTop: 10,
        backgroundColor: '#2B3595'
    },
    buttonSecContainer:
    {
        width: 200,
        marginTop: 10,
        backgroundColor: 'white',
        color: '#2B3595'
    }
})
