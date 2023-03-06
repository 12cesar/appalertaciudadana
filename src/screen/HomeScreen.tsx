import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {drawerStyle} from '../styles/DrawerMenuStyle';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {useTheme} from '@react-navigation/native';
import alertaApi, {baseURL} from '../api/apiAlerta';
import {useForm} from '../hooks/useForm';
import {LoadingScreen} from './LoadingScreen';
import {HomeStyle} from '../styles/HomeStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCamaraCiudadano from '../hooks/useCamara';
import usePeticionesPut from '../hooks/usePeticionesPut';
interface Props extends DrawerScreenProps<any, any> {}
const HomeScreen = ({navigation}: Props) => {
  const {tomarFoto, defaultImage, tempImage} = useCamaraCiudadano();
  const {actualizarCiudadano} = usePeticionesPut();
  const {colors} = useTheme();
  const [carga, setCarga] = useState(false);
  const {password, celular, correo, imagen, form, onChange} = useForm({
    password: '',
    celular: '',
    correo: '',
    imagen: '',
  });

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <View style={drawerStyle.container}>
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{
              marginLeft: 10,
            }}>
            <Image
              source={require('../assets/img/menu/icon1.png')}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </TouchableOpacity>
          <Image
            source={require('../assets/img/menu/logo-menu.jpeg')}
            style={{
              height: 50,
              width: 110,
              left: 85,
            }}
          />
        </View>
      ),
      drawerPosition: 'left',
    });
  }, []);

  useEffect(() => {
    mostrarDetalle();
  }, []);

  const mostrarDetalle = async () => {
    const resp = await alertaApi.get('/detalleciudadano/mostrardetalle');
    const token = await AsyncStorage.getItem('token');
    console.log(resp.data);
    form.correo = resp.data.detalleCiudadano
      ? resp.data.detalleCiudadano.correo
      : '';
    form.celular = resp.data.detalleCiudadano
      ? resp.data.detalleCiudadano.celular
      : '';
    console.log(resp.data.detalleCiudadano.imagen);

    form.imagen =
      resp.data.detalleCiudadano && resp.data.detalleCiudadano.imagen
        ? `${baseURL}/uploadgeneral/ciudadano/${resp.data.detalleCiudadano.imagen}?token=${token}`
        : `${baseURL}/uploadgeneral/ciudadano/${123}?token=${token}`;
    console.log(defaultImage);

    setCarga(true);
  };
  const actualizar = () => {
    actualizarCiudadano({celular, correo, password});
  };
  if (!carga) {
    return <LoadingScreen />;
  }
  return (
    <View style={{...HomeStyle.container}}>
      <View style={HomeStyle.containerFlat}>
        <View>
          <TouchableOpacity activeOpacity={0.8} onPress={tomarFoto}>
            <Image
              style={HomeStyle.logo}
              source={{uri: !tempImage ? form.imagen : defaultImage}}
            />
          </TouchableOpacity>
        </View>
        <Text style={HomeStyle.textReset}>Actualizar Datos</Text>
        <View style={HomeStyle.containerInputGeneral}>
          <View style={HomeStyle.containerInput}>
            <TextInput
              style={{
                ...HomeStyle.inputText,
                color: colors.text,
              }}
              underlineColorAndroid="transparent"
              placeholder="Ingrese Password"
              placeholderTextColor={'#7B8794'}
              secureTextEntry={true}
              onChangeText={value => onChange(value, 'password')}
              value={password}
              keyboardType="default"
            />
          </View>
          <View style={HomeStyle.containerInput}>
            <TextInput
              style={{
                ...HomeStyle.inputText,
                color: colors.text,
              }}
              underlineColorAndroid="transparent"
              placeholder="Ingrese Celular"
              placeholderTextColor={'#7B8794'}
              keyboardType="numeric"
              onChangeText={value => onChange(value, 'celular')}
              value={celular}
            />
          </View>
          <View style={HomeStyle.containerInput}>
            <TextInput
              style={{
                ...HomeStyle.inputText,
                color: colors.text,
              }}
              underlineColorAndroid="transparent"
              placeholder="Ingrese Correo Electronico"
              placeholderTextColor={'#7B8794'}
              keyboardType="email-address"
              onChangeText={value => onChange(value, 'correo')}
              value={correo}
            />
          </View>

          <View style={HomeStyle.containerInput}>
            <TouchableOpacity
              style={HomeStyle.buttonReset}
              onPress={actualizar}>
              <Text style={HomeStyle.textResetPassword}>Actualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
