import React, { FunctionComponent } from 'react';
import Registrering from './registrering/Registrering';
import Visning from './visning/Visning';

export enum Visningstype {
    VisTilretteleggingsbehov = 'VIS_TILRETTELEGGINGSBEHOV',
    RegistrerTilretteleggingsbehov = 'REGISTRER_TILRETTELEGGINGSBEHOV',
}

interface Props {
    viewType: Visningstype;
}

const App: FunctionComponent<Props> = ({ viewType }) => {
    if (viewType === Visningstype.RegistrerTilretteleggingsbehov) {
        return <Registrering />;
    } else if (viewType === Visningstype.VisTilretteleggingsbehov) {
        return <Visning />;
    } else {
        return null;
    }
};

export default App;
