import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NAVSPA from '@navikt/navspa';
import './index.less';

if (document.getElementById('registrer-tilretteleggingsbehov-utvikling')) {
    ReactDOM.render(<App />, document.getElementById('registrer-tilretteleggingsbehov-utvikling'));
} else {
    NAVSPA.eksporter('tilretteleggingsbehov', App);
}
