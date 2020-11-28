import React from 'react';
import {FiArrowLeft} from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapMarkerImg from '../images/map-marker.svg';
import ApprovedImg from '../images/approved.svg';
import waitingImg from '../images/waiting.svg';

import '../styles/components/Sidebar.css';

export default function Sidebar(){
    const {goBack} = useHistory();
    return(
        <aside className='app-sidebar'>
            <img src={mapMarkerImg} alt="Happy" />
            <div>
                <button type="button" id='upperbutton'>
                    <img src={ApprovedImg} alt="Happy" />
                </button>
                <button type="button">
                    <img src={waitingImg} alt="Happy" />
                </button>
            </div>
            <footer>
            <button type="button" onClick={goBack}>
                <FiArrowLeft size={24} color="#FFF" />
            </button>
            </footer>
        </aside>
    );
}