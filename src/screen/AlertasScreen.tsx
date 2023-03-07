import React, { useEffect, useState } from 'react';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import { Image, Text, TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import { drawerStyle } from '../styles/DrawerMenuStyle';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { usePeticionesGet } from '../hooks/usePeticionesGet';
import { baseURL } from '../api/apiAlerta';
import { LoadingScreen } from './LoadingScreen';
import { useTheme } from '@react-navigation/native';
import socket from '../socket/socketApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface Props extends DrawerScreenProps<any, any> { }
const AlertasScreen = ({ navigation }: Props) => {
  const { getAlertaCiudadano, first } = usePeticionesGet();
  const [carga, setCarga] = useState(false);
  const { colors } = useTheme();
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <View
          style={drawerStyle.container}>
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={{
              marginLeft: 10,
            }}>
            <Image
              source={require('../assets/img/menu/icon1.png')}
              style={{
                width: 40,
                height: 40
              }}
            />
          </TouchableOpacity>
          <Image
            source={require('../assets/img/menu/logo-menu.jpeg')}
            style={{
              height: 50,
              width: 110,
              left: 85
            }}
          />
        </View>
      ),
      drawerPosition: 'left',
    });
  }, []);
  useEffect(() => {
    getAlertaCiudadano();
    setCarga(true);
  }, []);
  useEffect(() => {
    try {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      }).then(async (data) => {
        console.log(data);

      }).catch((err) => {
        console.log(err);
      });
    } catch (error) {

    }
  }, []);


  socket.on('actualizar-alerta-ciudadano', async (token) => {
    const tok = await AsyncStorage.getItem('token');
    if (token === tok) {
      getAlertaCiudadano();
    }
  });
  if (!carga) {
    return (
      <LoadingScreen title='Cargando Datos' descripcion='Por favor espere .....' />
    )
  }
  if (first?.length === 0) {
    return (
      <View
        style={{ ...styles.container, padding: 20 }}
      >
        <View style={styles.containerFlat}>
          <Image
            source={require('../assets/img/not-found/no-photo.jpg')}
            style={styles.logo}
          />
          <View>
            <Text style={styles.titulo}></Text>
            <Text style={{ ...styles.descripcion, marginLeft: 10, color: colors.text }}>Aun no tienes alertas registradas</Text>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View
      style={styles.container}
    >
      <Image
        source={require('../assets/img/fondo7.png')}

        style={{
          ...StyleSheet.absoluteFillObject,
          width: '100%', height: '100%'
        }}
      />
      <FlatList
        data={first}
        keyExtractor={item => `${item.id}`}
        /* keyExtractor={(item, index)=>{String(item.id)}} */
        contentContainerStyle={{
          padding: 20
        }}
        renderItem={
          ({ item, index }) => {
            return (
              <View style={styles.containerFlat}>
                <Image
                  source={{ uri: `${baseURL}/uploadgeneral/tipo-alerta/${item.TipoAlertum.img}/${item.TipoAlertum.id}` }}
                  style={styles.logo}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ ...styles.titulo, color: colors.text }}>{item.TipoAlertum.nombre}</Text>
                  <Text style={{ ...styles.descripcion, color: colors.text }}>{item.descripcion}</Text>
                  <Text style={styles.fecha}>{item.fecha}</Text>
                </View>
              </View>
            )
          }
        }
      />
    </View>
  )
}

export default AlertasScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
  },
  containerFlat: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 100
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 70
  },
  titulo: {
    fontSize: 17,
    fontWeight: '700'
  },
  descripcion: {
    fontSize: 16,
    opacity: .7,
    width: 240,
    textAlign: 'justify',
  },
  fecha: {
    fontSize: 14,
    opacity: .8,
    color: '#0099cc'
  }
});