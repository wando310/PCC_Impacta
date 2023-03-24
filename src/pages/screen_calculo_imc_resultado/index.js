import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native'

import IconHistoric from 'react-native-vector-icons/AntDesign'

import AsyncStorage from '@react-native-async-storage/async-storage'

const Screen_calculo_imc_resultado = ({ route, navigation }) => {

    const [message, setmessage] = useState('')
    const [messageDescricao, setMessageDescricao] = useState('')

    const [res, setRes] = useState('')
    const [cor, setCor] = useState('')
    const calculoImc = () => {
        const dadosImc = route.params.imc

        const altura = dadosImc.altura / 100
        const peso = dadosImc.peso
        const categoria = dadosImc.categoria
        const imc = peso / (altura * altura)

        setRes(imc.toFixed(2))

        if (categoria === 'homem') {
            //CATEGORIA MASCULINA
            //Resultados
            imc < 20.7 && setmessage('Abaixo do peso')
            imc > 20.7 && imc < 26.4 && setmessage('Peso ideal')
            imc > 26.5 && imc < 27.8 && setmessage('Pouco acima do peso')
            imc > 27.9 && imc < 31.1 && setmessage('Acima do peso')
            imc > 31.2 && setmessage('Obesidade')
            //Dicas
            imc < 20.7 && setMessageDescricao('Alimente-se mais, seu peso esta abaixo do ideal')
            imc > 20.7 && imc < 26.4 && setMessageDescricao('Parabéns seu peso esta no padrão ideal')
            imc > 26.5 && imc < 27.8 && setMessageDescricao('Cuidado com sua alimentação seu peso esta um pouco acima do ideal')
            imc > 27.9 && imc < 31.1 && setMessageDescricao('Regule sua alimentao você esta acima do peso necessário')
            imc > 31.2 && setMessageDescricao('Procure ajuda, você esta na categoria de obesidade')
        }
        if (categoria === 'mulher') {
            //CATEGORIA FEMININA
            //Resultados
            imc < 19.1 && setmessage('Abaixo do peso')
            imc > 19.1 && imc < 25.8 && setmessage('Peso ideal')
            imc > 25.9 && imc < 27.3 && setmessage('Pouco acima do peso')
            imc > 27.4 && imc < 32.3 && setmessage('Acima do peso')
            imc > 32.4 && setmessage('Obesidade')
            //Dicas
            imc < 19.1 && setMessageDescricao('Alimente-se mais, seu peso esta abaixo do ideal')
            imc > 19.1 && imc < 25.8 && setMessageDescricao('Parabéns seu peso esta no padrão ideal')
            imc > 25.9 && imc < 27.3 && setMessageDescricao('Cuidado com sua alimentação seu peso esta um pouco acima do ideal')
            imc > 27.4 && imc < 32.3 && setMessageDescricao('Regule sua alimentao você esta acima do peso necessário')
            imc > 32.4 && setMessageDescricao('Procure ajuda, você esta na categoria de obesidade')
        }

        //setando cor do icon
        imc < 20.7 && setCor('#ff7f51')
        imc > 20.7 && imc < 26.4 && setCor('#38b000')
        imc > 26.5 && imc < 27.8 && setCor('#723c70')
        imc > 27.9 && imc < 31.1 && setCor('#a01a58')
        imc > 31.2 && setCor('#d90429')

        imc < 19.1 && setCor('#ff7f51')
        imc > 19.1 && imc < 25.8 && setCor('#38b000')
        imc > 25.9 && imc < 27.3 && setCor('#723c70')
        imc > 27.4 && imc < 32.3 && setCor('#a01a58')
        imc > 32.4 && setCor('#d90429')

        salvandoDados(res, cor)
    }

    useEffect(() => { calculoImc() }, [message])

    //salvando no AsyncStorage
    const salvandoDados = async (res, cor) => {

        const data = new Date()
        const dataString = data.toISOString().substring(0, 10)

        const id = Math.floor(Math.random() * 3000)

        const dadosHistorico = {
            id,
            dataString,
            res,
            message,
            cor
        }

        const response = await AsyncStorage.getItem('@imc')
        const previw = response ? JSON.parse(response) : []
        const newPreviw = [...previw, dadosHistorico]

        await AsyncStorage.setItem('@imc', JSON.stringify(newPreviw))
        //await AsyncStorage.removeItem('@imc')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.img_fundo} source={require('../../image/img_4.jpg')} />
            <View style={styles.container_shadow}>
                <View style={styles.header} >
                    <TouchableOpacity onPress={() => navigation.navigate('imc')} style={styles.header_left} >
                        <Image source={require('../../image/icons/arrow.png')} style={styles.arrow} />
                        <Text style={styles.text_done} >Voltar</Text>
                    </TouchableOpacity>
                    <Image source={require('../../image/logo_1.png')} style={styles.logo} />
                </View>
                <View style={styles.container_imc}>
                    <Text style={styles.imc_title} >CALCULADORA IMC</Text>
                    <View style={styles.imc_container_historico}>
                        <Text style={styles.imc_title_resultado} >RESULTADO</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('imc_historico')} style={styles.container_historico}>
                            <IconHistoric style={styles.icon} name="addfile" />
                            <Text style={styles.text_historico}>histórico IMC</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.imc_peso} >
                        <Text style={styles.imc_title_altura} >{message}</Text>
                        <Text style={styles.imc_text_valor} >{res}</Text>
                        <Text style={styles.imc_text_cm} >{messageDescricao}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('imc')} style={styles.btn_calcular} >
                        <Text style={styles.text_calcular} >NOVO CÁLCULO</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Screen_calculo_imc_resultado;

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
        color: '#fff',
        marginLeft: 10,
        fontWeight: '700',
        fontSize: 15
    },
    arrow: {
        width: 26,
        height: 15
    },
    imc_title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
        fontStyle: 'italic',
        borderBottomWidth: 1,
        borderColor: 'rgba(255,255,255, .3)',
        textAlign: 'center',
        paddingBottom: 15
    },
    imc_title_resultado: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '900',
        fontStyle: 'italic',
        marginTop: 30
    },
    imc: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingTop: 20,

    },
    imc_title_h_m: {
        color: '#ccc5b9',
        marginTop: 20,
        fontSize: 16,
        fontWeight: '800'
    },
    imc_peso: {
        height: '60%',
        backgroundColor: '#222134',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderRadius: 6,
        marginTop: 10,
        padding: 20
    },
    imc_title_altura: {
        color: '#06d6a0',
        fontSize: 15,
        fontWeight: '500'
    },
    imc_text_valor: {
        color: '#fff',
        fontSize: 60,
        fontWeight: 'bold'
    },
    imc_text_cm: {
        color: '#fff',
        textAlign: 'center'
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
        color: '#fff',
        fontSize: 25
    },
    text_historico: {
        color: '#fff',
        fontWeight: '700'
    }
})