import React from "react";
import { View, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import arrayTreining from "./arrayTreiningBraco";

import * as Anima from 'react-native-animatable';

const Screen_treino_exercicio_braco = ({ navigation }) => {

    function exercicio(e) { navigation.navigate('exercicios', { dados: arrayTreining[e], back:'treino_exercicio_braco' }) }
   
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.img_fundo} source={require('../../image/img_4.jpg')} />
            <View style={styles.container_shadow}>
                <View style={styles.header} >
                    <TouchableOpacity onPress={ () => navigation.navigate('treino') } style={styles.header_left} >
                        <Image source={require('../../image/icons/arrow.png')} style={styles.arrow} />
                        <Text style={styles.text_done} >Voltar</Text>
                    </TouchableOpacity>
                    <Image source={require('../../image/logo_1.png')} style={styles.logo} />
                </View>

                <ScrollView style={styles.container_exercicios} >
                    <Anima.Text animation='bounceIn' duration={4000} style={styles.title}>Exercícios para Braço</Anima.Text>
                    <TouchableOpacity onPress={() => exercicio(0)}>
                        <Anima.Text  animation='bounceInLeft' style={styles.exercicio}>1 - { arrayTreining[0].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(1)}>
                        <Anima.Text  animation='bounceInLeft'delay={100} style={styles.exercicio}>2 - { arrayTreining[1].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(2)}>
                        <Anima.Text  animation='bounceInLeft'delay={200} style={styles.exercicio}>3 - { arrayTreining[2].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(3)}>
                        <Anima.Text  animation='bounceInLeft'delay={300} style={styles.exercicio}>4 - { arrayTreining[3].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(4)}>
                        <Anima.Text  animation='bounceInLeft'delay={400} style={styles.exercicio}>5 - { arrayTreining[4].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(5)}>
                        <Anima.Text   animation='bounceInLeft'delay={500}style={styles.exercicio}>6 - { arrayTreining[5].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(6)}>
                        <Anima.Text  animation='bounceInLeft'delay={600} style={styles.exercicio}>7 - { arrayTreining[6].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(7)}>
                        <Anima.Text  animation='bounceInLeft'delay={700} style={styles.exercicio}>8 - { arrayTreining[7].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(8)}>
                        <Anima.Text  animation='bounceInLeft'delay={800} style={styles.exercicio}>9 - { arrayTreining[8].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(9)}>
                        <Anima.Text  animation='bounceInLeft'delay={900} style={styles.exercicio}>10 - { arrayTreining[9].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(10)}>
                        <Anima.Text  animation='bounceInLeft'delay={1000} style={styles.exercicio}>11 - { arrayTreining[10].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(11)}>
                        <Anima.Text  animation='bounceInLeft'delay={1100} style={styles.exercicio}>12 - { arrayTreining[11].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(12)}>
                        <Anima.Text  animation='bounceInLeft'delay={1200} style={styles.exercicio}>13 - { arrayTreining[12].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(13)}>
                        <Anima.Text  animation='bounceInLeft'delay={1300} style={styles.exercicio}>14 - { arrayTreining[13].title }</Anima.Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => exercicio(14)}>
                        <Anima.Text  animation='bounceInLeft'delay={1400} style={styles.exercicio}>15 - { arrayTreining[14].title }</Anima.Text>
                    </TouchableOpacity>                   
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default Screen_treino_exercicio_braco;

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