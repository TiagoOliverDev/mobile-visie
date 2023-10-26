import React from "react";
import {
    View,
    StyleSheet,
    Text,
    StatusBar
} from 'react-native'

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Header(){
    return(
        <View style={styles.container}> 
            <Text>Header</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor: '#8000ff',
        paddingTop: statusBarHeight,
    }
})