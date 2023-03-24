import React, { useState } from "react";
import { View, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import Slider from '@react-native-community/slider'
import Toast from 'react-native-toast-message'

import * as Anima from 'react-native-animatable'

import IconHistoric from 'react-native-vector-icons/AntDesign'
import IcomHome from 'react-native-vector-icons/FontAwesome'

import Axios from "axios";

const Screen_calculo_imc = ({ navigation }) => {

    const [altura, setAltura] = useState(0)
    const [peso, setPeso] = useState(0)
    const [categoria, setCategoria] = useState('')

    const calcular = () => {

        const imc = {
            altura,
            peso,
            categoria
        }

        if (altura === 0 || peso === 0 || categoria === '') {

            Toast.show({
                type: 'error',
                text1: 'Atenção',
                text2: 'Preencha os dados abaixo'
            });

            return
        }

        navigation.navigate('imc_resultado', { imc: imc })
    }

    const [opacityH, setOpacityH] = useState(1)
    const [opacityM, setOpacityM] = useState(1)
    const seleciona = (tipo) => {

        tipo === 'homem' && setCategoria('homem')
        tipo === 'mulher' && setCategoria('mulher')

        tipo === 'homem' ? setOpacityH(.3) : setOpacityH(1)
        tipo === 'mulher' ? setOpacityM(.3) : setOpacityM(1)

    }

    //get token   
    let token = ''
    const getUser = async () => {
        Axios.get("http://192.168.0.194:3000/get_user_token")
            .then(response => {
                token = [...response.data].pop()
                navigation.navigate('home', { user_login: token })
            })
    }

    return (
        <SafeAreaView style={styles.container}>

            <Image style={styles.img_fundo} source={require('../../image/img_4.jpg')} />
            <View style={styles.container_shadow}>

                {/* Toast message */}
                <Toast />

                <View style={styles.header} >
                    <TouchableOpacity onPress={() => getUser()} style={styles.header_left} >
                        <IcomHome name="home" style={styles.home} />
                        <Text style={styles.text_done} >HOME</Text>
                    </TouchableOpacity>
                    <Anima.Image animation='zoomInDown' duration={2000} source={require('../../image/logo_1.png')} style={styles.logo} />
                </View>
                <View style={styles.container_imc}>
                    <View style={styles.imc_container_historico}>
                        <Anima.Text animation='fadeInRight' duration={2000} style={styles.imc_title} >CALCULADORA IMC</Anima.Text>
                        <TouchableOpacity onPress={() => navigation.navigate('imc_historico')} style={styles.container_historico}>
                            <IconHistoric style={styles.icon} name="areachart" />
                            <Text style={styles.text_historico}>histórico IMC</Text>
                        </TouchableOpacity>
                    </View>
                    <Anima.View animation='fadeInLeft' duration={2000} style={styles.imc} >
                        <TouchableOpacity onPress={() => seleciona('homem')} style={[styles.imc_h_m, { opacity: opacityH }]} >
                            <Image source={require('../../image/icons/feminino.png')} />
                            <Text style={styles.imc_title_h_m} >HOMEM</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => seleciona('mulher')} style={[styles.imc_h_m, { opacity: opacityM }]} >
                            <Image source={require('../../image/icons/masculino.png')} />
                            <Text style={styles.imc_title_h_m} >MULHER</Text>
                        </TouchableOpacity>
                    </Anima.View>
                    <Anima.View animation='fadeInRight' duration={2000} style={styles.imc_altura} >
                        <Text style={styles.imc_title_altura} >ALTURA</Text>
                        <View style={styles.imc_valor} >
                            <Anima.Text animation='flipInY' duration={2000} delay={3000} style={styles.imc_text_valor} >{altura.toFixed(0)}</Anima.Text>
                            <Anima.Text animation='flipInX' duration={2000} delay={3500} style={styles.imc_text_cm} >cm</Anima.Text>
                        </View>

                        <Slider
                            style={{ width: 250, height: 40 }}
                            onValueChange={t => setAltura(t)}
                            minimumValue={0}
                            maximumValue={200}
                            minimumTrackTintColor="#FFFFFF"
                            maximumTrackTintColor="#edf2f4"
                        />
                    </Anima.View>
                    <View style={styles.imc_1} >
                        <Anima.View animation='flipInY' duration={2000} style={styles.imc_p_i} >
                            <Text style={styles.imc_title_p_i} >PESO</Text>
                            <Text style={styles.imc_title_valor} >{peso}</Text>
                            <View style={styles.imc_peso_idade} >
                                <TouchableOpacity onPress={() => setPeso(peso + 1)} >
                                    <Anima.Image animation='zoomIn' delay={1000} source={require('../../image/icons/btn_plus.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => peso <= 0 ? setPeso(0) : setPeso(peso - 1)} >
                                    <Anima.Image animation='zoomIn' delay={1500} source={require('../../image/icons/btn_minimus.png')} />
                                </TouchableOpacity>
                            </View>
                        </Anima.View>
                    </View>
                    <TouchableOpacity onPress={() => calcular()} style={styles.btn_calcular} >
                        <Anima.Text animation='zoomIn' delay={2000} style={styles.text_calcular} >CALCULAR</Anima.Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Screen_calculo_imc;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    img_fundo: {
        width: '100%',
        height: '100%',
    },
    container_shadow: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0, .6)',
        padding: 15
    },
    container_imc: {
        top: 25
    },
    header: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    header_left: {
        flexDirection: 'row',
        alignItems: 'center',
        top: -20
    },
    logo: {
        width: 100,
        height: 100
    },
    text_done: {
        color: '#0081a7',
        marginLeft: 5,
        fontWeight: '500',
        fontSize: 14
    },
    home: {
        fontSize: 25,
        color: '#0081a7'
    },
    imc_title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        fontStyle: 'italic'
    },
    imc: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        borderTopWidth: 1,
        paddingTop: 20,
        borderColor: 'rgba(255,255,255, .3)'
    },
    imc_h_m: {
        padding: 62,
        paddingTop: 30,
        paddingBottom: 20,
        backgroundColor: '#222134',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    },
    imc_title_h_m: {
        color: '#ccc5b9',
        marginTop: 20,
        fontSize: 16,
        fontWeight: '800'
    },
    imc_altura: {
        padding: 62,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#222134',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginTop: 10
    },
    imc_title_altura: {
        color: '#ccc5b9',
        marginTop: 20,
        fontSize: 12,
        fontWeight: '400'
    },
    imc_valor: {
        flexDirection: 'row',
    },
    imc_text_valor: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold'
    },
    imc_text_cm: {
        color: '#fff',
        top: 28,
        left: 5
    },
    imc_1: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 0,
        paddingTop: 10,
    },
    imc_peso_idade: {
        width: '48%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    imc_title_valor: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold'
    },
    imc_title_p_i: {
        color: '#ccc5b9',
        fontSize: 16,
        fontWeight: '800'
    },
    imc_p_i: {
        width: 185,
        padding: 2,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#222134',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    },
    btn_calcular: {
        backgroundColor: '#811AE8',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        padding: 10
    },
    text_calcular: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '700',
        fontStyle: 'italic'
    },
    imc_container_historico: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container_historico: {
        alignItems: 'center'
    },
    icon: {
        color: '#cad2c5',
        fontSize: 29
    },
    text_historico: {
        color: '#cad2c5',
        fontWeight: '700',
        fontSize: 14
    },
})