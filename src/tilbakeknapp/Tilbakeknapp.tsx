import React, { FunctionComponent } from 'react';
import { navigerTilVisningsside } from '../utils/navigering';
import { Back } from '@navikt/ds-icons';
import './Tilbakeknapp.less';

const Tilbakeknapp: FunctionComponent = () => {
    return (
        <button onClick={navigerTilVisningsside} className="navds-link tilbakeknapp">
            <Back fr="" />
            Tilbake til detaljer
        </button>
    );
};

export default Tilbakeknapp;
