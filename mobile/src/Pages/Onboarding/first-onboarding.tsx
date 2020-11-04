import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';

import styles from '../../styles/app';
import worldImg from '../../images/world.png';
import Carro from '../../images/carro/Carro1.png';
import { RectButton } from 'react-native-gesture-handler';

export default function FirstOnboarding(){
    const navigation = useNavigation()
    const handleNextOnboarding = () => {
        navigation.navigate('SecondOnboarding');
    }

    return (
        <View style={styles.container}>
            <Image style={custom.worldImg} source={worldImg}/>
            <Text style={custom.title}>
                Leve felicidade para o mundo
            </Text>
            <Text style={custom.description}>
                Visite orfanatos e mude o dia de muitas crianças.
            </Text>
            <RectButton style={styles.carroOnboarding} onPress={handleNextOnboarding}>
                <Image source={Carro} />
            </RectButton>
            <RectButton style={ styles.nextOnboarding} onPress={handleNextOnboarding}>
                <Feather style={styles.nextOnboardingText} name='arrow-right'/>
            </RectButton>
        </View>
    );
}

const custom = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CEDEE6',
    },
    worldImg: {
        position: 'absolute',
        width: 256.22,
        height: 279,
        left: 59.38,
        top: 30,
    },
    title:{
        width:300,
        position: 'absolute',
        left: '12.27%',
        right: '29.87%',
        top: '47.04%',
        bottom: '29.31%',

        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 40,
        lineHeight: 48,

        color: '#0089A5'
    },
    description:{
        width:300,
        height:65,
        position: 'absolute',
        left: '12.27%',
        right: '25.33%',
        top: '73.65%',
        bottom: '18.97%',

        fontFamily: 'Nunito_600SemiBold',
        fontSize: 20,
        lineHeight: 30,

        color: '#5C8599',
    }
})