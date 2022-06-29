import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import NAVSPA from '@navikt/navspa';
import Utvikling from './utvikling/Utvikling';
import '@navikt/ds-css';

if (process.env.REACT_APP_MOCK) {
    require('./mock/mock');
}

if (document.getElementById('registrer-tilretteleggingsbehov-utvikling')) {
    const utviklingsapp = document.getElementById('registrer-tilretteleggingsbehov-utvikling');
    const root = createRoot(utviklingsapp!);

    root.render(<Utvikling />);
} else {
    NAVSPA.eksporter('tilretteleggingsbehov', App);
}
