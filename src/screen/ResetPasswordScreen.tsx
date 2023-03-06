import { useTheme } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import alertaApi from '../api/apiAlerta';
import { useForm } from '../hooks/useForm';

interface Props extends StackScreenProps<any, any> { };
const ResetPasswordScreen = ({navigation}:Props) => {
  const { colors } = useTheme();
  const { correo, form, onChange } = useForm({
    correo: ''
  });

  const resetPassword =async()=>{
    try {
      //console.log(correo);
      const resp = await alertaApi.post('/enviarmensaje',{correo});
      Alert.alert('Mensaje', resp.data.msg);
      console.log(resp.data);
    } catch (error:any) {
      Alert.alert('Mensaje', 'Porfavor verifique su correo electronico o su conexion a internet');
      
    }
    
  }

  return (
    <ScrollView style={StylesLogin.container}>
      <TouchableOpacity
        style={{
          position:'absolute',
          marginTop:20,
        }}
        onPress={()=>{navigation.popToTop()}}
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
      <View style={StylesLogin.containerLogin}>
        <TouchableOpacity
          activeOpacity={0.9}
        >
          <View style={StylesLogin.socialButton}>
            <Image source={require('../assets/img/facebook.png')} style={StylesLogin.socialLogo} />
            <Text style={StylesLogin.socialText}>Facebook</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
        >
          <View style={StylesLogin.socialButton}>
            <Image source={require('../assets/img/google.png')} style={StylesLogin.socialLogo} />
            <Text style={StylesLogin.socialText}>Google</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={StylesLogin.loginText}>Ingrese su correo, para enviar mensaje de cambio de contraseña</Text>
        <View >
          <View style={StylesLogin.containerInput}>
            <TextInput
              style={{
                ...StylesLogin.inputText,
                color:colors.text
              }}
              underlineColorAndroid='transparent'
              placeholder='Ingrese Correo'
              placeholderTextColor={'#7B8794'}
              keyboardType="email-address"
              // onchange, value
              onChangeText={(value)=>onChange(value, 'correo')}
              value={correo}
            />
            <View style={StylesLogin.viewIcon}>
              <Icon
                name='mail-sharp'
                size={26}
                color={'black'}
              //style={StylesLogin.icon}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={StylesLogin.submitLogin}
          onPress={resetPassword}
        >
          <Text style={StylesLogin.textSubmitLogin}>Enviar mensaje</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
  )
}

export default ResetPasswordScreen;



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