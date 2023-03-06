
import {createStackNavigator } from '@react-navigation/stack';
import React,{ useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { LoadingScreen } from '../screen/LoadingScreen';
import LoginScreen from '../screen/LoginScreen';
import PermissionScreen from '../screen/PermissionScreen';
import RegisterScreen from '../screen/RegisterScreen';
import ResetPasswordScreen from '../screen/ResetPasswordScreen';
import ValidarDniScreen from '../screen/ValidarDniScreen';
import DrawerNavigator from './DrawerNavigator';

export type RootStackParams = {
  Login: undefined,
  ValidarSunat: undefined,
  Register: {
    nombre: string,
    apellido: string,
    dni: string
  },
  ResetPassword: undefined,
  Drawer:undefined,
  Permisos:undefined,
  PruebaFotos:undefined,
}


const Stack = createStackNavigator<RootStackParams>();

const StackNavigator = () => {

  const {status, permissions}= useContext(AuthContext);

  if (status=== 'checking') return <LoadingScreen/>

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown:false,
        cardStyle:{
          //backgroundColor:'#fff'
        }
      }}
    >
      {
        (status!=='authenticated')
         ?(
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ValidarSunat" component={ValidarDniScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      
          </>
         ):(
          <>
            
            {
              (permissions.locationStatus === 'granted')
              ?(
                <>
                <Stack.Screen name="Drawer" component={DrawerNavigator} />
                {/* <Stack.Screen name="PruebaFotos" component={PruebaFotosScreen}/> */}
              </>
              ):
              <Stack.Screen name="Permisos" component={PermissionScreen}/>
            
            }
          </>
         )
      }
    </Stack.Navigator>
  );
}


export default StackNavigator;