import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View ,StyleSheet,Text} from 'react-native'
import { Avatar } from 'react-native-elements'

const ChatScreen=({navigation,route})=>{
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
            </View>
        })
    },[navigation])
    return (
        <View>
            <Text>{route.params.chatName}</Text>
        </View>
    )
}
export default ChatScreen
const styles = StyleSheet.create({

})
