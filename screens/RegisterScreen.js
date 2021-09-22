import React, { useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Button, Input, Text } from 'react-native-elements';
import {auth,db} from "../firebase"
const RegisterScreen = ({ navigation }) => {


const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState("https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.png");

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerBackTitle:"Login",
        })
    },[navigation])
    const register = () => {
        auth
        .createUserWithEmailAndPassword(email,password)
        .then((authUser)=>{
            authUser.user.updateProfile({
                displayName:name,
                photoURL:imageUrl 
            })
            db.collection("users").doc(email).set({
                photoURL:imageUrl
            })
            // console.log(authUser.user)
        }).catch(error=>alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>
                Create JoTok Account
            </Text>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Full Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={(text) =>setName(text)}
                />
                <Input 
                    placeholder="Email"
                    
                    type="email"
                    value={email}
                    onChangeText={(text) =>setEmail(text)}
                />
                <Input 
                    placeholder="Password"
                    secureTextEntry
                    type="password"
                    value={password}
                    onChangeText={(text) =>setPassword(text)}
                />
                <Input 
                    placeholder="Profile Picture Url (optional)"
                    type="text"
                    value={imageUrl}
                    onChangeText={(text) =>setImageUrl(text)}
                    // onSubmitEditing={register}
                />
            </View>

            <Button raised title="Register" onPress={register} style={styles.button} />
            <View style={{height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    button: {
        width: 200,
        marginTop: 10
    },
    inputContainer: {
        marginTop: 40,
        marginBottom: 20,
        width: 300
    }
})
