import { StyleSheet } from 'react-native';


export const alertFloatingStyle = StyleSheet.create({
  buttonPrimary: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowColor: '#05923d',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 7,
    backgroundColor: '#05923d',
  },
  buttonSecondary: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowColor: '#05923d',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 10,
      height: 10,
    },
    elevation: 7,
    backgroundColor: '#fff',
  },
  iconoAlert: {
    width: 30,
    height: 30
  },
  buttonOption:{
    marginRight:50
  }
});