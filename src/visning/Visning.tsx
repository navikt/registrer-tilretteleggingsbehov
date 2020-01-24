import Behovgruppe from './Behovgruppe';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { hentKandidat } from '../api/api';
import { RestKandidat, Status } from '../api/RestKandidat';

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

    if (kandidat.status !== Status.Suksess) {
        return null;
    }

    return (
        <>
            <button onClick={navigerTilRegistreringsside}>registrer</button>
            <Behovgruppe
                overskrift="Fysisk tilrettelegging"
                beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                behov={kandidat.data.fysiskeBehov}
            />
            <Behovgruppe
                overskrift="Arbeidshverdagen"
                beskrivelse="Behov for tilpasninger i arbeidshverdagen"
                behov={kandidat.data.arbeidsmiljøBehov}
            />
            <Behovgruppe
                overskrift="Utfordringer med norsk"
                beskrivelse="Kandidaten har utfordringer med å:"
                behov={kandidat.data.grunnleggendeBehov}
            />
        </>
    );
};

export default Visning;
