import React, { useEffect, useLayoutEffect, useState,useRef  } from 'react'
import { View ,StyleSheet,Text, TouchableOpacity, TouchableWithoutFeedback,KeyboardAvoidingView, Platform, ScrollView, TextInput, Keyboard} from 'react-native'
import { Avatar } from 'react-native-elements'
import {AntDesign , SimpleLineIcons,Ionicons} from "@expo/vector-icons"
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as firebase from "firebase"
import { auth, db } from '../firebase'
const ChatScreen=({navigation,route})=>{
    const [input,setInput]=useState("")
    const [messages,setMessages]=useState([])
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Chat",
            headerBackTitleVisible:false,
            headerTitleAlign:"left",
            headerTitle:()=><View
            style={{
                flexDirection:"row",
                alignItems:"center"
            }}>
                <Avatar rounded
                source={{uri:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.png"}}
                />
                <Text style={{color:"white",marginLeft:10,fontWeight:"700"}}>
                        {route.params.chatName}
                </Text>
            </View>,
            // headerLeft:()=>(
            //     <TouchableOpacity
            //     style={{marginLeft:10}}
            //     onPress={navigation.goBack}
            //     >
            //         <AntDesign name="arrowleft" size={24} color="white"></AntDesign>
            //     </TouchableOpacity>
            // )
        })
    },[navigation])

    const sendMessage =async ()=>{

        Keyboard.dismiss();
        await db.collection(auth.currentUser.email).doc(route.params.id).collection("messages").add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp() || null,
            message:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL,
        })
        
        await db.collection(route.params.id).doc(auth.currentUser.email).collection("messages").add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp() || null,
            message:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL,
        })
        
        setInput("")

    }
    useLayoutEffect(()=>{
        const unsubscribe=db.collection(auth.currentUser.email).doc(route.params.id).
        collection("messages").orderBy("timestamp").onSnapshot(snapshot=>setMessages(
            snapshot.docs.map((doc)=>({
                id:doc.id,
                data:doc.data()
            }))
        ))
        // console.log(messages)

        // return unsubscribe
    },[route])
    const scrollViewRef = useRef();
    return (
        <SafeAreaView style={{ flex:1 ,backgroundColor:"white"}}>
        <StatusBar style="light" />
        <KeyboardAvoidingView
        behavior={Platform.OS==="ios"?"padding":"height"}
        style={styles.container}
        keyboardVerticalOffset={90}
        >
            {/* onPress={Keyboard.dismiss()} */}
            <TouchableWithoutFeedback  >
        <>
            <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                {messages.map(({id,data})=>(
                    data.email===auth.currentUser.email?
                    (
                        <View key={id} style={styles.reciever}>
                            <Avatar 
                            rounded
                            size={30}
                            position="absolute"
                            containerStyle={{
                                position:"absolute",
                                bottom:-15,
                                right:-5
                            }}
                            bottom={-15}
                            right={-5}
                            source={{
                                uri:data.photoURL || "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.png"
                            }}  />
                            <Text style={styles.recieverText}>{data.message}</Text>
                        </View>
                    ):
                    (

                        <View key={id} style={styles.sender}>
                        <Avatar 
                            rounded
                            size={30}
                            position="absolute"
                            containerStyle={{
                                position:"absolute",
                                bottom:-15,
                                left:-5
                            }}
                            bottom={-15}
                            left={-5}
                            source={{
                                uri:data.photoURL || "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.png"
                            }}  />
                        <Text style={styles.senderText}>{data.message}</Text>
                        <Text style={styles.senderName }>{data.displayName|| "test"}</Text>
                        </View>
                    )
                ))}
            </ScrollView>
            <View style={styles.footer}>
                <TextInput placeholder="Signal Message"
                value={input}
                onChangeText={(text)=>setInput(text)}
                style={styles.textInput}
                onSubmitEditing={sendMessage}
                />
                <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                    <Ionicons name="send" size={24} color="#2B68E6" />
                </TouchableOpacity>
            </View>
        </>
        </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
         
        </SafeAreaView>
    )
}
export default ChatScreen
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    footer:{
        flexDirection:"row",
        alignItems:"center",
        width:"100%",
        padding:15
    },
    textInput:{
        bottom:0,
        height:40,
        flex:1,
        marginRight:15,
        backgroundColor:"#ECECEC",
        padding:10,
        color:"grey",
        borderRadius:30,

    },
    recieverText:{
        color:"black",
        fontWeight:"500",
        marginLeft:10,
        marginBottom:15
    },
    senderText:{
        color:"white",
        fontWeight:"500",
        marginLeft:10,
        marginBottom:15
    },    
    reciever:{
        padding:10,
        alignSelf:"flex-end",
        backgroundColor:"#ECECEC",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    sender:{
        padding:10,
        backgroundColor:"#2B68E6",
        alignSelf:"flex-start",
        borderRadius:20,
        marginLeft:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    senderName:{
        left:10,
        paddingRight:10,
        fontSize:10,
        color:"white"
    }
})

