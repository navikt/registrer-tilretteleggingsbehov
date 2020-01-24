import React, { FunctionComponent, useEffect, useState } from 'react';
import App, { Visningstype } from '../App';
import { visDetaljerEvent } from '../registrering/Registrering';
import { visRegistreringEvent } from '../visning/Visning';

const Utvikling: FunctionComponent = () => {
    const [visningstype, setVisningstype] = useState<Visningstype>(
        Visningstype.VIS_TILRETTELEGGINGSBEHOV
    );

    useEffect(() => {
        const navigerTilVisning = () => {
            setVisningstype(Visningstype.VIS_TILRETTELEGGINGSBEHOV);
        };
        const navigerTilRegistrering = () => {
            setVisningstype(Visningstype.REGISTRER_TILRETTELEGGINGSBEHOV);
        };

        window.addEventListener(visDetaljerEvent, navigerTilVisning);
        window.addEventListener(visRegistreringEvent, navigerTilRegistrering);
        return () => {
            window.removeEventListener(visDetaljerEvent, navigerTilVisning);
            window.removeEventListener(visRegistreringEvent, navigerTilRegistrering);
        };
    }, []);

    return <App viewType={visningstype} />;
};

export default Utvikling;