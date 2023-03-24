import React, { useState } from "react";
import { View, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import arrayTreining from "./arrayTreiningOmbro";

import * as Anima from 'react-native-animatable';

const Screen_treino_exercicio_ombro = ({ navigation }) => {

    function exercicio(e) { navigation.navigate('exercicios', { dados: arrayTreining[e], back:'treino_exercicio_ombro' }) }
   
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.img_fundo} source={require('../../image/img_4.jpg')} />
            <View style={styles.container_shadow}>
                <View style={styles.header} >
                    <TouchableOpacity  onPress={ () => navigation.navigate('treino') } style={styles.header_left} >
                        <Image source={require('../../image/icons/arrow.png')} style={styles.arrow} />
                        <Text style={styles.text_done} >Voltar</Text>
                    </TouchableOpacity>
                    <Image source={require('../../image/logo_1.png')} style={styles.logo} />
                </View>

                <View style={styles.container_exercicios} >
                    <Anima.Text animation='bounceIn' duration={4000} style={styles.title}>Exercícios para Ombro</Anima.Text>
                    <TouchableOpacity onPress={() => exercicio(0)}>
                        <Anima.Text animation='bounceInLeft' style={styles.exercicio}>1 - { arrayTreining[0].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(1)}>
                        <Anima.Text animation='bounceInLeft'delay={100} style={styles.exercicio}>2 - { arrayTreining[1].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(2)}>
                        <Anima.Text animation='bounceInLeft'delay={200} style={styles.exercicio}>3 - { arrayTreining[2].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(3)}>
                        <Anima.Text animation='bounceInLeft'delay={300} style={styles.exercicio}>4 - { arrayTreining[3].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(4)}>
                        <Anima.Text animation='bounceInLeft'delay={400} style={styles.exercicio}>5 - { arrayTreining[4].title }</Anima.Text>
                    </TouchableOpacity>                                     
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Screen_treino_exercicio_ombro;

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
        backgroundColor: 'rgba(0,0,135, .4)',
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
    container_exercicios: {
        marginTop: 20,
    },
    title:{
        width:'100%',
        color:'#fff',
        fontWeight:'bold',
        fontStyle:'italic',
        fontSize:30,
        borderBottomWidth:1,
        borderColor:'rgba(255,255,255, .4)',
        paddingBottom:15,
        marginBottom:5,
        textAlign:'center'
    },
    exercicio:{
        width:'100%',
        textAlign:'left',
        color:'#F2B713',
        fontSize:15,
        borderBottomWidth:1,
        paddingBottom:5,
        paddingTop:5,
        borderColor:'rgba(0,255,255, .4)'
    }
})