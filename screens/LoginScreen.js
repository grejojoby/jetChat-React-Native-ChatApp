import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPssword] = useState('');
    useEffect(()=>{
        const unsubscribe=auth.onAuthStateChanged((authUser)=>{
            if(authUser){
                // console.log(authUser)
                navigation.replace("Home")
            }
        })
    return unsubscribe;
    },[]);
    const signIn = () => {
        auth.signInWithEmailAndPassword(email,password)
        .catch(error=>alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/600px-Signal-Logo.svg.png",
            }}
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
            <Button raised containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button containerStyle={styles.button} onPress={() => navigation.navigate('Register')} type="outline" title="Register" />
            <View style={{height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
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
        marginTop: 10
    }
})
