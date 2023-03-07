import React, { useRef, useState } from 'react'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import useLocation from '../hooks/useLocation';
import { LoadingScreen } from '../screen/LoadingScreen';
import AlertFloatingComponent from './AlertFloatingComponent';
import FabComponent from './FabComponent';
import { StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native';
import { baseURL } from '../api/apiAlerta';

interface Props {
    markers?: String[]
}


const MapComponent = ({ markers }: Props) => {
    const { hasLocation, initialPosition: { latitude, longitude }, getCurrentLocation, centros } = useLocation();
    const mapViewRef = useRef<MapView>();
    const [modalVisible, setModalVisible] = useState(false);
    const centerPosition = async () => {
        try {
            RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                interval: 10000,
                fastInterval: 5000,
            }).then(async (data) => {
                console.log(data);
                if (data === "enabled") {
                    const location = await getCurrentLocation();
                    mapViewRef.current?.animateCamera({
                        center: location
                    });
                }
                if (data === 'already-enabled') {
                    const location = await getCurrentLocation();
                    mapViewRef.current?.animateCamera({
                        center: location
                    });
    
                } else {
                    console.log(data);
                }
            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            
        }
    }



    if (!hasLocation) {
        return <LoadingScreen title='Cargando Ubicacion' descripcion='Por favor espere ......'/>
    }
    return (
        <>
            <Pressable
                style={{
                    position: 'absolute', bottom: 50,
                    left: 20
                }}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                ref={(el) => mapViewRef.current = el!}
                showsUserLocation
                style={{
                    flex: 1
                }}

                region={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                mapType="standard"
            >
                {
                    centros?.map((resp) => {
                        return(
                            <Marker
                                key={resp.id}
                                image={{uri:`${baseURL}/uploadgeneral/tipo-atencion/${resp.id_tipo_atencion}`}}
                                coordinate={{
                                    latitude:Number(resp.lat),
                                    longitude:Number(resp.lng),
                                }}
                                title={resp.titulo}
                                description={resp.direccion}
                            />
                        )
                    })

                }
            </MapView>
            <FabComponent
                iconName='compass-outline'
                onPress={centerPosition}
                style={{
                    position: 'absolute',
                    bottom: 32,
                    left: 20,
                }}
            />
            <AlertFloatingComponent
                style={{
                    position: 'absolute',
                    bottom: 1,
                    right: 0
                }}
            />
        </>
    )
}

export default MapComponent;


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});