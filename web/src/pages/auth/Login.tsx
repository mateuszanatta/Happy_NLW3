import React, { useState } from 'react';
import api from "../../services/api";
// import { View, StyleSheet, TextInput, Text } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';

// import styles from '../../../../mobile/src/styles/app';
// import { RectButton } from 'react-native-gesture-handler';
// import api from '../../../../mobile/src/Services/api';
// import auth from '../../services/auth';
import mapIcon from "../../images/map-marker.svg";
import '../../styles/pages/login.css'


export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const route = useRoute();
    // const navigation = useNavigation();

    // const handleLogin = () => {
    //     const data = {
    //         email: email,
    //         password: password
    //     };
    //     api.post('/login', data).then(response => {
    //         const { token } = response.data;
    //         auth.onSignIn(token);
    //     })
    // }

    return(
        <div id="page-login">
            <aside>
                <header>
                    <img src={mapIcon} alt="Happy" className='loginImage' />
                    <h2>happy</h2>
                </header>
                <footer>
                    <strong>Independência</strong>
                    <span>Rio Grande do Sul</span>
                </footer>
            </aside>
            <main>
                <form onSubmit={() => {}} className="login-form">
                    <div className="input-block">
                        <label htmlFor="email">E-mail</label>
                        <input id="name" 
                                type='email'
                                value={email} 
                                onChange={event => setEmail(event.target.value)} />
                    </div>
                    <div className="input-block">
                        <label htmlFor="password">Senha</label>
                        <input id="password" 
                                type='password'
                                value={password} 
                                onChange={event => setPassword(event.target.value)} />
                    </div>
                    <div className="input-block" >
                        <label htmlFor="rememberme">
                            <input type="checkbox" name="rememberme" />
                            Lembrar-me
                        </label>
                        
                    </div>
                    <button disabled={true} className="login-button" type="submit">
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
//         <View style={custom.container}> 
//             <Text style={styles.title}>Login</Text>
//             <Text style={styles.label}>E-mail</Text>
//             <TextInput
//                 autoCompleteType='email'
//                 keyboardType='email-address'
//                 textContentType='emailAddress'
//                 style={styles.input}
//                 value={email}
//                 onChangeText={text => setEmail(text)}
//             />
//             <Text style={styles.label}>Senha</Text>
//             <TextInput
//                 style={styles.input}
//                 secureTextEntry={true}
//                 autoCompleteType='password'
//                 textContentType='password'
                
//                 value={password}
//                 onChangeText={text => setPassword(text)}
//             />
//             <RectButton style={styles.nextButton} onPress={handleLogin}>
//                 <Text style={styles.nextButtonText}>Login</Text>
//             </RectButton>
//         </View>
    )
}

// const custom = StyleSheet.create({
//     container: {
//       flex: 1,
//       padding: 24,
//       paddingTop: 80
//     },
// })
