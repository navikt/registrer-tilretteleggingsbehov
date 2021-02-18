import React, { FunctionComponent, useEffect, useState } from 'react';
import App, { Visningstype } from '../App';
import { etFnr } from '../mock/testdata';
import { visDetaljerEvent, visRegistreringEvent } from '../utils/navigering';
import { Innholdstittel } from 'nav-frontend-typografi';
import './Utvikling.less';
import Modal from 'nav-frontend-modal';

Modal.setAppElement(document.getElementById('registrer-tilretteleggingsbehov-utvikling'));

const Utvikling: FunctionComponent = () => {
    const [visningstype, setVisningstype] = useState<Visningstype>(
        Visningstype.VisTilretteleggingsbehov,
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

    const className = `utvikling__${
        visningstype === Visningstype.VisTilretteleggingsbehov ? 'vis' : 'registrer'
    }`;

    return (
        <div className='utvikling'>
            <Innholdstittel>Utviklingsapp for tilretteleggingsbehov</Innholdstittel>
            <div className={className}>
                <App viewType={visningstype} fnr={etFnr} />
            </div>
        </div>
    );
};

export default Utvikling;
