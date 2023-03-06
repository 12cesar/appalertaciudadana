import React, { useEffect, useState } from 'react';
import {
    View,
    ViewStyle,
    StyleProp,
    TouchableWithoutFeedback,
    Animated,
    ActivityIndicator,
    Image,
    Modal,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { baseURL } from '../api/apiAlerta';
import useAlertFloating from '../hooks/useAlertFloating';
import { alertFloatingStyle } from '../styles/AlertFloatingStyle';
import ModalComponent from './ModalComponent';
interface Props {
    style: StyleProp<ViewStyle>;
}

const AlertFloatingComponent = ({ style }: Props) => {

    const { carga, mostrarTipoAlertas, toggleMenu, rotation, tipoAlertas, animation } = useAlertFloating();
    const [modalVisible, setModalVisible] = useState(false);
    const [alerta, setAlerta] = useState({
        alerta:'',
        nombre:'',
        envio:''
    });
    useEffect(() => {
        mostrarTipoAlertas();
    }, []);
    const mostrarModal =(idTipoAlerta = '',nombre ='', envio='')=>{
        setAlerta({
            alerta:idTipoAlerta,
            nombre,
            envio
        });
        setModalVisible(true);
        
    }
    const cerrarModal =()=>{
        setModalVisible(false);
    }
    const mostrarTouchable = () => {
        let alineacion = 5;
        if (!carga) {
            return tipoAlertas?.map((data, i) => {
                alineacion = alineacion + 55;
                return (
                    <TouchableWithoutFeedback
                        key={i}
                        onPress={()=>{mostrarModal(String(data.id), data.nombre, String(data.opcion_foto))}}
                    >
                        <Animated.View
                            style={[
                                alertFloatingStyle.buttonSecondary,
                                {
                                    transform: [
                                        { scale: animation },
                                        {
                                            translateY: animation.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [0, -alineacion],
                                            }),
                                        },
                                    ],
                                },
                                opacity,
                            ]}>
                            <Image
                                source={{
                                    uri: `${baseURL}/tipoalerta/mostrar/imagen/ver/${data.id}`,
                                }}
                                style={alertFloatingStyle.iconoAlert}
                            />

                        </Animated.View>
                    </TouchableWithoutFeedback>
                );
            });
        }
    };
    const opacity = animation.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1],
    });

    if (carga) {
        return (
            <View style={{ ...(style as any), alignItems: 'center' }}>
                <TouchableWithoutFeedback>
                    <Animated.View style={alertFloatingStyle.buttonPrimary}>
                        <ActivityIndicator size={30} color="black" />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    return (
        <View style={{ ...(style as any), alignItems: 'center' }}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <ModalComponent
                    onPress={cerrarModal}
                    typeAlert={alerta}
                />
            </Modal>

            {mostrarTouchable()}

            <TouchableWithoutFeedback onPress={toggleMenu}>
                <Animated.View style={[alertFloatingStyle.buttonPrimary, rotation]}>
                    <Icon name="add-sharp" size={24} color="#fff" />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default AlertFloatingComponent;


