
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {  ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth,db } from '../firebase.js';
import {AntDesign , SimpleLineIcons} from "@expo/vector-icons"

import CustomListItem from '../components/CustomListItem.js';
const HomeScreen = ({navigation}) => {
    const [chats,setChats]=useState([]);
    const [users,setUsers]=useState([]);
    const [usersD,setUsersD]=useState({});

    const signOutUser=()=>{
        auth.signOut().then(()=>{
            navigation.replace("Login")
        })
    }
    useEffect(()=>{
        const unsubscribe=db.collection(auth.currentUser.email).onSnapshot((snapshot)=>
        setChats(snapshot.docs.map((doc)=>({
            id:doc.id,
            data:doc.data(),
        }))
        )
        
    );
    return unsubscribe
    },[]);
    
    useEffect(()=>{
        
        const unsubscribe=db.collection("users").onSnapshot((snapshot)=>
        setUsers(snapshot.docs.map((doc)=>({
            id:doc.id,
            data:doc.data(),
        }))
        )
        );
        console.log(chats)

    
    return unsubscribe
    
    },[]);

    useEffect(()=>{
    // console.log(users)
    var d={}
    for(var i=0;i<users.length;i++){
        d[users[i].id]=users[i].data.photoURL
    }
    setUsersD(d)
    },[users])

    

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"joTok",
            headerStyle:{backgroundColor:"#fff"},
            headerTitleStyle:{color:"black"},
            headerTintColor:"black",
            headerTitleAlign: 'center',
            headerLeft:()=>(<View style={{marginLeft:0}}>
                <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                <Avatar
                rounded


                source={{uri:(auth?.currentUser?.photoURL)?(auth?.currentUser?.photoURL):"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.png"}}
              
                />
                </TouchableOpacity>
                
            </View>),
            headerRight:()=>(<View style={{
                flexDirection:"row",
                justifyContent:"space-between",
                width:60,
                marginRight:5
            }}>
                <TouchableOpacity activeOpacity={0.5}>
                <AntDesign name="camerao" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("AddChat")} 
                 activeOpacity={0.5} >
                <SimpleLineIcons name="pencil" size={24} color="black" />
                </TouchableOpacity>
            </View>)
        });
    },[navigation])
    const enterChat=(id,chatName,chatImg)=>{
        navigation.navigate("Chat",{
            id,
            chatName,
            chatImg
        })
    }
    // console.log(users)


    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id,data:{chatName,message,seen}})=> <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} 
                message={message} seen={seen}
                chatImg={usersD[chatName]?usersD[chatName]:"https://robohash.org/"+chatName}/>
                    
                )}
         
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        height:"100%",
    }

})
