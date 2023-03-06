import React from 'react';
import {
  createDrawerNavigator

} from '@react-navigation/drawer';
import AlertasScreen from '../screen/AlertasScreen';
import HomeScreen from '../screen/HomeScreen';
import MapaScreen from '../screen/MapaScreen';
import MenuDrawer from '../components/DrawerComponent';
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {    
  return (
    <Drawer.Navigator
      drawerContent={(props) => <MenuDrawer {...props} />}
      screenOptions={{
        drawerLabelStyle: { marginLeft: -25 },
        drawerActiveBackgroundColor: '#05923d',
        drawerActiveTintColor: 'black',
      }}
      initialRouteName="Alertas">
      <Drawer.Screen
        name="Mapa"
        component={MapaScreen}
      />
      <Drawer.Screen
        name="Alertas"
        component={AlertasScreen}
      />
      <Drawer.Screen
        name="Perfil"
        component={HomeScreen}
      />
    </Drawer.Navigator>
  );
};



export default DrawerNavigator;

