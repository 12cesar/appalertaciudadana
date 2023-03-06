import { DrawerNavigationProp, DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react'
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

interface Props extends DrawerScreenProps<any, any>{};
const HeaderDrawerComponent = (navigation:any) => {
  return (
    <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems:'center',
            position: 'absolute',
            height: 50,
            width: '100%',
            backgroundColor: '#fff',
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>

          {/* <Text 
            style={{
              alignItems:'center',
              justifyContent:'center',
              fontSize:14,
              fontWeight:'bold'
            }}
          >Alerta Ciudadana</Text> */}
          <TouchableOpacity 
            onPress={() => navigation.toggleDrawer()}
            style={{
              marginLeft:10
            }}
          >
            <Icon
              name='menu-outline'
              size={30}
              style={{
                fontWeight:'bold',
              }}
            />
          </TouchableOpacity>
        </View>
  )
}

export default HeaderDrawerComponent