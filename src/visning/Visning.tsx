import Behovgruppe from './Behovgruppe';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { hentKandidat } from '../api/api';
import { RestKandidat, Status } from '../api/RestKandidat';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';

import './Visning.less'

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
        return <div></div>;
    }

    return (
        <div className="visning">
            <div className="sistendret">
                <Normaltekst>Sist endret: {kandidat.data.sistEndret}</Normaltekst>
            </div>
            <div className="visning__behovkategorier">
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
            </div>
            <Hovedknapp className="naviger" onClick={navigerTilRegistreringsside}>registrer</Hovedknapp>
        </div>
    );
};

export default Visning;
