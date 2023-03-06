
import React,{useState} from 'react'
import { Alerta } from '../interfaces/ciudadanoAlerta.interface';
import alertaApi from '../api/apiAlerta';

interface Props{
    token?:string;
}

export const usePeticionesGet = () => {

    const [first, setfirst] = useState<Alerta[]>();
    const getAlertaCiudadano=async()=>{
        try {
            const resp = await alertaApi.get('/alerta/mostrar/ciudadano');
            if (resp.data) {
                setfirst(resp.data.alerta);
            }            
        } catch (error) {
            console.log('error');
        }
    }
    
  return {
    first,
    getAlertaCiudadano
  }
}
