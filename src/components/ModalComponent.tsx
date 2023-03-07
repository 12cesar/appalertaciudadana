import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { modalStyle } from '../styles/ModalStyle';
import useModalCompent from '../hooks/useModalCompent';
import { useForm } from '../hooks/useForm';
import { CrearAlert } from '../interfaces/crearAlerta.interface';
import { LoadingScreen } from '../screen/LoadingScreen';
interface Props {
    onPress: () => void
    typeAlert: {
        alerta: string,
        nombre: string,
        envio: string
    }
}


const ModalComponent = ({ onPress, typeAlert }: Props) => {

    const { galeriaFoto, tomarFoto, tempImage, defaultImage, agregarAlerta, imagen } = useModalCompent();
    const [carga, setCarga] = useState<boolean>(false);
    const { descripcion, form, onChange } = useForm({
        descripcion: ''
    });
    const crearAlerta = async() => {
        setCarga(true);
        if (typeAlert.envio !== '3' && descripcion === '') {
            return Alert.alert('Mensaje', 'Porfavor ingrese una descripcion');
        }
        const data:CrearAlert ={
            descripcion:descripcion,
            tipoAlert:typeAlert.alerta,
            envio:typeAlert.envio
        }
        
        const resp = await agregarAlerta(imagen, data);
        if (resp) {
            setCarga(false);
        }
        
    }
    if (carga) return <LoadingScreen title='Enviando alerta ciudadana' descripcion='Por favor espere ......'/>
    return (
        <View style={modalStyle.centeredView}>
            <View style={modalStyle.modalViewUno}>
                <TouchableOpacity
                    style={modalStyle.buttonClose}
                    onPress={onPress}
                >
                    <Icon
                        name='close-circle-sharp'
                        size={30}
                        color={'#fa0905'}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Text style={modalStyle.modalText}>ALERTA DE {typeAlert.nombre}</Text>

                </View>
                {
                    (typeAlert.envio === '1')
                        ?
                        <View style={{
                            width: '60%',
                            height: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 10
                        }}>
                            <Image
                                source={{ uri: (!tempImage) ? defaultImage : tempImage }}
                                style={{
                                    width: '100%',
                                    height: '70%',
                                    marginBottom: 10,
                                    borderRadius: 10
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginLeft: 10
                                }}
                            >
                                <TouchableOpacity
                                    style={[modalStyle.buttonImage]}
                                    onPress={tomarFoto}
                                >
                                    <Icon
                                        name='camera-sharp'
                                        size={25}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[modalStyle.buttonImage]}
                                    onPress={galeriaFoto}
                                >
                                    <Icon
                                        name='image-sharp'
                                        size={25}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        : <View></View>
                }
                <View
                    style={modalStyle.textInputUno}
                >
                    <TextInput
                        multiline={true}
                        placeholder="Descripcion de la alerta"
                        onChangeText={(value)=>onChange(value, 'descripcion')}
                        value={descripcion}
                        style={{
                            color: 'black'
                        }}
                    />
                </View>

                <View
                    style={modalStyle.viewButton}
                >
                    <TouchableOpacity
                        style={[modalStyle.buttonOpen]}
                        onPress={crearAlerta}
                    >
                        <Icon
                            name='paper-plane-sharp'
                            size={20}
                        />
                        <Text style={modalStyle.textStyle}>Enviar Alerta</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )

}

export default ModalComponent;


