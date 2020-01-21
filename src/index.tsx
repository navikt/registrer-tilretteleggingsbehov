import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NAVSPA from '@navikt/navspa';
import './index.less';

if (document.getElementById('oppfolging-tilretteleggingsbehov-utvikling')) {
    ReactDOM.render(<App />, document.getElementById('oppfolging-tilretteleggingsbehov-utvikling'));
} else {
    NAVSPA.eksporter('tilretteleggingsbehov', App);
}
