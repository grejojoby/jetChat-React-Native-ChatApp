import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { ThemeProvider, Button, Input } from 'react-native-elements'
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
        </View>
    )
}
export default AddChatScreen
const styles = StyleSheet.create({

    container: {
        padding: 20,
    },
    buttonContainer: {
        // width: 200,
        marginTop: 10,
        backgroundColor: '#2B3595',
        color: 'white'
    },
})
