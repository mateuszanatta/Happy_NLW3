import React, {useState, useContext} from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import api from '../../Services/api';

import styles from '../../styles/app';

import OrphanageContext from '../../Context/orphanage-data-context';



interface OrphanageDataRouteParams{
    position:{
        latitude: number;
        longitude: number;
    }
}

export default function OrphanageData() {
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');
    const [instructions, setInstructions] = useState('');
    const [open_on_weekends, setOpenOnWeekends] = useState(false);
    const [opening_hours, setOpeningHoures] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [images, setImages] = useState<string[]>([]);

    const route = useRoute();
    let { latitude, longitude } = useContext(OrphanageContext);

    const navigation = useNavigation();

    async function handleCreateOrphanage(){

        const data = new FormData();

        data.append('name', name);
        data.append('about', about);
        data.append('instructions', instructions);
        data.append('latitude', latitude);
        data.append('longitude', longitude);
        data.append('opening_hours', opening_hours);
        data.append('whatsapp', whatsapp);
        data.append('open_on_weekends', String(open_on_weekends));
        
        images.forEach((image, index) => {
            data.append('images', {
                type: 'image/jpg',
                uri: image,
                name: `image_${index}.jpg`,
            } as any);
        })

        await api.post('/orphanages', data);

        navigation.navigate('OrphanagesMap');

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

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={text => setInstructions(text)}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={text => setOpeningHoures(text)}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
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