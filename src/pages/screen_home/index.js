import React, { useState, useEffect } from "react";

import { View, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native'

import * as Anima from 'react-native-animatable'

import Icons from 'react-native-vector-icons/FontAwesome5'
import Icons_ from 'react-native-vector-icons/MaterialCommunityIcons'
import Icons_location from 'react-native-vector-icons/Ionicons'
import Axios from "axios";

const Screen_home = ({ route, navigation }) => {
    const { user_login } = route.params
    console.log('user_login = ',user_login);

    const [user_log, setUser_log] = useState(user_login)

    const nextPageTreino = () => navigation.navigate('treino')
    const nextPageImc = () => navigation.navigate('imc')

    //modal
    const [status, setStatus] = useState(true)
    const modalMenu = () => {
        data()
        status ? setStatus(false) : setStatus(true)
    }

    //get data
    const [id, setId] = useState()
    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [telefone, setTelefone] = useState()
    const [endereco, setEndereco] = useState()
    const data = async () => {

        setId(user_login.id)
        setNome(user_login.nome.replace("'", "").replace("'", ""))
        setEmail(user_login.email.replace("'", "").replace("'", ""))
        setTelefone(user_login.telefone.replace("'", "").replace("'", ""))
        setEndereco(user_login.endereco.replace("'", "").replace("'", ""))


    }

    useEffect(() => { data() }, [])

    const updateUser = () => {
        Axios.get("http://192.168.0.194:3000/get_user_/:id" + id)
            .then(response => {
                setUser_log(response.data)
                data()
            })
        //------------------------

        modalMenu()
        navigation.navigate('update', { use_home: user_log })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.img_fundo} source={require('../../image/img_1.jpg')} />
            <View style={styles.container_shadow}>

                {/* ----------------- MENU ------------------------ */}

                <Anima.View animation={status ? 'fadeOutLeft' : 'fadeInLeft'} duration={1000} style={status ? styles.menu : [styles.menu, { left: 0 }]}>
                    <Icons style={styles.icon_user_logo} name="user-alt" />
                    <TouchableOpacity onPress={() => { modalMenu() }} style={styles.btn_close}>
                        <Icons_ style={styles.icon_close} name="close-circle" />
                    </TouchableOpacity>
                    <View style={styles.container_user}>
                        <Icons style={styles.icon_user} name="user-alt" />
                        <View style={styles.data_user}>
                            <Text style={styles.title_user} >{nome}</Text>
                        </View>
                    </View>
                    <View style={styles.data_social}>
                        <View style={styles.data_icon}>
                            <Icons_ style={styles.social_icon} name="email" />
                            <Text style={styles.data} >{email}</Text>
                        </View>
                        <View style={styles.data_icon}>
                            <Icons_ style={styles.social_icon} name="phone" />
                            <Text style={styles.data} >{telefone}</Text>
                        </View>
                        <View style={styles.data_icon}>
                            <Icons_location style={styles.social_icon} name="location" />
                            <Text style={styles.data} >{endereco}</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => { updateUser() }} style={styles.btn_edit}>
                        <Icons style={styles.icon_edit} name="user-edit" />
                        <Text style={styles.btn_text}>Alterar</Text>
                    </TouchableOpacity>
                </Anima.View>

                {/* --------------------- MENU ----------------------- */}

                <View style={styles.container_munu}>
                    <TouchableOpacity style={status ? styles.munu : { opacity: 0 }} onPress={() => { modalMenu() }} >
                        <Anima.Image animation='lightSpeedIn' duration={3000} daley={4000} source={require('../../image/icons/menu.png')} />
                    </TouchableOpacity>
                </View>
                <Anima.Image animation='zoomIn' duration={2000} source={require('../../image/logo_1.png')} style={styles.img_logo} />
                <TouchableOpacity onPress={nextPageTreino} style={styles.btn}>
                    <Image source={require('../../image/img_4.jpg')} style={styles.img_treino} />
                    <Anima.Text animation='zoomIn' duration={1000} style={styles.text_treino} >Escolha seu treino</Anima.Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={nextPageImc} style={styles.btn}>
                    <Image source={require('../../image/imc_1.jpg')} style={styles.img_treino} />
                    <Anima.Text animation='zoomIn' duration={3000} style={styles.text_imc} >Calcule seu IMC</Anima.Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Screen_home;

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
    img_logo: {

    },
    btn: {
        width: '90%',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    img_treino: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 15,
        borderWidth: 4,
        borderColor: 'rgba(0,0,0, .3)',

    },
    text_treino: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '900',
        fontStyle: 'italic',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10
    },
    text_imc: {
        color: '#a524cb',
        fontSize: 25,
        fontWeight: '900',
        fontStyle: 'italic',
        textShadowColor: 'rgba(255, 255, 255, 1)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 10
    },
    container_munu: {
        width: '90%',
        top: 40,
        zIndex: 1
    },
    munu: {
        width: 35,
    },
    menu: {
        width: 350,
        height: '90%',
        position: 'absolute',
        top: 70,
        left: -350,
        backgroundColor: 'rgba(0,0,40, .8)',
        padding: 30,
        borderTopWidth: 10,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#3a86ff',
        zIndex: 1
    },
    container_user: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        bottom: 30,
        top: 0
    },
    icon_user: {
        fontSize: 40,
        right: 20,
        backgroundColor: '#3a86ff',
        padding: 10,
        borderRadius: 30,
        color: '#eee'
    },
    icon_user_logo: {
        width: 100,
        height: 100,
        fontSize: 60,
        backgroundColor: '#003049',
        padding: 20,
        borderRadius: 130,
        color: '#edf2f4',
        top: -80,
        left: 100,
        borderWidth: 3,
        borderColor: '#3a86ff'
    },
    title_user: {
        fontSize: 30,
        color: '#fff'
    },
    id_user: {
        fontSize: 18,
        color: '#219ebc'
    },
    data_icon: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 40
    },
    social_icon: {
        fontSize: 30,
        right: 20,
        color: '#cecece'
    },
    data: {
        fontSize: 20,
        color: '#cecece'
    },
    btn_edit: {
        flexDirection: 'row',
        backgroundColor: '#3a86ff',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        top: 70
    },
    icon_edit: {
        fontSize: 25,
        right: 10
    },
    btn_text: {
        fontSize: 20
    },
    btn_close: {
        fontSize: 40,
        position: 'absolute',
        left: 300,
        top: 6,
        color: '#3a86ff',
    },
    icon_close: {
        fontSize: 40,
        color: '#3a86ff',
    },
    data_social: {
        left: 10
    },
    data_user: {

    }
})