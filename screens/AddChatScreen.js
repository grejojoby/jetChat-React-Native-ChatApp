import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { ThemeProvider, Button, Input, Image, Text } from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome"
import { auth, db } from '../firebase'
const AddChatScreen = ({ navigation }) => {

    const theme = {
        colors: {
            primary: 'white',
            secondary: 'white'
        },
        Button: {
            titleStyle: {
                // color: 'white',
            },
        },
    };


    const [input, setInput] = useState("");
    const createChat = async () => {
        await db.collection(auth.currentUser.email).doc(input).set({
            chatName: input
        })
            .then(() => { })
            .catch(error => alert(error.message))

        await db.collection(input).doc(auth.currentUser.email).set({
            chatName: auth.currentUser.email
        })
            .then(() => {
                navigation.goBack()
            })
            .catch(error => alert(error.message))


    }
    useLayoutEffect(() => {
        navigation.setOptions(
            {
                title: "Start New Chat"
            }
        )


    }, [navigation])
    return (
        <View style={styles.container}>
            <Input placeholder="Enter a chat name"
                onChangeText={text => setInput(text)}
                onSubmitEditing={createChat}
                leftIcon={
                    <Icon name="wechat" type="antdesing" color="#2B3595" size={24} />
                }
            />
            <ThemeProvider theme={theme}>
                <Button
                    onPress={createChat} type='outline'
                    containerStyle={styles.buttonContainer}
                    title="Search"
                />
            </ThemeProvider>
            <View style={styles.BelowContainer}>
                <Image source={require('../assets/JetChatLogo.png')}
                    style={styles.imageStyle} />
                <Text h2 style={styles.AppTitle}>JetChat</Text>
                <Text h5 style={styles.SubTitle}>Developed By</Text>
                <Text h4 style={styles.SubTitle}>Grejo Joby</Text>
                <Text h4 style={styles.SubTitle}>Hayden Cordeiro</Text>
                <Text h4 style={styles.SubTitle}>Manasi Anantpurkar</Text>

            </View>

        </View>
    )
}
export default AddChatScreen
const styles = StyleSheet.create({

    container: {
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    buttonContainer: {
        width: 300,
        marginTop: 10,
        backgroundColor: '#2B3595',
        color: 'white'
    },
    BelowContainer: {
        marginVertical: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: 150,
        height: 150,
    },
    AppTitle: {
        margin: 20,
        textAlign: 'center',
        width: '100%',
        color: '#999',
        margin: '20%',
        marginTop: 5,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    SubTitle: {
        margin: 5,
        textAlign: 'center',
        width: '100%',
        color: '#999',
        marginTop: 5,
        justifyContent: 'center',
        alignSelf: 'center'
    },

})
