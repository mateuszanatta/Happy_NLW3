import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import {Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import styles from '../../styles/app';
import childrenImg from '../../images/children/children.png';
import Carro from '../../images/carro/Carro2.png';

export default function SecondOnboarding(){
    const navigation = useNavigation();
    const handleGoBackPreviousOnboarding = () => {
        navigation.navigate('FirstOnboarding');
    }

    const handleToOrphanageMap = () => {
        navigation.navigate('OrphanagesMap');
    }
    return (
        <View style={styles.container}>
            <Image style={custom.worldImg} source={childrenImg}/>
            <Text style={custom.title}>
                Escolha um orfanato no mapa e faça uma visita
            </Text>

            <RectButton style={styles.carroOnboarding} onPress={handleGoBackPreviousOnboarding}>
                <Image source={Carro} />
            </RectButton>
            <RectButton style={ styles.nextOnboarding} onPress={handleToOrphanageMap}>
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
        width: 295,
        height: 427,
        left: 40,
        top: 50,
    },
    title:{
        width:300,
        height: 150,
        position: 'absolute',
        left: '15%',
        right: '10.67%',
        top: '70.73%',
        bottom: '18.97%',

        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 30,
        lineHeight: 36,
        textAlign: 'right',

        color: '#0089A5'
    },
})