import React from 'react'
import { PutCiudadano } from '../interfaces/putCiudadano.interface'
import alertaApi from '../api/apiAlerta';
import { Alert } from 'react-native';

const usePeticionesPut = () => {

    const actualizarCiudadano = async(data:PutCiudadano)=>{
        try {
            const resp = await alertaApi.post('/detalleciudadano', data);
            console.log(resp);
            Alert.alert('Mensaje', 'Se actulizo con exito los datos del ciudadano')
        } catch (error) {
            
        }
    }
  return {
    actualizarCiudadano
  }
}

export default usePeticionesPut