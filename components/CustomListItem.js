import React from 'react'
import { View ,StyleSheet,Text} from 'react-native'
import { Avatar } from 'react-native-elements'
import { ListItem } from 'react-native-elements'

const CustomListItem=({id,chatName})=>{
    return (
       <ListItem key={id}>
           <Avatar
           rounded
           source={{
               uri:"https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.png"
           }}
           />
           <ListItem.Content>
               <ListItem.Title style={{fontWeight:"800"}}>
                  {chatName}
               </ListItem.Title>
               <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
                   This is a test subtitle
               </ListItem.Subtitle>
           </ListItem.Content>
       </ListItem>

    )
}
export default CustomListItem
