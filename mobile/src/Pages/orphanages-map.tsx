import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Dimensions, AsyncStorage } from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import {Feather} from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../Services/api';

import mapMarker from '../images/map-marker.png';
import styles from '../styles/app';

interface OrphanageItem{
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap(){
    const navigation = useNavigation();

    const [orphanages, setOrphanages] = useState<OrphanageItem[]>([]);
    
    useFocusEffect(() => {
      api.get('/orphanages').then( response => {
        setOrphanages(response.data);
      })
    });

    function handleNavigateToOrphaneDetails(id: number){
        navigation.navigate('OrphanageDetails', { id });
    }

    function handleNavigateToCreateOrphanage(){
        navigation.navigate('OnboardingSelectMap');
    }
    return (
        <View style={ styles.container }>
        <MapView style={ custom.map } 
        provider={PROVIDER_GOOGLE}
        initialRegion={
            {
            latitude:-27.850852,
            longitude:-54.191442,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
            }} >
            {
              orphanages.map(orphanage => {
                return (
                  <Marker 
                  key={orphanage.id}
                  icon={mapMarker}
                  coordinate={{
                      latitude:orphanage.latitude,
                      longitude:orphanage.longitude,
                  }}
                  calloutAnchor={{
                      x:2.5,
                      y:0.8
                  }}
                  >
                      <Callout tooltip={true}
                              onPress={() => handleNavigateToOrphaneDetails(orphanage.id)}
                      >
                      <View style={ custom.calloutContainer}>
                          <Text style={ custom.calloutText}> {orphanage.name}</Text>
                      </View>
                      </Callout>
                  </Marker>
                )
              })
            }
            </MapView>

            <View style={ custom.footer}>
            <Text style={ custom.footerText}>{orphanages.length} orfanatos encontrado</Text>
            <RectButton style={ custom.createOrphaneButton} onPress={handleNavigateToCreateOrphanage}>
                <Feather name='plus' size={20} color='#ffff' />
            </RectButton>
            </View>
        </View>

    );
}

const custom = StyleSheet.create({
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    },
  
    calloutContainer:{
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
  
    calloutText:{
      color: '#0089af',
      fontSize: 14,
      fontFamily: 'Nunito_700Bold'
  
    },
    footer:{
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#fff',
      borderRadius: 28,
      height: 46,
      paddingLeft: 24,
      
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3
    },
  
    footerText:{
      color: '#8fa7b3',
      fontFamily: 'Nunito_700Bold'
  
    },
  
    createOrphaneButton:{
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 28,
  
      justifyContent: 'center',
      alignItems: 'center'
    }
  
  });