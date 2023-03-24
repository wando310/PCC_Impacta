import React, { useState, useEffect } from "react";

import { View, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity, ScrollView, Button } from 'react-native'
import IconArrow from 'react-native-vector-icons/AntDesign'
import Iconplay from 'react-native-vector-icons/Ionicons'
import Iconsound from 'react-native-vector-icons/Foundation'
import Iconalarm from 'react-native-vector-icons/Ionicons'
import * as Progress from 'react-native-progress'

import * as Anima from 'react-native-animatable'
const Screen_exercicio_menu = ({ route, navigation }) => {

    const getPrarametro = () => { return route.params.dados }
    const getBack = () => { return route.params.back }

    useEffect(() => { getPrarametro() }, [])
    useEffect(() => { getBack() }, [])

    //seleciona minutos
    const [cor10, setCor10] = useState('#3a86ff')
    const [cor20, setCor20] = useState('#3a86ff')
    const [cor30, setCor30] = useState('#3a86ff')
    const [cor40, setCor40] = useState('#3a86ff')
    const [cor60, setCor60] = useState('#3a86ff')
    const [statuscor, setStatuscor] = useState(false)

    //status play
    const [minuto, setMinuto] = useState(0)
    const [segundo, setSegundo] = useState(0)
    const [custominterval, setCustominterval] = useState()
    const [status, setStatus] = useState(false)

    let count = 0
    let count_1 = 0
    const selecionaMinuto = (min) => {
        setStatuscor(true)
        setSegundo(59)
        setMinuto(min - 1)

        switch (min) {
            case 10:
                setCor10('#8338ec')
                setCor20('#3a86ff')
                setCor30('#3a86ff')
                setCor40('#3a86ff')
                setCor60('#3a86ff')
                break;
            case 20:
                setCor10('#3a86ff')
                setCor20('#8338ec')
                setCor30('#3a86ff')
                setCor40('#3a86ff')
                setCor60('#3a86ff')
                break;
            case 30:
                setCor10('#3a86ff')
                setCor20('#3a86ff')
                setCor30('#8338ec')
                setCor40('#3a86ff')
                setCor60('#3a86ff')
                break;
            case 40:
                setCor10('#3a86ff')
                setCor20('#3a86ff')
                setCor30('#3a86ff')
                setCor40('#8338ec')
                setCor60('#3a86ff')
                break;
            case 60:
                setCor10('#3a86ff')
                setCor20('#3a86ff')
                setCor30('#3a86ff')
                setCor40('#3a86ff')
                setCor60('#8338ec')
                break;

            default:
                break;
        }
    }


    const playTime = () => {
        setCustominterval(
            setInterval(() => {
                play()
            }, 1000)
        )
    }

    //play
    count_1 = minuto
    const play = () => {
        if (!statuscor) {
            setSegundo((seg) => {
                if (seg + 1 === 5) {
                    count += 1
                    setMinuto(count)
                    return 0
                }
                return seg + 1
            })
        }
        if (statuscor) {
            setSegundo((seg) => {
                if (seg - 1 === 0) {
                    count_1 -= 1
                    setMinuto(count_1)
                    return 5
                }
                if (count_1 < 0) {
                    stop()
                    return
                }
                return seg - 1
            })
        }
        alarme()
    }

    //parar
    const stop = () => {
        setMinuto(0)
        setSegundo(0)
        setOpacidade(0)
        setCor10('#3a86ff')
        setCor20('#3a86ff')
        setCor30('#3a86ff')
        setCor40('#3a86ff')
        setCor60('#3a86ff')
        setStatuscor(false)
        pausa()
    }

    //pausa
    const pausa = () => {
        custominterval && clearInterval(custominterval)
        setStatus(false)
    }

    const playPausa = () => {
        if (!status) {
            playTime()
            setStatus(true)
        } else {
            pausa()
            setStatus(false)
        }
    }

    //alarme
    const [opacidade, setOpacidade] = useState(0)
    const alarme = () => {
        count_1 === -1 && setOpacidade(1)
    }


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
                    <Text style={styles.title}>{getPrarametro().title}</Text>
                    <View style={styles.container_obs_1}>
                        <View style={styles.container_treinamento_frequencia}>
                            <Text style={styles.cronometro}>Cronômetro</Text>
                            <View style={styles.container_cronometro}>
                                <Anima.View animation='fadeInRight' duration={2000} style={styles.container_play} >
                                    <TouchableOpacity style={styles.toutchable} onPress={() => playPausa()}>
                                        <Iconplay style={styles.play} name={!status ? "ios-play-circle-sharp" : 'pause-circle'} />
                                        <Text style={styles.play_stop}>{!status ? 'Play' : 'Pausa'}</Text>
                                    </TouchableOpacity>
                                </Anima.View>
                                <Anima.View animation='flipInX' duration={2000} delay={500} style={styles.container_h_m_s}>
                                    <View style={styles.container_time}>
                                        <Text style={styles.time_hora}>{minuto < 10 ? `0${minuto}` : minuto}.{segundo < 10 ? `0${segundo}` : segundo}</Text>
                                    </View>
                                    <Progress.Circle progress={0.8} size={150} indeterminate={status} color={'#70e000'} />
                                    <Iconsound style={{
                                        opacity: opacidade,
                                        color: '#6a040f',
                                        position: 'absolute',
                                        fontSize: 45,
                                        top: 10
                                    }} name="sound" />
                                    <Iconalarm style={styles.time_alarm} name="alarm" />
                                </Anima.View>
                                <Anima.View animation='fadeInLeft' duration={2000} style={styles.container_play} >
                                    <TouchableOpacity style={styles.toutchable} onPress={() => stop()}>
                                        <Iconplay style={styles.play} name="stop" />
                                        <Text style={styles.play_stop}>Stop</Text>
                                    </TouchableOpacity>
                                </Anima.View>
                            </View>

                            <View style={styles.container_select}>
                                <Anima.View animation='zoomIn' duration={1000} delay={500}>
                                    <Button onPress={() => selecionaMinuto(10)} color={cor10} title="10min" />
                                </Anima.View>
                                <Anima.View animation='zoomIn' duration={1000} delay={1000}>
                                    <Button onPress={() => selecionaMinuto(20)} color={cor20} title="20min" />
                                </Anima.View>
                                <Anima.View animation='zoomIn' duration={1000} delay={1500}>
                                    <Button onPress={() => selecionaMinuto(30)} color={cor30} title="30min" />
                                </Anima.View>
                                <Anima.View animation='zoomIn' duration={1000} delay={2000}>
                                    <Button onPress={() => selecionaMinuto(40)} color={cor40} title="40min" />
                                </Anima.View>
                                <Anima.View animation='zoomIn' duration={1000} delay={2500}>
                                    <Button onPress={() => selecionaMinuto(60)} color={cor60} title="60min" />
                                </Anima.View>
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

export default Screen_exercicio_menu;

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
        marginTop: 15
    },
    container_treinamento_frequencia: {
        width: '100%',
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
    },
    container_time: {
        position: 'absolute',
        zIndex: 1,
    },
    time_hora: {
        color: '#06d6a0',
        fontSize: 35,
        fontStyle: 'italic',
        fontWeight: '800',
    },
    container_h_m_s: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    cronometro: {
        color: '#9a8c98',
        fontWeight: '800',
        fontSize: 20,
        fontStyle: 'italic',
    },
    container_play: {
        width: 65,
        backgroundColor: 'rgba(0,0,255,.3)',
        borderRadius: 100,
        padding: 3,
        margin: 10,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-around',
        borderColor: 'rgba(0,255,25,.4)',
    },
    play: {
        color: '#fb5607',
        fontSize: 30,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    time_alarm: {
        color: '#457b9d',
        position: 'absolute',
        fontSize: 35,
        top: 100,

    },
    play_stop: {
        color: '#fff',
        fontWeight: '500'
    },
    toutchable: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    container_cronometro: {
        flexDirection: 'row',
        padding: 20
    },
    container_select: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderColor: '#fff',
        borderRadius: 50,
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: 'rgba(100,34,255, .3)'
    },
})