import React, { useEffect, useState } from 'react'
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/position.interface';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { CentroAtencion } from '../interfaces/centros.interface';
import alertaApi from '../api/apiAlerta';
const useLocation = () => {

    const [hasLocation, sethasLocation] = useState(false);
    const [initialPosition, setinitialPosition] = useState<Location>(
        {
            latitude: 0,
            longitude: 0
        }
    );
    const [centros, setCentros] = useState<CentroAtencion[]>();
    useEffect(() => {
        try {
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                interval: 10000,
                fastInterval: 5000,
            }).then((data) => {
                console.log(data);
                if (data === "enabled") {
                    getCurrentLocation()
                        .then(location => {
                            setinitialPosition(location);
                            sethasLocation(true)
                        });
                    console.log('estoy enabled');
    
                }
                if (data === 'already-enabled') {
                    getCurrentLocation()
                        .then(location => {
                            setinitialPosition(location);
                            sethasLocation(true)
                        });
                    console.log('estoy enabled');
    
                } else {
                    console.log(data);
                }
            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            
        }
    }, []);
    useEffect(() => {
        
    }, [])
    

    useEffect(() => {
        getCurrentLocation()
            .then(location => {
                console.log(location);
                setinitialPosition(location);
                sethasLocation(true)
            });
    }, []);

    const getCurrentLocation = (): Promise<Location> => {
        //Geolocation.getCurrentPosition(info => console.log(info));
        return new Promise((resolve, reject) => {
                     
            
            Geolocation.getCurrentPosition(
                (resp) => {
                    console.log('como estas');
                    
                    console.log(resp.coords);
                
                    resolve({
                        latitude: resp.coords.latitude,
                        longitude: resp.coords.longitude
                    });
                },
                (err) => reject({ err }),
                

            );
        })
    }
    useEffect(() => {
      mostrarCentros()
    
    }, [])
    
    const mostrarCentros =async()=>{
        const resp = await alertaApi.get('/centroatencion?estado=1');
        setCentros(resp.data.centroAtencion);
        console.log(resp.data.centroAtencion);
        
        console.log(centros);
        
    }

    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        centros
    }

}

export default useLocation