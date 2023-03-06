
import React, { useContext, useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { ScrollView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert, Keyboard } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import AuthContext from '../context/AuthContext';
import { useForm } from '../hooks/useForm';
import { useTheme } from '@react-navigation/native';

interface Props extends StackScreenProps<any, any> { };

const LoginScreen = ({ navigation }: Props) => {

  const { signIn, errorMessage, removeError } = useContext(AuthContext);
  const { dni, password, form, onChange } = useForm({
    dni: '',
    password: ''
  });
  const { colors } = useTheme();
  useEffect(() => {
    if (errorMessage.length === 0) return;
    Alert.alert(
      'Login Incorrecto',
      errorMessage,
      [
        {
          text: 'Ok',
          onPress: removeError
        }
      ]

    )
  }, [errorMessage]);

  const onlogin=()=>{
    console.log({dni, password});
    
    signIn({dni, password});
    Keyboard.dismiss();
}


  return (
    <ScrollView style={StylesLogin.container}>
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

            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
          >
            <View style={StylesLogin.socialButton}>
              <Image source={require('../assets/img/google.png')} style={StylesLogin.socialLogo} />

            </View>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={StylesLogin.loginText}>Iniciar Sesion</Text>
          <View>
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
                onChangeText={(value)=>onChange(value, 'dni')}
                value={dni}
              />
              <View style={StylesLogin.viewIcon}>
                <Icon
                  name='card-sharp'
                  size={26}
                  color={'black'}
                //style={StylesLogin.icon}
                />
              </View>
            </View>
            <View style={StylesLogin.containerInput}>
              <TextInput
                style={{
                  ...StylesLogin.inputText,
                  color:colors.text
                }}
                underlineColorAndroid='transparent'
                placeholder='Ingrese Password'
                placeholderTextColor={'#7B8794'}
                secureTextEntry={true}
                onChangeText={(value)=>onChange(value, 'password')}
                value={password}
              />
              <View style={StylesLogin.viewIcon}>
                <Icon
                  name='key-sharp'
                  size={26}
                  color={'black'}
                //style={StylesLogin.icon}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity 
            style={StylesLogin.buttonResetPassword}
            onPress={() => navigation.navigate('ResetPassword')}
          >
            <Text
              style={StylesLogin.textResetPassword}
              
            >Recuperacion de contraseña?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={StylesLogin.submitLogin}
            onPress={onlogin}
          >
            <Text style={StylesLogin.textSubmitLogin}>Iniciar Sesion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ValidarSunat')}
          >
            <Text style={StylesLogin.linkRegister}>
              No tienes una cuenta? <Text style={StylesLogin.textResetPassword}>Registrate ahora</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>

  );
}

export default LoginScreen;

const StylesLogin = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
    paddingHorizontal: 30
  },
  title: {
    marginTop: 40,
    
    alignItems: 'center',
    justifyContent: 'center',

  },
  textTitle: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Avenir Next",
    color: "#05772e"
  },
  logo:{
    height:175,
    width:180,
    marginLeft:20,
  },
  containerLogin: {
    marginTop: 30,
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
    color: "#05772e",
    fontSize: 14,
    fontWeight: "500",
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginText: {
    color: "#abb4bd",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 20,
    fontWeight:"bold"
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
    borderRadius: 8,
    borderColor: '#e4e7eb',
    borderWidth: 1
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