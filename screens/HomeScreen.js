
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {  ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth,db } from '../firebase.js';
import {AntDesign , SimpleLineIcons} from "@expo/vector-icons"

import CustomListItem from '../components/CustomListItem.js';
const HomeScreen = ({navigation}) => {
    const signOutUser=()=>{
        auth.signOut().then(()=>{
            navigation.replace("Login")
        })
    }
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
                source={{uri:auth?.currentUser?.photoURL?auth?.currentUser?.photoURL:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.png"}}
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
                <TouchableOpacity activeOpacity={0.5}>
                <SimpleLineIcons name="pencil" size={24} color="black" />
                </TouchableOpacity>
            </View>)
        });
    },[navigation])
    return (
        <SafeAreaView>
            <ScrollView>
             <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({

})
