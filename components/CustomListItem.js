import React from 'react'
import { View ,StyleSheet,Text} from 'react-native'
import { Avatar } from 'react-native-elements'
import { ListItem } from 'react-native-elements'

const CustomListItem=({id,chatName,chatImg,enterChat,message})=>{
    return (
       <ListItem key={id} onPress={()=>enterChat(id,chatName,chatImg)}>
           <Avatar
           rounded
           source={{
               uri:chatImg
           }}
           />
           <ListItem.Content>
               <ListItem.Title style={{fontWeight:"800"}}>
                  {chatName}
               </ListItem.Title>
               <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                   {message}
               </ListItem.Subtitle>
           </ListItem.Content>
       </ListItem>

    )
}
export default CustomListItem
