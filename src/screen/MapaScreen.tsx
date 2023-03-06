import React, {useEffect} from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {
  View,
  TouchableOpacity,
  Image,
  AppState
} from 'react-native';
import { drawerStyle } from '../styles/DrawerMenuStyle';
import MapComponent from '../components/MapComponent';

interface Props extends DrawerScreenProps<any, any> {}

const MapaScreen = ({navigation}: Props) => {
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
            {/* <Icon
              name="menu-outline"
              size={30}
              style={{
                color:'black',
                fontWeight:'bold'
              }}
            /> */}
            <Image
              source={require('../assets/img/menu/icon1.png')}
              style={{
                width:40,
                height:40
              }}
            />
          </TouchableOpacity>
          <Image 
            source={require('../assets/img/menu/logo-menu.jpeg')}
            style={{
              height:50,
              width:110,
              left:85
            }}
          />
        </View>
      ),
      drawerPosition: 'left',
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
        <MapComponent/>
        
    </View>
  );
};

export default MapaScreen;