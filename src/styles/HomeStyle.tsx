import { StyleSheet } from "react-native";

export const HomeStyle = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,
      padding: 20,
     
    },
    containerFlat: {
      flexDirection: 'column',
      justifyContent:'center',
      alignItems:'center',
      padding: 20,
      marginBottom: 20,
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10
      },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 100
    },
    logo:{
      height:175,
      width:180,
      marginLeft:20,
      borderRadius:100,
      marginStart:0
    },
    containerInputGeneral:{
      width:'100%'
    },
    containerInput: {
      marginBottom: 10,
    },
    inputText: {
      height:50,
      backgroundColor: '#fff',
      paddingRight: 40,
      paddingLeft: 15,
      //marginHorizontal: 20,
      borderRadius: 8,
      borderColor: '#e4e7eb',
      borderWidth: 1,
    },
    buttonReset:{
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
    textResetPassword: {
      alignItems: 'center',
      justifyContent: 'center',
      color: "#fff",
      fontWeight: "600",
      fontSize: 16
    },
    textReset:{
      color: "#abb4bd",
      fontSize: 15,
      textAlign: "center",
      marginVertical: 20,
      fontWeight:"bold"
    },
    buttonEdit:{
      position:'absolute',
      padding:5,
      zIndex:999,
      marginTop:130,
      marginLeft:140,
      backgroundColor:'#d8d8d8',
      borderRadius:19
    },
    iconEdit:{
  
    }
  })