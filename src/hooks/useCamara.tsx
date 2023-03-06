import { useState } from 'react';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import alertaApi from '../api/apiAlerta';
import { Alert } from 'react-native';


const useCamaraCiudadano = () => {
    
    const [defaultImage, setDefaultImage] = useState('');
    const [tempImage, setTempImage] = useState<string>();
    const [imagen, setImage] = useState<ImagePickerResponse>();
    const tomarFoto = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5
        }, async(resp) => {
            if (resp.didCancel) return;
            if (!resp.assets![0].uri) return;
            setImage(resp);
            setDefaultImage(resp.assets![0].uri);
            setTempImage(resp.assets![0].uri);
                const fileToUpload= {
                    uri:resp.assets![0].uri,
                    type:resp.assets![0].type,
                    name:resp.assets![0].fileName
                };
                console.log(fileToUpload);
                const formdata = new FormData();
                formdata.append('archivo',fileToUpload);
                try {
                    const resp = await alertaApi.put('/uploadgeneral/ciudadano',formdata);
                    Alert.alert('Mensaje', 'Se actualizo la imagen con exito');  
                } catch (error) {
                }
        });
    }
    return {
        tomarFoto,
        defaultImage,
        imagen,
        tempImage
    }

}


export default useCamaraCiudadano;