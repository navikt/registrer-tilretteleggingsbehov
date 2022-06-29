import React, { FunctionComponent } from 'react';
import { navigerTilVisningsside } from '../utils/navigering';
import { Back } from '@navikt/ds-icons';
import css from './Tilbakeknapp.module.css';

const Tilbakeknapp: FunctionComponent = () => {
    const className = 'navds-link ' + css.tilbakeknapp;

    return (
        <button onClick={navigerTilVisningsside} className={className}>
            <Back fr="" />
            Tilbake til detaljer
        </button>
    );
};

export default Tilbakeknapp;
