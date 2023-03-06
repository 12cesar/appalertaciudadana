import React, { useRef, useState } from 'react'
import { Animated, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native';
import alertaApi, { baseURL } from '../api/apiAlerta';
import { Tipoalerta } from '../interfaces/tipoAlerta.interface';
import { alertFloatingStyle } from '../styles/AlertFloatingStyle';

const useAlertFloating = () => {

  const animation = useRef(new Animated.Value(0)).current;
  const [initValue, setinitValue] = useState(true);
  const [tipoAlertas, setTipoAlertas] = useState<Tipoalerta[]>();
  const [carga, setCarga] = useState(true);

  const mostrarTipoAlertas = async () => {
    try {
      const resp = await alertaApi.get('/tipoalerta', { params: { estado: 1 } });
      setTipoAlertas(resp.data.tipoalerta);
      setCarga(false);
      console.log(tipoAlertas);
    } catch (error) {
      console.log(error);
    }
  };
 
  const toggleMenu = () => {
    const toValue = !initValue ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: false,
    }).start();
    setinitValue(!initValue);
  };
  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };
 const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });
  return {
    carga,
    tipoAlertas,
    initValue,
    mostrarTipoAlertas,
    toggleMenu,
    rotation,
    opacity,
    animation,
    
  }
}

export default useAlertFloating;

