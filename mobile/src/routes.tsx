import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
 
import OrphanagesMap from './Pages/orphanages-map';
import OrphanageDetails from './Pages/orphanage-details';
import SelectMapPosition from './Pages/CreateOrphanage/select-map-position';
import OrphanageData from './Pages/CreateOrphanage/orphanage-data';
import Login from '../../web/src/pages/auth/login';
import Header from './Components/header';

const {Navigator, Screen} = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
                <Screen name='OrphanagesMap' 
                        component={OrphanagesMap} />
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
                            header: () => <Header title="Informe os Dados" />
                        }}
                        />
            </Navigator>
        </NavigationContainer>
    );
}