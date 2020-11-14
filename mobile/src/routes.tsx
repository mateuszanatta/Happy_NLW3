import React, { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
import OnboardingPage from './Pages/Onboarding/onboarding';
import OnboardingSelectMap from './Pages/Onboarding/onboarding-select-map';
import OrphanagesMap from './Pages/orphanages-map';
import OrphanageDetails from './Pages/orphanage-details';
import SelectMapPosition from './Pages/CreateOrphanage/select-map-position';
import OrphanageData from './Pages/CreateOrphanage/orphanage-data';
import OrphanageSchedule from './Pages/CreateOrphanage/orphanage-schedule';

import Header from './Components/header';
import OrphanageContext from './Context/orphanage-data-context';
import OrphanageContextInterface from './Interfaces/orphanage-context-interface';

const {Navigator, Screen} = createStackNavigator();

export default function Routes(){
    const [ isFirstTime, setIsFirstTime ] = useState(true);
    (async () =>{
        const isFirstTime = await AsyncStorage.getItem('isFirstTime');
        if(isFirstTime == 'false'){
            setIsFirstTime(false);
        }
    })();
    
    return (
        
        <NavigationContainer>
            <OrphanageContext.Provider value={{} as OrphanageContextInterface}>
                <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
                    
                    {isFirstTime &&
                            <Screen name='OnboardingPage' 
                            component={OnboardingPage}
                        />
                    }
                    <Screen name='OrphanagesMap' 
                            component={OrphanagesMap} />
                    
                    <Screen name='OnboardingSelectMap'
                        component={OnboardingSelectMap}
                    />
                    
                    <Screen name='OrphanageDetails' 
                            component={OrphanageDetails} 
                            options={{
                                headerShown: true,
                                header: () => <Header title="Orfanato" showCancel={false}/>
                            }}
                            />
                        <Screen name='SelectMapPosition' 
                                options={{
                                    headerShown: true,
                                    header: () => <Header title="Selecione no Mapa" />
                                }}
                                component={SelectMapPosition} />
                        <Screen name='OrphanageData' 
                                component={OrphanageData} 
                                options={{
                                    headerShown: true,
                                    header: () => <Header title="Adicione um orfanato" />
                                }} />
                        <Screen name='OrphanageSchedule'
                                component={OrphanageSchedule}
                                options={{
                                    headerShown: true,
                                    header: () => <Header title="Adicione um orfanato" />
                                }} />
                </Navigator>
            </OrphanageContext.Provider>
        </NavigationContainer>
        
    );
}