import Behovgruppe from './Behovgruppe';
import { formaterDato } from '../utils/datoUtils';
import React, { FunctionComponent } from 'react';
import { navigerTilRegistreringsside } from '../utils/navigering';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';

import {
    arbeidstidTekster,
    fysiskTekster,
    utfordringerMedNorskTekster,
    arbeidshverdagenTekster,
} from '../api/Behovtekster';
import { RestArbeidssøker } from '../api/Rest';
import Advarsel from '../advarsel/Advarsel';
import { Kandidat } from '../api/Kandidat';
import './Visning.less';

interface Props {
    kandidat: Kandidat;
    arbeidssøker: RestArbeidssøker;
}

const Visning: FunctionComponent<Props> = ({ kandidat, arbeidssøker }) => {
    return (
        <div className="visning">
            <div className="sistendret">
                <Normaltekst className="blokk-s">
                    Sist endret: {formaterDato(new Date(kandidat.sistEndret))}
                </Normaltekst>
            </div>
            <Advarsel arbeidssøker={arbeidssøker} />
            <div className="visning__behovkategorier">
                <Behovgruppe
                    overskrift="Arbeidstid"
                    beskrivelse="Behov for tilrettelegging av arbeidstiden"
                    behov={arbeidstidTekster(kandidat.arbeidstid)}
                />
                <Behovgruppe
                    overskrift="Arbeidshverdagen"
                    beskrivelse="Behov for tilpasninger i arbeidshverdagen"
                    behov={arbeidshverdagenTekster(kandidat.arbeidshverdagen)}
                />
                <Behovgruppe
                    overskrift="Fysisk tilrettelegging"
                    beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                    behov={fysiskTekster(kandidat.fysisk)}
                />
                <Behovgruppe
                    overskrift="Utfordringer med norsk"
                    beskrivelse="Kandidaten har utfordringer med å:"
                    behov={utfordringerMedNorskTekster(kandidat.utfordringerMedNorsk)}
                />
            </div>
            <Hovedknapp mini onClick={navigerTilRegistreringsside}>
                Endre
            </Hovedknapp>
        </div>
    );
};

export default Visning;
