import React, { useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, Button, Input, Text } from 'react-native-elements';
import { auth, db } from "../firebase"
const RegisterScreen = ({ navigation }) => {
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

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login",
        })
    }, [navigation])
    const register = () => {
        if (imageUrl == "") {
            setImageUrl("https://robohash.org/" + email)
        }
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl === "" ? "https://robohash.org/" + email : imageUrl
                })
                db.collection("users").doc(email).set({
                    displayName: name,
                    photoURL: imageUrl === "" ? "https://robohash.org/" + email : imageUrl
                })
                // console.log(authUser.user)
            }).catch(error => alert(error.message))
    }

    return (
        <ScrollView style={styles.scrollContainer}>
            <KeyboardAvoidingView behavior="padding" style={styles.container} enabled keyboardVerticalOffset={50}>
                <StatusBar style="light" />
                <Text h3 style={{ marginBottom: 50 }}>
                    Create JetChat Account
                </Text>
                <View style={styles.inputContainer}>
                    <Input
                        placeholder="Full Name"
                        autoFocus
                        type="text"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                    <Input
                        placeholder="Email"

                        type="email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Input
                        placeholder="Password"
                        secureTextEntry
                        type="password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Input
                        placeholder="Profile Picture Url (optional)"
                        type="text"
                        value={imageUrl}
                        onChangeText={(text) => setImageUrl(text)}
                    // onSubmitEditing={register}
                    />
                </View>
                <ThemeProvider theme={theme}>
                    {/* <Button raised title="Register" onPress={register} style={styles.button} /> */}
                    <Button raised containerStyle={styles.buttonContainer} onPress={register} title="Register"/>
                </ThemeProvider>
                <View style={{ height: 50 }} />
            </KeyboardAvoidingView>
        </ScrollView >
    )
}

export default RegisterScreen

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
    inputContainer: {
        marginTop: 40,
        marginBottom: 20,
        width: 300
    }
})
