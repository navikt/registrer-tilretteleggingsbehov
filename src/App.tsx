import React, { FunctionComponent } from 'react';
import Registrering from './registrering/Registrering';
import Visning from './visning/Visning';

export enum Visningstype {
    VisTilretteleggingsbehov = 'VIS_TILRETTELEGGINGSBEHOV',
    RegistrerTilretteleggingsbehov = 'REGISTRER_TILRETTELEGGINGSBEHOV',
}

interface Props {
    viewType: Visningstype;
    fnr: string;
}

const App: FunctionComponent<Props> = ({ viewType, fnr }) => {
    if (viewType === Visningstype.RegistrerTilretteleggingsbehov) {
        return <Registrering fnr={fnr} />;
    } else if (viewType === Visningstype.VisTilretteleggingsbehov) {
        return <Visning fnr={fnr} />;
    } else {
        return null;
    }
};

export default App;
