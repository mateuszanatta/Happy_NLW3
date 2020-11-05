import React, {useEffect} from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Feather} from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import Onboarding from 'react-native-onboarding-swiper'; 

import styles from '../../styles/app';
import worldImg from '../../images/world.png';
import childrenImg from '../../images/children/children.png';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function OnboardingPage(){
    const navigation = useNavigation()

    useEffect(() => {
        (async () =>{
            const firstTime = await AsyncStorage.getItem('notFirstTime');

            if(firstTime){
                navigation.navigate('OrphanagesMap');
            }
        })();
    }, []);
    

    const handleNextOnboarding = async () => {
        await AsyncStorage.setItem('notFirstTime', 'true');
        navigation.navigate('OrphanagesMap');
    }
    const Square = ({ isLight = true, selected = true }) => {
        return (
          <View
            style={{
              width: selected ? 20 : 10,
              height: 6,
              borderRadius: 25,
              marginHorizontal: 3,
              right:'99%',
              backgroundColor: selected ? '#FFD152' : '#BECFD8',
            }}
          />
        );
      };

    const DoneButton = () => (
        <RectButton style={ styles.nextOnboarding} onPress={handleNextOnboarding}>
            <Feather style={styles.nextOnboardingText} name='arrow-right'/>
        </RectButton>
      );
    
    return (
        <Onboarding
            NextButtonComponent={DoneButton}
            SkipButtonComponent={({...props }) => {return null}}
            DoneButtonComponent={DoneButton}
            DotComponent={Square}
            bottomBarHighlight={false}
            bottomBarHeight={100}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={worldImg} style={custom.worldImg}/>,
                    title: 'Leve felicidade para o mundo',
                    subtitle: 'Visite orfanatos e mude o dia de muitas crianças.',
                    titleStyles: custom.title,
                    subTitleStyles: custom.description,
                    
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={childrenImg} style={custom.childrenImg}/>,
                    title: 'Escolha um orfanato no mapa e faça uma visita',
                    subtitle: '',
                    titleStyles: custom.title2,
                    
                }
            ]}
            containerStyles={styles.container}
        />
    );
}

const custom = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    worldImg: {
        width: 150,
        height: 150,
    },
    childrenImg: {
        width: 240,
        height: 347,
    },
    title:{
        bottom: '29.31%',

        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 40,
        lineHeight: 48,

        color: '#0089A5'
    },
    title2:{
        left: '2%',
        right: '10.67%',
        bottom: '35.97%',

        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 30,
        lineHeight: 36,
        textAlign: 'right',

        color: '#0089A5'
    },
    description:{
        fontFamily: 'Nunito_600SemiBold',
        bottom: '30.73%',
        fontSize: 20,
        lineHeight: 30,

        color: '#5C8599',
    }
})