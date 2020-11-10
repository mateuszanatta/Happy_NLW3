import React, { createContext } from 'react';
import OrphanageContextInterface from '../Interfaces/orphanage-context-interface';

const OrphanageContext = createContext({} as OrphanageContextInterface);

export default OrphanageContext;