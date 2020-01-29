import Behovgruppe from './Behovgruppe';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { hentKandidat } from '../api/api';
import { ikkeLastet, lasterInn, RestKandidat, Status } from '../api/RestKandidat';
import { navigerTilRegistreringsside } from '../utils/navigering';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';

import {
    arbeidstidMapping,
    arbeidsmiljøMapping,
    fysiskMapping,
    grunnleggendeMapping,
    hentBehovtekster,
} from '../api/Behovtekster';

import './Visning.less';

interface Props {
    fnr: string;
}

const Visning: FunctionComponent<Props> = ({ fnr }) => {
    const [kandidat, setKandidat] = useState<RestKandidat>(ikkeLastet);

    useEffect(() => {
        const hent = async () => {
            setKandidat(lasterInn);
            setKandidat(await hentKandidat(fnr));
        };
        hent();
    }, [fnr]);

    if (kandidat.status !== Status.Suksess) {
        return <div></div>;
    }

    const arbeidstidbehov = kandidat.data.arbeidstidBehov.map(_ =>
        hentBehovtekster(_, arbeidstidMapping)
    );
    const fysiskeBehov = kandidat.data.fysiskeBehov.map(_ => hentBehovtekster(_, fysiskMapping));
    const arbeidsmiljøBehov = kandidat.data.arbeidsmiljøBehov.map(_ =>
        hentBehovtekster(_, arbeidsmiljøMapping)
    );
    const grunnleggendeBehov = kandidat.data.grunnleggendeBehov.map(_ =>
        hentBehovtekster(_, grunnleggendeMapping)
    );

    return (
        <div className="visning">
            <div className="sistendret">
                <Normaltekst>Sist endret: {kandidat.data.sistEndret}</Normaltekst>
            </div>
            <div className="visning__behovkategorier">
                <Behovgruppe
                    overskrift="Arbeidstid"
                    beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                    behov={arbeidstidbehov}
                />
                <Behovgruppe
                    overskrift="Fysisk tilrettelegging"
                    beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                    behov={fysiskeBehov}
                />
                <Behovgruppe
                    overskrift="Arbeidshverdagen"
                    beskrivelse="Behov for tilpasninger i arbeidshverdagen"
                    behov={arbeidsmiljøBehov}
                />
                <Behovgruppe
                    overskrift="Utfordringer med norsk"
                    beskrivelse="Kandidaten har utfordringer med å:"
                    behov={grunnleggendeBehov}
                />
            </div>
            <Hovedknapp onClick={navigerTilRegistreringsside}>registrer</Hovedknapp>
        </div>
    );
};

export default Visning;
