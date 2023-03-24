import React, { useState, useEffect } from "react"
import { View, Image, StyleSheet, Text, SafeAreaView, TouchableOpacity, FlatList, Button } from 'react-native'

import IconHistoric from 'react-native-vector-icons/EvilIcons'
import IconCheck from 'react-native-vector-icons/Feather'
import AsyncStorage from "@react-native-async-storage/async-storage";

import Toast from 'react-native-toast-message'

import { LineChart } from "react-native-chart-kit";

const Screen_calculo_imc_historico = ({ navigation }) => {

    const [arraydata, setArraydate] = useState([])
    const [arraydateTime, setArraydateTime] = useState([])
    const [arrayImc, setArrayImc] = useState([])
    const dataIMC = []
    const resImc = []
    const msg = []

    const getDadosImc = async () => {
        const response = await AsyncStorage.getItem('@imc')
        const dadosImc = response ? JSON.parse(response) : []

        setArrayImc(dadosImc)

        dadosImc.map(item => {
            dataIMC.push(item.dataString)
            resImc.push(item.res)
            msg.push(item.message)
        })

        setArraydate(resImc)
        setArraydateTime(dataIMC)

    }

    useEffect(() => { getDadosImc() }, [])

    //renderizar items
    function renderItems({ item }) {
        return (
            <View style={styles.container_render}>
                <IconCheck style={{ color: item.cor }} name="check-circle" />
                <Text style={styles.imc_text_historico} >{`${item.dataString} - IMC( ${item.res} ) - ${item.message}`}</Text>
            </View>
        )
    }

    //Limpando histórico
    let type = ''
    let textAlert = ''
    let messageHistorico = ''
    const limpaHistorico = async () => {

        await AsyncStorage.getItem('@imc') ? type = 'success' : type = 'info'
        await AsyncStorage.getItem('@imc') ? textAlert = 'Atenção' : textAlert = 'Alerta'
        await AsyncStorage.getItem('@imc') ? messageHistorico = 'Dados removido com sucesso!!!' : messageHistorico = 'Sem dados para ser removido'

        Toast.show({
            type: type,
            text1: textAlert,
            text2: messageHistorico
        })

        await AsyncStorage.removeItem('@imc')

        getDadosImc()
    }

    //Configuração gráfico
    const data = {
        labels: [0, ...arraydateTime],
        datasets: [
            {
                data: [0, ...arraydata],
                color: (opacity = 5) => '#fb8500', // optional
                strokeWidth: 3 // optional
            }
        ],
        legend: ["dados ( IMC )"] // optional
    };

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: 'rgba(0,0,255, .3)',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 7) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: true // optional
    };

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
                <View >
                    <Toast />
                    <Text style={styles.imc_title} >HISTÓRICO IMC</Text>
                    <View style={styles.imc_container_historico}>
                        <Text style={styles.imc_title_resultado} >Seus resultado</Text>
                        <TouchableOpacity onPress={() => limpaHistorico()} style={styles.container_historico}>
                            <IconHistoric style={styles.icon} name="trash" />
                            <Text style={styles.text_historico}>limpar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container_imc}>
                        {/* lista */}
                        <FlatList
                            style={styles.imc_historico}
                            data={arrayImc}
                            renderItem={renderItems}
                            keyExtractor={item => item.id}
                        />
                        {/* Gráfico */}


                        <LineChart
                            data={data}
                            width={375}
                            height={295}
                            verticalLabelRotation={30}
                            chartConfig={chartConfig}
                            bezier
                        />
                    </View>

                </View>
            </View>
        </SafeAreaView>
    )
}

export default Screen_calculo_imc_historico;

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
    container_imc: {
        alignItems: 'center'
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
    imc_historico: {
        width: '100%',
        height: '26%',
        borderRadius: 6,
        marginTop: 10,
        marginBottom: 5,
        padding: 20,
        backgroundColor: 'rgba(0,0,0, .5)'
    },
    imc_text_historico: {
        color: '#fff',
        fontSize: 15,
        left: 10
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
        fontSize: 37
    },
    text_historico: {
        color: '#fff',
        fontWeight: '400'
    },
    container_render: {
        flexDirection: 'row',
        alignItems: 'center',
    },

})