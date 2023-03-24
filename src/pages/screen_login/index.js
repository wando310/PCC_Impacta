import React, { useState, useEffect } from "react";

import { View, Image, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, Text } from 'react-native'

import * as Anima from 'react-native-animatable'
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Axios from "axios";

const Screen_login = ({ navigation }) => {  

    //get token
    let token = ''
    const getUser = async () => {
        Axios.get("http://192.168.0.194:3000/get_user_token")
            .then(response => {
                token = [...response.data].pop()

                setEmail_t(token.email)
                setPassword_t(token.senha)
                setToken_(token)

            })
    }


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [email_t, setEmail_t] = useState('')
    const [password_t, setPassword_t] = useState('')
    const [token_, setToken_] = useState('')
    const login = async () => {

        getUser()

        if (email === '' || password === '') {
            Toast.show({
                type: 'error',
                text1: 'Atenção',
                text2: 'Email ou Password não preenchidos'
            })
            return
        }

        email == email_t.replace("'", "").replace("'", "")
            && email != ''
            && password == password_t.replace("'", "").replace("'", "")
            && password != '' ? navigation.navigate('home', { user_login: token_ })

            :

            Toast.show({
                type: 'error',
                text1: 'Atenção',
                text2: 'Senha Incorreta'
            })

    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.img_fundo} source={require('../../image/img_1.jpg')} />
            <View style={styles.container_shadow}>


                <View style={styles.container_inputs} >
                    <Toast />
                    <Text style={styles.title} >Login</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        placeholderTextColor='rgba(0,230,0,.5)'
                        value={email}
                        onChangeText={t => setEmail(t)}
                    />
                    <TextInput
                        style={styles.password}
                        placeholder='Password'
                        placeholderTextColor='rgba(0,230,0,.5)'
                        value={password}
                        onChangeText={t => setPassword(t)}
                    />

                    <View style={styles.container_login}>
                        <TouchableOpacity onPress={() => { navigation.navigate('register') }} style={styles.btn_register}>
                            <Text style={styles.text_register}>Register user</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { login() }} style={styles.btn_login}>
                            <Text style={styles.text_login}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Screen_login;

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
        backgroundColor: 'rgba(0,0,0, .4)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container_inputs: {
        backgroundColor: 'rgba(0,0,0, .7)',
        padding: 30,
        borderRadius: 10,
        paddingBottom: 70,
        paddingTop: 10,
    },
    input: {
        width: 300,
        marginBottom: 30,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,255,0, .8)',
        fontSize: 20,
        padding: 3,
        color: '#fff'
    },
    password: {
        width: 300,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,255,0, .8)',
        fontSize: 20,
        padding: 3,
        color: '#fff'
    },
    btn_login: {
        backgroundColor: '#ae2012',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginTop: 40,

    },
    text_login: {
        fontSize: 20
    },
    text_register: {
        fontSize: 16,
        color: 'rgba(0,200,0, .7)',
        textAlign: 'right',
        top: 5
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        letterSpacing: 15,
        marginBottom: 70,
        fontStyle: 'italic',
        fontWeight: '700',
        color: 'rgba(0,255,0, .7)',
    }
})