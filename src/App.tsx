import React, { FunctionComponent } from 'react';
import Registrering from './registrering/Registrering';
import Visning from './visning/Visning';

export enum Visningstype {
    VIS_TILRETTELEGGINGSBEHOV = 'VIS_TILRETTELEGGINGSBEHOV',
    REGISTRER_TILRETTELEGGINGSBEHOV = 'REGISTRER_TILRETTELEGGINGSBEHOV',
}

interface Props {
    viewType: Visningstype;
}

const App: FunctionComponent<Props> = ({ viewType }) => {
    if (viewType === Visningstype.REGISTRER_TILRETTELEGGINGSBEHOV) {
        return <Registrering />;
    } else if (viewType === Visningstype.VIS_TILRETTELEGGINGSBEHOV) {
        return <Visning />;
    } else {
        return null;
    }
};

export default App;
