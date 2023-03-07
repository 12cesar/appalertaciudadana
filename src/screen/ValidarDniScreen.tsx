import React,{useState} from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useForm } from '../hooks/useForm';
import alertaApi from '../api/apiAlerta';
import { ResultValidarSunat } from '../interfaces/validarSunatInterface';
import { useTheme } from '@react-navigation/native';
import { LoadingScreen } from './LoadingScreen';

interface Props extends StackScreenProps<any, any> { };


const ValidarDniScreen = ({ navigation }: Props) => {
  
  const { dni, form, onChange } = useForm({
    dni: ''
  });
  const [carga, setCarga] = useState<boolean>(false);
  const { colors } = useTheme();
  const validarSunat = async() => {
    try {
    setCarga(true);
    const {data}= await alertaApi.post<ResultValidarSunat>('/validarsunat',{dni});
    setCarga(false)
    navigation.navigate('Register',{nombre:data.datos.nombre, apellido:data.datos.apellido, dni:data.datos.dni});
    } catch (error) {
      setCarga(false)
      Alert.alert('Mensaje', 'Porfavor ingrese un DNI valido');
    }
  }
  if(carga) return <LoadingScreen title='Validando Datos' descripcion='Por favor espere ......'/>
  return (
    <ScrollView style={StylesLogin.container}>
      <TouchableOpacity
        style={{
          marginTop:20,
        }}
        onPress={()=>{navigation.pop()}}
      >
        <Icon
          name='arrow-back'
          size={30}
          color={colors.text}
        />
      </TouchableOpacity>
      <View>
        <View style={StylesLogin.title}>
          <Image style={StylesLogin.logo} source={require('../assets/img/login/logo-login1.jpeg')} />
          <Text style={StylesLogin.textTitle}>Alerta Ciudadana</Text>
        </View>
        <View>
          <Text style={StylesLogin.loginText}>Ingrese DNI, para validar sus datos</Text>
          <View >
            <View style={StylesLogin.containerInput}>
              <TextInput
                style={{
                  ...StylesLogin.inputText,
                  color:colors.text
                }}
                underlineColorAndroid='transparent'
                placeholder='Ingrese DNI'
                placeholderTextColor={'#7B8794'}
                keyboardType="numeric"
                // onchange, value
                onChangeText={(value)=>onChange(value, 'dni')}
                value={dni}
              />
              <View style={StylesLogin.viewIcon}>
                <Icon
                  name='person-circle-sharp'
                  size={26}
                  color={'black'}
                //style={StylesLogin.icon}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={StylesLogin.submitLogin}
            onPress={validarSunat}
          >
            <Text style={StylesLogin.textSubmitLogin}>Validar DNI</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default ValidarDniScreen;


const StylesLogin = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30
  },
  title: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',

  },
  logo:{
    height:175,
    width:180,
    marginLeft:20,
  },
  textTitle: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "500",
    fontFamily: "Avenir Next",
    color: "#1d2029"
  },
  containerLogin: {
    marginTop: 48,
    flexDirection: "row",
    justifyContent: "center"
  },
  socialButton: {
    flexDirection: "row",
    marginHorizontal: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(171,180,189,0.65)",
    borderRadius: 4,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  socialLogo: {
    width: 16,
    height: 16,
    marginHorizontal: 8
  },
  socialText: {

  },
  buttonResetPassword: {
    alignItems: "flex-end"
  },
  textResetPassword: {
    color: "#ff1654",
    fontSize: 14,
    fontWeight: "500",
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginText: {
    color: "#abb4bd",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 20
  },
  submitLogin: {
    backgroundColor: "#05923d",
    fontSize: 16,
    borderRadius: 4,
    paddingVertical: 12,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  textSubmitLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    color: "#fff",
    fontWeight: "600",
    fontSize: 16
  },
  linkRegister: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    color: "#abb4bd",
    textAlign: "center",
    fontWeight: "500",
    marginTop: 24
  },
  containerInput: {
    marginBottom: 10
  },
  inputText: {
    height: 50,
    backgroundColor: '#fff',
    paddingRight: 40,
    paddingLeft: 55,
    //marginHorizontal: 20,
    borderRadius: 10,
    borderColor: '#e4e7eb',
    borderWidth: 2
  },
  viewIcon: {
    //backgroundColor:'#B6F092',
    position: 'absolute',
    padding: 10,
    left: 1,
    top: 1,
    borderColor: "#e4e7eb",
    borderRightWidth: 1
    //borderTopStartRadius:8,
    //borderBottomStartRadius: 8,
  },
});