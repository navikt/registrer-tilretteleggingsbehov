import React, { FunctionComponent, useEffect, useState } from 'react';
import App, { Visningstype } from '../App';
import { visDetaljerEvent } from '../registrering/Registrering';
import { visRegistreringEvent } from '../visning/Visning';

const Utvikling: FunctionComponent = () => {
    const [visningstype, setVisningstype] = useState<Visningstype>(
        Visningstype.VisTilretteleggingsbehov
    );

    useEffect(() => {
        const navigerTilVisning = () => {
            setVisningstype(Visningstype.VisTilretteleggingsbehov);
        };
        const navigerTilRegistrering = () => {
            setVisningstype(Visningstype.RegistrerTilretteleggingsbehov);
        };

        window.addEventListener(visDetaljerEvent, navigerTilVisning);
        window.addEventListener(visRegistreringEvent, navigerTilRegistrering);
        return () => {
            window.removeEventListener(visDetaljerEvent, navigerTilVisning);
            window.removeEventListener(visRegistreringEvent, navigerTilRegistrering);
        };
    }, []);

    return <App viewType={visningstype} fnr={'12345678901'} />;
};

export default Utvikling;
