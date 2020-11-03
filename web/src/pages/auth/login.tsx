import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import styles from '../../../../mobile/src/styles/app';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../../../mobile/src/Services/api';
import auth from '../../services/auth';


export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const route = useRoute();
    const navigation = useNavigation();

    const handleLogin = () => {
        const data = {
            email: email,
            password: password
        };
        api.post('/login', data).then(response => {
            const { token } = response.data;
            auth.onSignIn(token);
        })
    }

    return(
        <View style={custom.container}> 
            <Text style={styles.title}>Login</Text>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
                autoCompleteType='email'
                keyboardType='email-address'
                textContentType='emailAddress'
                style={styles.input}
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Text style={styles.label}>Senha</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                autoCompleteType='password'
                textContentType='password'
                
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <RectButton style={styles.nextButton} onPress={handleLogin}>
                <Text style={styles.nextButtonText}>Login</Text>
            </RectButton>
        </View>
    )
}

const custom = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      paddingTop: 80
    },
})
