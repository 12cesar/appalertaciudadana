import React from 'react'
import { View, Text, Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

interface Props{
    title:string,
    descripcion:string
}

export const LoadingScreen = ({title,descripcion}:Props) => {
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
            }}>{title}</Text>
            
            <ActivityIndicator
                size={50}
                color="black"
            />
            <Text style={{
                color:'black',
                fontWeight:'bold',
                marginTop:20,
                fontSize:15
            }}>{descripcion}</Text>
        </View>
    )
}
