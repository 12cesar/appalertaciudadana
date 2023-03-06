import React, {useState} from 'react'
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { baseURL } from '../api/apiAlerta';
import alertaApi from '../api/apiAlerta';
import { CrearAlert } from '../interfaces/crearAlerta.interface';
import useLocation from './useLocation';
import { Alert } from 'react-native';
import socket from '../socket/socketApi';
import AsyncStorage from '@react-native-async-storage/async-storage';



const useModalCompent = () => {
    const [defaultImage, setDefaultImage] = useState(`${baseURL}/tipoalerta/mostrar/imagen/ver/0`);
    const {getCurrentLocation} = useLocation();
    const [tempImage, setTempImage] = useState<string>();
    const [imagen, setImage] = useState<ImagePickerResponse>();
    const tomarFoto = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 0.5
        }, (resp) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;
            setImage(resp);
            setTempImage(resp.assets![0].uri);
            console.log(resp);

        });
    }
    const galeriaFoto = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5
        }, (resp) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;
            setTempImage(resp.assets![0].uri);
            console.log(resp);

        });
    }
    const agregarAlerta = async(image:ImagePickerResponse | undefined, data:CrearAlert)=>{
        
        const formData = new FormData();
        const {latitude,longitude} = await getCurrentLocation();
        //let fileToUpload;
        let datos = {
            archivo:{}
        };
        if (image) {
            const fileToUpload= {
                uri:image.assets![0].uri,
                type:image.assets![0].type,
                name:image.assets![0].fileName
            };
            console.log(fileToUpload);
            
            formData.append('descripcion',data.descripcion);
            formData.append('lat', latitude);
            formData.append('lng', longitude);
            formData.append('tipo_alerta', data.tipoAlert);
            formData.append('archivo', fileToUpload);
            datos.archivo = fileToUpload
        }
        else {
            formData.append('descripcion',data.descripcion);
            formData.append('lat', latitude);
            formData.append('lng', longitude);
            formData.append('tipo_alerta', data.tipoAlert);
            
           
        }
        try {
            const alerta = await alertaApi.post('/alerta', formData);
            const token = await AsyncStorage.getItem('token');
            socket.emit('actualizar-alerta-ciudadano',token);
            Alert.alert('Mensaje', 'Se envio alerta ciudadana con exito');
            return true;     
            
        } catch (error) {
            
            console.log({error})
        }
        
    }
    return {
        tempImage,
        tomarFoto,
        galeriaFoto,
        defaultImage,
        agregarAlerta,
        imagen
    }
}

export default useModalCompent;