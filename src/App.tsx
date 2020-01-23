import React, { FunctionComponent } from 'react';
import Registrering from './registrering/Registrering';
import Visning from './visning/Visning';

export enum Visningstype {
    VIS_TILRETTELEGGINGSBEHOV,
    REGISTRER_TILRETTELEGGINGSBEHOV,
}

interface Props {
    visningstype: Visningstype;
}

const App: FunctionComponent<Props> = ({ visningstype }) => {
    if (visningstype === Visningstype.REGISTRER_TILRETTELEGGINGSBEHOV) {
        return <Registrering />;
    } else if (visningstype === Visningstype.VIS_TILRETTELEGGINGSBEHOV) {
        return <Visning />;
    } else {
        return null;
    }
};

export default App;
