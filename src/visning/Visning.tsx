import Behovgruppe from './Behovgruppe';
import { formaterDato } from '../utils/datoUtils';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { hentKandidat } from '../api/api';
import { ikkeLastet, lasterInn, RestKandidat, Status } from '../api/RestKandidat';
import { navigerTilRegistreringsside } from '../utils/navigering';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';

import {
    arbeidstidTekster,
    fysiskTekster,
    grunnleggendeTekster,
    arbeidsmiljøTekster,
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

    return (
        <div className="visning">
            <div className="sistendret">
                <Normaltekst>
                    Sist endret: {formaterDato(new Date(kandidat.data.sistEndret))}
                </Normaltekst>
            </div>
            <div className="visning__behovkategorier">
                <Behovgruppe
                    overskrift="Arbeidstid"
                    beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                    behov={arbeidstidTekster(kandidat.data.arbeidstidBehov)}
                />
                <Behovgruppe
                    overskrift="Arbeidshverdagen"
                    beskrivelse="Behov for tilpasninger i arbeidshverdagen"
                    behov={arbeidsmiljøTekster(kandidat.data.arbeidsmiljøBehov)}
                />
                <Behovgruppe
                    overskrift="Fysisk tilrettelegging"
                    beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                    behov={fysiskTekster(kandidat.data.fysiskeBehov)}
                />
                <Behovgruppe
                    overskrift="Utfordringer med norsk"
                    beskrivelse="Kandidaten har utfordringer med å:"
                    behov={grunnleggendeTekster(kandidat.data.grunnleggendeBehov)}
                />
            </div>
            <Hovedknapp onClick={navigerTilRegistreringsside}>endre</Hovedknapp>
        </div>
    );
};

export default Visning;
