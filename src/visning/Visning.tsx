import React, { FunctionComponent, useEffect, useState } from 'react';
import { RestKandidat, Status } from '../api/Kandidat';
import { hentKandidat } from '../api/api';

export const visRegistreringEvent = 'veilarbmaofs.visTilretteleggingsbehov';

interface Props {
    fnr: string;
}

const Visning: FunctionComponent<Props> = ({ fnr }) => {
    const [kandidat, setKandidat] = useState<RestKandidat>({ status: Status.IkkeLastet });

    const navigerTilRegistreringsside = () => {
        dispatchEvent(new Event(visRegistreringEvent));
    };

    useEffect(() => {
        const hent = async () => {
            setKandidat(await hentKandidat(fnr));
        };
        hent();
    }, [fnr]);

    return (
        <>
            <button onClick={navigerTilRegistreringsside}>registrer</button>
            Visning
            {kandidat.status === Status.Suksess && kandidat.data}
        </>
    );
};

export default Visning;
