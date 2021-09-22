import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View ,StyleSheet,Text} from 'react-native'
import { Button ,Input} from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome"
import { auth,db } from '../firebase'
const AddChatScreen=({navigation})=>{
    const [input,setInput]=useState("");
    const createChat=async ()=>{
        await db.collection(auth.currentUser.email).doc(input).set({
            chatName:input
        })
        .then(()=>{})
        .catch(error=>alert(error.message))
        
        await db.collection(input).doc(auth.currentUser.email).set({
            chatName:auth.currentUser.email
        })
        .then(()=>{
            navigation.goBack()
        })
        .catch(error=>alert(error.message))


    }
    useLayoutEffect(()=>{
        navigation.setOptions(
            {
                title:"Add a new chat"
            }
        )
        

    },[navigation])
    return (
        <View style={styles.container}>
        <Input placeholder="Enter a chat name"
        onChangeText={text=>setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
            <Icon name="wechat" type="antdesing" color="black" size={24}/>
        }
        />
        <Button
        onPress={createChat}
        
        title="create new chat"
        />
        </View>
    )
}
export default AddChatScreen
const styles = StyleSheet.create({

    container:{

    }
})
