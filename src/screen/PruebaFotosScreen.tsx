import React, { useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PruebaFotosScreen = () => {

  const [tempUri, setTempUri] = useState<string>('')

  const tomarFoto = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.5
    }, (resp) => {
      if (resp.didCancel) return;
      if (!resp.assets![0].uri) return;
      setTempUri(resp.assets![0].uri);
      console.log(resp);

    });
  }
  const galeriaFoto =()=>{
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5
    }, (resp) => {
      if (resp.didCancel) return;
      if (!resp.assets![0].uri) return;
      setTempUri(resp.assets![0].uri);
      console.log(resp);

    });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <View
        style={{
          flexDirection:'row',
          justifyContent:'center'
        }}
      >
        <TouchableOpacity
          onPress={tomarFoto}
          style={{
            backgroundColor: 'black',
            width: 80,
            padding: 10,
            alignItems: 'center',
            borderRadius: 10,
            marginRight:20
          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold'
            }}
          >Camara</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={galeriaFoto}
          style={{
            backgroundColor: 'black',
            width: 80,
            padding: 10,
            alignItems: 'center',
            borderRadius: 10,

          }}
        >
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold'
            }}
          >Galeria</Text>
        </TouchableOpacity>
      </View>
      {
        (tempUri) && (
          <Image
            source={{ uri: tempUri }}
            style={{
              width: 300,
              height: 300,
              marginTop: 20
            }}
          />
        )
      }
    </View>
  )
}

export default PruebaFotosScreen