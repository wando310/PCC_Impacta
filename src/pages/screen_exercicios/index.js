import React, { useState, useEffect } from "react";

import { View, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'

import IconArrow from 'react-native-vector-icons/AntDesign'

import * as Anima from 'react-native-animatable';

const Screen_exercicio = ({ route, navigation }) => {

    const getPrarametro = () => { return route.params.dados }
    const getBack = () => { return route.params.back }

    useEffect(() => { getPrarametro() }, [])
    useEffect(() => { getBack() }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.img_fundo} source={require('../../image/img_4.jpg')} />
            <View style={styles.container_shadow}>
                <Image source={getPrarametro().icon} style={styles.gif} />
                <View style={styles.header} >
                    <TouchableOpacity onPress={() => navigation.navigate(getBack())} style={styles.header_left} >
                        <IconArrow name="arrowleft" style={styles.arrow} />
                        <Text style={styles.text_done} >Voltar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container_obs}>
                    <Anima.Text animation='flipInY' duration={2000} delay={1500} style={styles.title}>{getPrarametro().title}</Anima.Text>
                    <View style={styles.container_obs_1}>
                        <View style={styles.container_treinamento_frequencia}>
                            <View style={styles.container_exercicios} >
                                <Text style={styles.title_repeticao}>NÍVEL DE TREINAMENTO</Text>
                                <Text style={styles.title_descricao}>Iniciante: até 1 ano</Text>
                                <Text style={styles.title_descricao}>Intermediário: 1 a 3 anos</Text>
                                <Text style={styles.title_descricao}>Avançado: 3 a 5 anos</Text>
                            </View>
                            <View style={styles.container_exercicios} >
                                <Text style={styles.title_repeticao}>FREQUÊNCIA DE TREINAMENTO</Text>
                                <Text style={styles.title_descricao}>Iniciante: 3 a 4 vezes semanais</Text>
                                <Text style={styles.title_descricao}>Intermediário: 4 a 5 vezes semanais</Text>
                                <Text style={styles.title_descricao}>Avançado: 5 a 6 vezes semanais</Text>
                            </View>
                        </View>
                        <View style={styles.container_treinamento_frequencia}>
                            <View style={styles.container_exercicios} >
                                <Text style={styles.title_repeticao}>DIVISÃO DE TREINAMENTO</Text>
                                <Text style={styles.title_descricao}>Iniciante A ou AB'</Text>
                                <Text style={styles.title_descricao}>Intermediario AB ou ABC'</Text>
                                <Text style={styles.title_descricao}>Avançado ABC, ABCD ou ABCDE</Text>
                            </View>
                            <View style={styles.container_exercicios} >
                                <Text style={styles.title_repeticao}>NÚMERO DE EXERCÍCIOS</Text>
                                <Text style={styles.title_descricao}>Iniciante A (8-10) ou AB (8-10)</Text>
                                <Text style={styles.title_descricao}>Intermediário AB (10-15) ou ABC (8-12)</Text>
                                <Text style={styles.title_descricao}>Avançado ABC (8-15) ou ABCD (8-12) ou ABCDE (6-10)</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.container_dica} >
                    <Text style={styles.title_dica}>DICAS</Text>
                    <ScrollView style={styles.dica_scroll}>
                        <Anima.Text animation='fadeInDown' delay={1000} style={styles.title_des_dica}>{getPrarametro().dica}</Anima.Text>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Screen_exercicio;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    header: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: -250,
        left: 15
    },
    header_left: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100
    },
    text_done: {
        color: '#000',
        marginLeft: 10,
        fontWeight: '700',
        fontSize: 15
    },
    arrow: {
        fontSize: 22
    },
    container_exercicios: {
        width: '100%',
        margin: 5
    },
    container_dica: {
        top: -70,
        padding: 20,
    },
    title: {
        width: '100%',
        color: '#1AD967',
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 15,
        textAlign: 'center'
    },
    title_repeticao: {
        color: '#f0ead2',
        fontSize: 11,
        fontWeight: '800',
        borderBottomWidth: 1,
        borderColor: 'rgba(255,255,255, .5)',
        paddingBottom: 8
    },
    title_dica: {
        width: '100%',
        color: '#fff',
        fontSize: 27,
        fontWeight: '900',
        fontStyle: 'italic',
        borderBottomWidth: 1,
        borderColor: 'rgba(255,255,255, .5)',
        paddingBottom: 8
    },
    title_descricao: {
        color: '#ccdad1',
        fontSize: 12,
        fontWeight: '600',
    },
    title_des_dica: {
        color: '#F2B713',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 10
    },
    gif: {
        width: '100%',
        height: 260,
        resizeMode: "stretch"
    },
    container_obs: {
        top: -60,
    },
    container_obs_1: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,255,255, .3)',
        borderRadius: 6,
        marginTop: 15
    },
    container_treinamento_frequencia: {
        width: '48%',
        margin: 5,
        alignItems: 'center'
    },
    shadow_gif: {
        width: 125,
        height: 20,
        backgroundColor: '#fff',
        position: 'absolute',
        top: '35%',
        left: '68%'
    },
    dica_scroll: {
        height: '20%'
    }
})