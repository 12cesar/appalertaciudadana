

import React from 'react'
import { View, StyleProp, ViewStyle, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props{
    iconName:string,
    onPress: ()=>void,
    style:StyleProp<ViewStyle>
}


const FabComponent = ({iconName,onPress,style={}}:Props) => {
  return (
    <View
        style={{...style as any, padding:50}}
    >
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={styles.blackButton}
        >
            <Icon
                name={iconName}
                color={'white'}
                size={28}
                style={{
                    left:1
                }}
            />
        </TouchableOpacity>
    </View>
  )
}

export default FabComponent;


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