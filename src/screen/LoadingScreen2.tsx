import React from 'react'
import { View, Image, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
const LoadingScreen2 = () => {
    const colors = useTheme();
    return (
        <View
            style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'#fff',
                
            }}
        >
            <Image
                source={require('../assets/img/fondo7.png')}
                style={{
                    height:170,
                    width:130,
                    marginBottom:30
                }}
            />
            <Text style={{
                color:'black',
                fontWeight:'bold',
                fontSize:20,
                marginBottom:20
            }}>Enviando Alerta</Text>
            
            <ActivityIndicator
                size={50}
                color="black"
            />
            <Text style={{
                color:'black',
                fontWeight:'bold',
                marginTop:20,
                fontSize:15
            }}>Por favor espere .......</Text>
        </View>
    )
}

export default LoadingScreen2