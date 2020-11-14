import React, {useState, useContext} from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';


import styles from '../../styles/app';

import OrphanageContext from '../../Context/orphanage-data-context';

export default function OrphanageData() {
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [images, setImages] = useState<string[]>([]);

    const route = useRoute();
    let orphanageData = useContext(OrphanageContext);

    const navigation = useNavigation();

    async function handleNavigateToOrphanageSchedule(){
        orphanageData.name     = name;
        orphanageData.about    = about;
        orphanageData.whatsapp = whatsapp
        orphanageData.images   = images;

        navigation.navigate('OrphanageSchedule');

    }
    async function handleSelectImages(){
        const status = await ImagePicker.requestCameraRollPermissionsAsync();

        if( !status.granted ){
            alert('Eita, precisamos de acesso às suas fotos ...');
            return ;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        if(result.cancelled){
            return;
        }

        const { uri: image } = result;

        setImages([...images, image]);

    }
  return (
    <ScrollView style={custom.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>
      <Text style={styles.pageNumber}>01 <Text style={styles.pageNumberInactive}> - 02</Text></Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={text => setName(text)}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={text => setAbout(text)}
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
        dataDetectorTypes='phoneNumber'
        keyboardType='phone-pad'
        onChangeText={text => setWhatsapp(text)}
      />

      <Text style={styles.label}>Fotos</Text>
      <View style={custom.uploadedImageContainer}>
          {images.map(image => {
              return (
                  <Image
                    key={image}
                    source={{uri: image}}
                    style={custom.uploadImage}
                  />
              )
          })}
      </View>
      <TouchableOpacity style={custom.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <RectButton style={styles.nextButton} onPress={handleNavigateToOrphanageSchedule}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </ScrollView>
  )
}

const custom = StyleSheet.create({
  container: {
    flex: 1,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  uploadedImageContainer: {
    flexDirection: 'row'
  },
  uploadImage: {
      width: 64,
      height: 64,
      borderRadius: 20,
      marginBottom: 32,
      marginRight: 8
  }
})