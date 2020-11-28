import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import '../styles/pages/orphanage-dashboard.css'

export default function OrphanageDashboard() {
    const history = useHistory();

    return (
        <div id="page-orphanage-dashboard">
            <Sidebar />
            <div id="orphanage-title"> 
                <h2>Orfanatos Cadastrados</h2>
                <p>2 Orfanatos</p>
            </div>
            
            <main>
                
            </main>
        </div>
    );
}