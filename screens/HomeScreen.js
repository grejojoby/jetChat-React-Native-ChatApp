
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {  ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth,db } from '../firebase.js';

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
            headerLeft:()=><View style={{marginLeft:0}}>
                <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                <Avatar
                rounded
                source={{uri:auth?.currentUser?.photoURL}}
                />
                </TouchableOpacity>
                
            </View>
        });
    },[])
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
