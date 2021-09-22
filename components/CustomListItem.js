import React from 'react'
import { View ,StyleSheet,Text} from 'react-native'
import { Avatar ,Badge} from 'react-native-elements'
import { ListItem } from 'react-native-elements'

const CustomListItem=({id,chatName,chatImg,enterChat,message,seen})=>{
    return (
       <ListItem key={id} onPress={()=>enterChat(id,chatName,chatImg)}>
           <View>
           <Avatar
           rounded
           source={{
               uri:chatImg
           }}
           />
           {

            seen?<></>:  <Badge
            status="success"
            containerStyle={{ position: 'absolute', top: -4, right: -4 }}
        />
           }
       
        </View>
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
