import React, { useEffect, useState } from "react";

import { View, Image, StyleSheet, TextInput, SafeAreaView, TouchableOpacity, Text } from 'react-native'

import * as Anima from 'react-native-animatable'
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Axios from "axios";

const Screen_register = ({ navigation }) => {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [endereco, setEndereco] = useState('')
    const [senha, setSenha] = useState('')
    const [confirma_senha, setConfirma_senha] = useState('')

    //register user
    const register = async () => {

        if ([nome, email, telefone, endereco, senha, confirma_senha].includes('')) {
            Toast.show({
                text1: 'Atenção',
                text2: 'Campos não preenchidos',
                topOffset: 50
            })
            return
        }

        if (senha === confirma_senha) {

            const user = {
                nome: nome,
                email: email,
                telefone: telefone,
                endereco: endereco,
                senha: senha
            }

            //register
            Axios.post("http://192.168.0.194:3000/register_user", {
                nome: user.nome,
                email: user.email,
                telefone: user.telefone,
                endereco: user.endereco,
                senha: user.senha
            }).catch(error => console.log('Error', error))
              
          navigation.navigate('login', { user_login: '' })   

        } else {
            Toast.show({
                text1: 'Atenção',
                text2: 'Senhas não conferem, tente outra vez',
                topOffset: 50
            })
            return
        }

    }  

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.img_fundo} source={require('../../image/img_1.jpg')} />
            <View style={styles.container_shadow}>

                <View style={styles.container_inputs} >
                    <Toast />
                    <Text style={styles.title} >Cadastrar</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Nome'
                        placeholderTextColor='rgba(255,0,0,.4)'
                        value={nome}
                        onChangeText={t => setNome(t)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Email'
                        placeholderTextColor='rgba(0,230,0,.4)'
                        value={email}
                        onChangeText={t => setEmail(t)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Telefone'
                        placeholderTextColor='rgba(0,230,0,.4)'
                        value={telefone}
                        onChangeText={t => setTelefone(t)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Endereço'
                        placeholderTextColor='rgba(0,230,0,.4)'
                        value={endereco}
                        onChangeText={t => setEndereco(t)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Senha'
                        placeholderTextColor='rgba(0,230,0,.4)'
                        value={senha}
                        onChangeText={t => setSenha(t)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Confirma senha'
                        placeholderTextColor='rgba(0,230,0,.4)'
                        value={confirma_senha}
                        onChangeText={t => setConfirma_senha(t)}
                    />

                    <View style={styles.container_login}>
                        <TouchableOpacity onPress={() => { register() }} style={styles.btn_login}>
                            <Text style={styles.text_login}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        </SafeAreaView>
    )
}

export default Screen_register;

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
        color: 'rgba(0,0,0, .7)',
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
