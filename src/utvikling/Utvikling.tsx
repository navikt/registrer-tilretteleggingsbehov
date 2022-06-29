import React, { FunctionComponent, useEffect, useState } from 'react';
import { Heading } from '@navikt/ds-react';
import App, { Visningstype } from '../App';
import { etFnr } from '../mock/testdata';
import { visDetaljerEvent, visRegistreringEvent } from '../utils/navigering';
import css from './Utvikling.module.css';

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

    const wrapperClassName =
        visningstype === Visningstype.VisTilretteleggingsbehov
            ? css.simulertEkspanderbartPanel
            : undefined;

    return (
        <div className={css.utvikling}>
            <Heading size="medium" level="1">
                Utviklingsapp for tilretteleggingsbehov
            </Heading>
            <div className={wrapperClassName}>
                <App viewType={visningstype} fnr={etFnr} />
            </div>
        </div>
    );
};

export default Utvikling;
