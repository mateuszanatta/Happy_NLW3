import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from "../../services/api";

import auth from '../../services/auth';
import mapIcon from "../../images/map-marker.svg";
import '../../styles/pages/login.css'



export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        };
        api.post('/login', data)
            .then(response => {
                console.log(response);

                const { token } = response.data;
                auth.onSignIn(token);
                history.push('/dashboard');
            })
            .catch(err =>{
                const { error } = err.response.data;
                alert(error);
            });
    }

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
                    <div className="input-block rememberme-block" >
                        
                        <label className='rememberme-label'> <input type="checkbox" name="rememberme" /> Lembrar-me</label>
                        <Link className="link-forgot-password"  to='/' >Esqueci minha Senha</Link>
                    </div>
                    <button disabled={!email && !password} className="login-button" type="submit" onClick={handleLogin}>
                        Confirmar
                    </button>
                </form>
            </main>
        </div>
    )
}
