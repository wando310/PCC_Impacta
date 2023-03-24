import React, { useState } from "react";

import { View, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native'

import * as Anima from 'react-native-animatable'
import IcomHome from 'react-native-vector-icons/FontAwesome'
import arrayTreining from "../screen_exercicio_polichinelo/arrayTreining";

import Axios from "axios";

const Screen_treino = ({ navigation }) => {

    const [status, setStatus] = useState(false)
    const modalMenu = () => status ? setStatus(false) : setStatus(true)

    //seleciona exercicio
    const pageTraining = (treino) => {

        switch (treino) {
            case 1:
                navigation.navigate('treino_exercicio_perna')
                break;
            case 2:
                navigation.navigate('treino_exercicio_gluteus')
                break;
            case 3:
                navigation.navigate('treino_exercicio_ombro')
                break;
            case 4:
                navigation.navigate('treino_exercicio_braco')
                break;
            case 5:
                navigation.navigate('treino_exercicio_abdominal')
                break;

            default:
                break;
        }
    }

    //menu
    function exercicioMenu(e) { navigation.navigate('exercicio_menu', { dados: arrayTreining[e], back: 'treino' }) }
    
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
                <View style={styles.header} >
                    <TouchableOpacity onPress={() => getUser()} style={styles.header_left} >
                        <IcomHome name="home" style={styles.home} />
                        <Text style={styles.text_done} >HOME</Text>
                    </TouchableOpacity>
                    <Image source={require('../../image/logo_1.png')} style={styles.logo} />
                </View>
                <TouchableOpacity style={styles.munu} onPress={() => { modalMenu() }} >
                    <Anima.Image animation='lightSpeedIn' duration={3000} daley={4000} source={require('../../image/icons/menu.png')} />
                </TouchableOpacity>
                <View style={styles.container_btns} >
                    <Anima.View animation='lightSpeedIn' duration={1000}>
                        <TouchableOpacity onPress={() => pageTraining(1)} style={styles.btn} >
                            <Image source={require('../../image/icons/btn_perna.png')} />
                            <Text style={styles.text_btn} >Exercicio para Pernas</Text>
                        </TouchableOpacity>
                    </Anima.View>
                    <Anima.View animation='lightSpeedIn' duration={1500}>
                        <TouchableOpacity onPress={() => pageTraining(2)} style={styles.btn} >
                            <Image source={require('../../image/icons/btn_gluteus.png')} />
                            <Text style={styles.text_btn} >Exercicio para Glúteus</Text>
                        </TouchableOpacity>
                    </Anima.View>
                    <Anima.View animation='lightSpeedIn' duration={2000}>
                        <TouchableOpacity onPress={() => pageTraining(3)} style={styles.btn} >
                            <Image source={require('../../image/icons/btn_ombro.png')} />
                            <Text style={styles.text_btn} >Exercicio para Ombros</Text>
                        </TouchableOpacity>
                    </Anima.View>
                    <Anima.View animation='lightSpeedIn' duration={2500}>
                        <TouchableOpacity onPress={() => pageTraining(4)} style={styles.btn} >
                            <Image source={require('../../image/icons/btn_braco.png')} />
                            <Text style={styles.text_btn} >Exercicio para Braços</Text>
                        </TouchableOpacity>
                    </Anima.View>
                    <Anima.View animation='lightSpeedIn' duration={3000}>
                        <TouchableOpacity onPress={() => pageTraining(5)} style={styles.btn} >
                            <Image source={require('../../image/icons/btn_abdominal.png')} />
                            <Text style={styles.text_btn} >Abdominais</Text>
                        </TouchableOpacity>
                    </Anima.View>
                </View>
            </View>
            <View style={status ? styles.menu : styles.menu_1}>
                <View style={styles.container_outros}>
                    <Text style={styles.title_principal}>Outros</Text>
                </View>
                <View style={styles.longamento_casa}>
                    <Text style={styles.title} >Exercícios para casa</Text>
                    <TouchableOpacity onPress={() => (exercicioMenu(0))}>
                        <Text style={styles.descricao} >Polichinelos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (exercicioMenu(1))}>
                        <Text style={styles.descricao} >Burpees</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (exercicioMenu(2))}>
                        <Text style={styles.descricao} >Lunges ou afundo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (exercicioMenu(3))}>
                        <Text style={styles.descricao} >Alpinista</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.longamento_alongamento}>
                    <Text style={styles.title} >Alongamentos</Text>
                    <TouchableOpacity onPress={() => (exercicioMenu(4))}>
                        <Text style={styles.descricao} >Alongamento de lombar e coluna posição do gato e camelo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (exercicioMenu(5))}>
                        <Text style={styles.descricao} >Alongamento da coluna para frente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (exercicioMenu(6))}>
                        <Text style={styles.descricao} >Braços para o alto e corpo alongado</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => (exercicioMenu(7))}>
                        <Text style={styles.descricao} >Super-homem de joelhos</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Screen_treino;

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
        backgroundColor: 'rgba(0,0,0, .3)',
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
        color: '#0081a7',
        marginLeft: 5,
        fontWeight: '500',
        fontSize: 14
    },
    home: {
        fontSize: 25,
        color: '#0081a7'
    },
    container_btns: {
        marginTop: 40,
        alignItems: 'center'
    },
    btn: {
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text_btn: {
        color: '#fff',
        position: 'absolute',
        left: '43%',
        fontWeight: '900',
        fontSize: 14,
        fontStyle: 'italic'
    },
    menu: {
        width: '100%',
        backgroundColor: 'rgba(0,0,35,.8)',
        position: 'absolute',
        bottom: 0, //show modal no menu
        paddingLeft: 15,
        paddingRight: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    menu_1: {
        width: '100%',
        backgroundColor: 'rgba(0,0,35,.8)',
        position: 'absolute',
        bottom: -660, //hidden modal no menu
        paddingLeft: 15,
        paddingRight: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    container_outros: {
        alignItems: 'center',
        padding: 20
    },
    title_principal: {
        fontSize: 25,
        fontWeight: '900',
        color: '#fff',
        fontStyle: 'italic'
    },
    longamento_casa: {
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: '#cecece',
        paddingTop: 15,
        paddingBottom: 15,
    },
    longamento_alongamento: {
        paddingTop: 15,
        paddingBottom: 15,
    },
    title: {
        color: '#F2B713',
        fontSize: 20,
        fontStyle: 'italic',
        fontWeight: '800'
    },
    descricao: {
        color: '#fff',
        fontSize: 17,
        fontStyle: 'italic',
        fontWeight: '500',
        margin: 5
    },
    munu: {
        width: 35,
    }
})