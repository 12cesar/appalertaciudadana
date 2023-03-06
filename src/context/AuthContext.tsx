import React, { createContext, useEffect, useReducer, useState } from 'react';
import alertaApi from '../api/apiAlerta';
import { Ciudadano, LoginData, ResultLogin, RegisterCiudadano } from '../interfaces/login.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authReducer, AuthState } from './AuthReducer';
import { Keyboard, Platform, AppState } from 'react-native';
import { PermissionStatus, request, PERMISSIONS, check, openSettings } from 'react-native-permissions';

export interface PermissionState{
    locationStatus:PermissionStatus
}

export const permissionInitState: PermissionState={
    locationStatus:'unavailable'
}

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Ciudadano | null;
    status: 'checking' | 'authenticated' | 'not-authenticated';
    permissions:PermissionState;
    signIn: (loginData: LoginData) => void;
    signUp: (registerData: RegisterCiudadano) => void;
    removeError: () => void;
    logOut: () => void;
    askLocationPermissions: () => void;
    checkPermissions: () => void;
}

const AuthInicialState: AuthState = {
    status: 'checking',
    token: null,
    user: null,
    errorMessage: '',

}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

    const [permissions, setPermission] = useState(permissionInitState)

    const [state, dispatch] = useReducer(authReducer, AuthInicialState);
    useEffect(() => {
        checkToken();
    }, []);
    useEffect(() => {
        checkPermissions();
    }, []);
    useEffect(() => {
        AppState.addEventListener('change',state=>{
            if(state !== 'active') return;
            checkPermissions();
        })
    }, []);

    const checkToken = async () => {
        //console.log(state.validationMap);

        const token = await AsyncStorage.getItem('token');
        if (!token) return dispatch({ type: 'notAuthenticated' })
        // Hay token
        if (token) {
            try {
                const resp = await alertaApi.get('/auth');
                if (resp.status !== 200) {
                    return dispatch({ type: 'notAuthenticated' });
                }
                return dispatch({
                    type: 'signIn',
                    payload: {
                        user: resp.data.ciudadano,
                        token: resp.data.token
                    }
                });
            } catch (error) {
                console.log(error);
                return dispatch({ type: 'notAuthenticated' });
            }

        }

    }

    const signIn = async ({ dni, password }: LoginData) => {
        try {
            const resp = await alertaApi.post('/auth/ciudadano', { dni, password })
            console.log(resp.data);

            if (resp.data.ok) {
                dispatch({
                    type: 'signIn',
                    payload: {
                        user: resp.data.ciudadano,
                        token: resp.data.token,
                    }
                })
                await AsyncStorage.setItem('token', resp.data.token);
                await AsyncStorage.setItem('ciudadano', resp.data.ciudadano.nombre);
                console.log(resp.data.ciudadano.apellido);
                
            }
            if (resp.data.ok === false) {
                dispatch({
                    type: 'addError',
                    payload: resp.data.msg || 'Informacion Incorrecta'
                })
            }

        } catch (error: any) {
            console.log(error);

            dispatch({
                type: 'addError',
                payload: 'Informacion Incorrecta'
            })

        }
    }
    const signUp = async( { nombre, apellido, dni, password  }:RegisterCiudadano ) => {
        try {
            const { data } = await alertaApi.post<ResultLogin>('/ciudadano', { nombre, apellido, dni, password } );
            await AsyncStorage.setItem('token', data.token );
            dispatch({ 
                type: 'signUp',
                payload: {
                    token: data.token,
                    user: data.ciudadano
                }
            });
        } catch (error:any) {            
            dispatch({ 
                type: 'addError', 
                payload: error.response.data.msg || 'Revise la información'
            });
        }

    };
    const removeError = () => {
        dispatch({
            type: 'removeError'
        })
    }
    const logOut = async () => {
        const tok = await AsyncStorage.getItem('token')
        if (tok) {
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('ciudadano');
            dispatch({ type: 'logout' });
            Keyboard.dismiss();
        }
    }
    const askLocationPermissions= async() => {
        let permissionStatus: PermissionStatus;
        if (Platform.OS==='ios') {
            //permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }else{
            //permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        if (permissionStatus === 'blocked') {
            openSettings();
        }
        setPermission({
            ...permissions,
            locationStatus:permissionStatus
        });
    };
    const checkPermissions= async() => {
        let permissionStatus: PermissionStatus;

        if (Platform.OS==='ios') {
            //permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
            permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        }else{
            //permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        }
        setPermission({
            ...permissions,
            locationStatus:permissionStatus
        });
    };
    return (
        <AuthContext.Provider value={{
            ...state,
            permissions,
            signUp,
            signIn,
            removeError,
            logOut,
            askLocationPermissions,
            checkPermissions

        }}
        >
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContext