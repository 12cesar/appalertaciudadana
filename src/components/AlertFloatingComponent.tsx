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
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { baseURL } from '../api/apiAlerta';
import useAlertFloating from '../hooks/useAlertFloating';
import { alertFloatingStyle } from '../styles/AlertFloatingStyle';
import ModalComponent from './ModalComponent';
import { TouchableOpacity } from 'react-native';
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
        <View style={{ ...(style as any), alignItems: 'center',padding:30}}>
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

            <TouchableOpacity onPress={toggleMenu} style={styles.blackButton} activeOpacity={0.8}>
                <Animated.View style={[alertFloatingStyle.buttonPrimary, rotation]}>
                    <Icon name="add-sharp" size={24} color="#fff" />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};

export default AlertFloatingComponent;


const styles = StyleSheet.create({
    blackButton:{
        zIndex:999,
        height:50,
        width:50,
        backgroundColor:'#05923d',
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:3
        },
        shadowOpacity:0.27,
        shadowRadius:4.65,
        elevation:6
    }
});