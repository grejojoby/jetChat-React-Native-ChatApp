import React, { useEffect, useState } from 'react'
import {  ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomListItem from '../components/CustomListItem.js';
const HomeScreen = ({navigation}) => {


    return (
        <SafeAreaView>
            <ScrollView>
             <CustomListItem></CustomListItem>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({

})
