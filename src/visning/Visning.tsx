import Behovgruppe from './Behovgruppe';
import { formaterDato } from '../utils/datoUtils';
import React, { FunctionComponent } from 'react';
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
import { Kandidat } from '../api/Kandidat';
import { Jobbprofilstatus } from '../api/RestKandidat';
import IngenJobbprofil from '../ingen-jobbprofil/IngenJobbprofil';

interface Props {
    kandidat: Kandidat;
    jobbprofilstatus: Jobbprofilstatus;
}

const Visning: FunctionComponent<Props> = ({ kandidat, jobbprofilstatus }) => {
    return (
        <div className="visning">
            <div className="sistendret">
                <Normaltekst className="blokk-s">
                    Sist endret: {formaterDato(new Date(kandidat.sistEndret))}
                </Normaltekst>
            </div>
            <IngenJobbprofil status={jobbprofilstatus} />
            <div className="visning__behovkategorier">
                <Behovgruppe
                    overskrift="Arbeidstid"
                    beskrivelse="Behov for tilrettelegging av arbeidstiden"
                    behov={arbeidstidTekster(kandidat.arbeidstidBehov)}
                />
                <Behovgruppe
                    overskrift="Arbeidsmiljø"
                    beskrivelse="Behov for tilpasninger av arbeidsmiljøet"
                    behov={arbeidsmiljøTekster(kandidat.arbeidsmiljøBehov)}
                />
                <Behovgruppe
                    overskrift="Fysisk tilrettelegging"
                    beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                    behov={fysiskTekster(kandidat.fysiskeBehov)}
                />
                <Behovgruppe
                    overskrift="Grunnleggende ferdigheter"
                    beskrivelse="Kandidaten har utfordringer med:"
                    behov={grunnleggendeTekster(kandidat.grunnleggendeBehov)}
                />
            </div>
            <Hovedknapp mini onClick={navigerTilRegistreringsside}>
                Endre
            </Hovedknapp>
        </div>
    );
};

export default Visning;
