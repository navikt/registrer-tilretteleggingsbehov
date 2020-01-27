import React, { FunctionComponent } from 'react';
import Registrering from './registrering/Registrering';
import Visning from './visning/Visning';
import { Normaltekst } from 'nav-frontend-typografi';

export enum Visningstype {
    VisTilretteleggingsbehov = 'VIS_TILRETTELEGGINGSBEHOV',
    RegistrerTilretteleggingsbehov = 'REGISTRER_TILRETTELEGGINGSBEHOV',
}

interface Props {
    viewType: Visningstype;
    fnr: string;
}

const App: FunctionComponent<Props> = ({ viewType, fnr }) => {
    let side;
    if (viewType === Visningstype.RegistrerTilretteleggingsbehov) {
        side = <Registrering fnr={fnr} />;
    } else if (viewType === Visningstype.VisTilretteleggingsbehov) {
        side = <Visning fnr={fnr} />;
    } else {
        return null;
    }

    return <Normaltekst>{side}</Normaltekst>;
};

export default App;
