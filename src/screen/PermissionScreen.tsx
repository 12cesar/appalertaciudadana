import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AuthContext from '../context/AuthContext';



const PermissionScreen = () => {
  const {permissions, askLocationPermissions} = useContext(AuthContext);

  return (
    <SafeAreaView
            style={{
                flex:1,
            }}
        >
         <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 5,
          padding: 40,
          justifyContent: 'center',
        }}>
        <Image
          source={{
            uri: 'https://res.cloudinary.com/dertftoym/image/upload/v1635935538/slide-1_dpnft7.png',
          }}
          style={{
            width: 350,
            height: 400,
            resizeMode: 'center',
          }}
        />
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Para que la aplicacion funcione correctamente es necesario tener permisos de la localicacion, da click en aceptar para poder continuar.</Text>
        </View>
        <View style={{
                flexDirection:'row',
                justifyContent:'flex-end',
                marginHorizontal:20,
                alignItems:'center',
                marginBottom:40
            }}>
            <TouchableOpacity
                style={{
                    flexDirection:'row',
                    backgroundColor:'#05923d',
                    width:140,
                    height:50,
                    borderRadius:10,
                    justifyContent:'center',
                    alignItems:'center'
                }}
                onPress={askLocationPermissions}
            >
                <Text style={{
                    fontSize:20,
                    color:'white',
                    marginBottom:5,
                    marginRight:5
                }}>Aceptar</Text>
                <Icon
                    name="paper-plane-outline"
                    color="white"
                    size={30}
                />
            </TouchableOpacity>
            </View>
        </SafeAreaView>
    /*<View style={{}}>
      <Text>Hola mundo</Text>
      <Button title="Permisos" onPress={askLocationPermissions} />
      <Text>{JSON.stringify(permissions, null, 5)}</Text>
    </View>*/
  );
};

export default PermissionScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5856d6',
  },
  subtitle: {
    fontSize: 16,
    color:'black'
  },
});
