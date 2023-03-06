import React from 'react'
import { NavigationContainer, DefaultTheme,Theme} from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import StackNavigator from './src/navigation/StackNavigator';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

const customTheme:Theme={
  dark:true,
  colors:{
    ...DefaultTheme.colors,
    background:'#fff',
    text:'black'
  }
}


const AppState = ({ children }:any) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
const App = () => {
  return (
    <NavigationContainer
      theme={customTheme}
    >
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>
  )
}

export default App