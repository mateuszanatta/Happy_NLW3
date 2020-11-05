import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import MapView from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';

import handImage from '../../images/hand/hand.png';

export default function OnboardingSelectMap() {
  const navigation = useNavigation();

  function handleNextStep() {
    navigation.navigate('SelectMapPosition');
  }
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.containerTouchable}
            onPress={handleNextStep}
        >
            <LinearGradient
                colors={['rgba(21, 182, 214, .5)', 'rgba(21, 182, 214, .5)']}
                style={styles.gradient}
            >
                <MapView 
                    initialRegion={{
                    latitude:-27.850852,
                    longitude:-54.191442,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                    }}
                    style={styles.mapStyle}
                >
                </MapView>
                <View style={styles.infoContainer}>
                    <Image style={styles.handImg} source={handImage} />
                    <Text style={styles.labelInfo}>Toque no mapa para adicionar um orfanato</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTouchable: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: -1,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
  handImg: {
    left: 30,
  },
  labelInfo: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 24,
    color: '#fff',
    lineHeight: 36,
    textAlign: 'center',
  },
  infoContainer:{
      position: 'absolute',
      width: 203,
      height: 246,
      left: 87,
      top: 200,
  },
  gradient: {
    position:'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',

}
})