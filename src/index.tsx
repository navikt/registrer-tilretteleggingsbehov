import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NAVSPA from '@navikt/navspa';
import Utvikling from './utvikling/Utvikling';
import '@navikt/ds-css';

if (process.env.REACT_APP_MOCK) {
    require('./mock/mock');
}

if (document.getElementById('registrer-tilretteleggingsbehov-utvikling')) {
    ReactDOM.render(
        <Utvikling />,
        document.getElementById('registrer-tilretteleggingsbehov-utvikling')
    );
} else {
    NAVSPA.eksporter('tilretteleggingsbehov', App);
}
