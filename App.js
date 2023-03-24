import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Screen_Welcome from './src/pages/screen_welcome';
import Screen_home from './src/pages/screen_home';
import Screen_treino from './src/pages/screen_treino';
import Screen_calculo_imc from './src/pages/screen_calculo_imc';
import Screen_calculo_imc_resultado from './src/pages/screen_calculo_imc_resultado';
import Screen_calculo_imc_historico from './src/pages/screen_calculo_imc_historico'
import Screen_exercicio from './src/pages/screen_exercicios';

import Screen_treino_exercicio_perna from './src/pages/screen_treino_exercicio_perna';
import Screen_treino_exercicio_gluteus from './src/pages/screen_treino_exercicio_gluteus';
import Screen_treino_exercicio_ombro from './src/pages/screen_treino_exercicio_ombro';
import Screen_treino_exercicio_braco from './src/pages/screen_treino_exercicio_braco';
import Screen_treino_exercicio_abdominal from './src/pages/screen_treino_exercicio_abdominal';
import Screen_exercicio_menu from './src/pages/screen_exercicios_menu';
import Screen_login from './src/pages/screen_login';
import Screen_register from './src/pages/screen_register';
import Screen_update from './src/pages/screen_update';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        style="light"
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName='welcome'
      >
        <Stack.Screen name='welcome' component={Screen_Welcome} />
        <Stack.Screen name='home' component={Screen_home} />
        <Stack.Screen name='treino' component={Screen_treino} />
        <Stack.Screen name='imc' component={Screen_calculo_imc} />
        <Stack.Screen name='imc_resultado' component={Screen_calculo_imc_resultado} />
        <Stack.Screen name='imc_historico' component={Screen_calculo_imc_historico} />
        <Stack.Screen name='exercicios' component={Screen_exercicio} />
        <Stack.Screen name='treino_exercicio_perna' component={Screen_treino_exercicio_perna} />
        <Stack.Screen name='treino_exercicio_gluteus' component={Screen_treino_exercicio_gluteus} />
        <Stack.Screen name='treino_exercicio_ombro' component={Screen_treino_exercicio_ombro} />
        <Stack.Screen name='treino_exercicio_braco' component={Screen_treino_exercicio_braco} />
        <Stack.Screen name='treino_exercicio_abdominal' component={Screen_treino_exercicio_abdominal} />
        <Stack.Screen name='exercicio_menu' component={Screen_exercicio_menu} />
        <Stack.Screen name='login' component={Screen_login} />
        <Stack.Screen name='register' component={Screen_register} />
        <Stack.Screen name='update' component={Screen_update} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}