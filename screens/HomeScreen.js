
import React, { useEffect, useLayoutEffect, useState,useRef } from 'react'
import {  ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth,db } from '../firebase.js';
import {AntDesign , SimpleLineIcons} from "@expo/vector-icons"

import CustomListItem from '../components/CustomListItem.js';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import {Platform } from 'react-native';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  

const HomeScreen = ({navigation}) => {
    const [chats,setChats]=useState([]);
    const [users,setUsers]=useState([]);
    const [usersD,setUsersD]=useState({});

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    async function schedulePushNotification(username,msg) {

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You've got a new Message from "+username,
          body:msg,
         
        }
      
      });
    }
    
    async function registerForPushNotificationsAsync() {
      let token;
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } else {
        alert('Must use physical device for Push Notifications');
      }
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    
      return token;
    }
    
    useEffect(() => {
    //   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
    //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //     setNotification(notification);
    //   });
  
    //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //     console.log(response);
    //   });
  
    //   return () => {
    //     Notifications.removeNotificationSubscription(notificationListener.current);
    //     Notifications.removeNotificationSubscription(responseListener.current);
    //   };
        // schedulePushNotification("ASdf","ASDf")
     
    }, []);
  



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
        // console.log(chats)

    
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
                {chats.map(({id,data:{chatName,message,seen,notify}})=> <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} 
                message={message} seen={seen} notify={notify}
                schedulePushNotification={schedulePushNotification}
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
