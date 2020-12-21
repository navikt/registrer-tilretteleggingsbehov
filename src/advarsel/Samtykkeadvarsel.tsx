import React, { FunctionComponent } from 'react';
import Ikon from 'nav-frontend-ikoner-assets';
import { Element } from 'nav-frontend-typografi';
import './Advarsel.less';

const SamtykkeAdvarsel: FunctionComponent = () => {
    return (
        <div className="advarsel blokk-s">
            <Ikon kind="advarsel-sirkel-fyll" size="1.5em" />
            <Element>Mangler samtykke...</Element>
        </div>
    );
};

export default SamtykkeAdvarsel;
