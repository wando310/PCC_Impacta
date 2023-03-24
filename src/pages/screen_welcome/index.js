import React, { useState, useEffect } from "react";

import { View, Image, StyleSheet, SafeAreaView } from 'react-native'

import * as Anima from 'react-native-animatable'
import { Toast } from "react-native-toast-message/lib/src/Toast";

const Screen_Welcome = ({ navigation }) => {

    setTimeout(() => { navigation.navigate('register') }, 3000)

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.img_fundo} source={require('../../image/img_1.jpg')} />
            <Toast />
            <View style={styles.container_shadow}>
                <Anima.Image animation='flipInY' duration={2000} source={require('../../image/logo_1.png')} style={styles.logo} />
            </View>
        </SafeAreaView>
    )
}

export default Screen_Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img_fundo: {
        height: '100%',
    },
    container_shadow: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0, .6)',
        alignItems: 'center',
        justifyContent: 'center'
    },
})