import React, { FunctionComponent } from 'react';
import { navigerTilVisningsside } from '../utils/navigering';
import { VenstreChevron } from 'nav-frontend-chevron';
import './Tilbakeknapp.less';

const Tilbakeknapp: FunctionComponent = () => {
    return (
        <button onClick={navigerTilVisningsside} className="lenke tilbakeknapp">
            <VenstreChevron />
            Tilbake til detaljer
        </button>
    );
};

export default Tilbakeknapp;
