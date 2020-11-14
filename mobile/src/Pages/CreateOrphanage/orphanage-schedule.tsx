import React, {useState, useContext} from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../Services/api';

import styles from '../../styles/app';

import OrphanageContext from '../../Context/orphanage-data-context';

export default function OrphanageSchedule(){
    const [instructions, setInstructions] = useState('');
    const [open_on_weekends, setOpenOnWeekends] = useState(false);
    const [opening_hours, setOpeningHoures] = useState('');

    const route = useRoute();
    const navigation = useNavigation();
    let {name, whatsapp, images, about, latitude, longitude } = useContext(OrphanageContext);
    console.log(name)
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
    return(
        <ScrollView style={custom.container} contentContainerStyle={{ padding: 24 }}>
            <Text style={styles.title}>Visitação</Text>
            <Text style={styles.pageNumberInactive}>01 <Text style={styles.pageNumber}> - 02</Text></Text>

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
  })