import Behovgruppe from './Behovgruppe';
import { formaterDato } from '../utils/datoUtils';
import React, { FunctionComponent } from 'react';
import { navigerTilRegistreringsside } from '../utils/navigering';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { RestArbeidssøker } from '../api/Rest';
import Advarsel from '../advarsel/Advarsel';
import { Kandidat } from '../api/Kandidat';
import { hentTeksterForBehov } from '../api/Behovtekster';
import './Visning.less';
import { Kategori } from '../api/Kategori';

interface Props {
    kandidat: Kandidat;
    arbeidssøker: RestArbeidssøker;
}

const Visning: FunctionComponent<Props> = ({ kandidat, arbeidssøker }) => {
    return (
        <div className="visning">
            <div className="sistendret">
                <Normaltekst className="blokk-s">
                    Sist endret: {formaterDato(new Date(kandidat.sistEndretAvVeileder))}
                </Normaltekst>
            </div>
            <Advarsel arbeidssøker={arbeidssøker} />
            <div className="visning__behovkategorier">
                <Behovgruppe
                    overskrift="Arbeidstid"
                    beskrivelse="Behov for tilrettelegging av arbeidstiden"
                    behov={hentTeksterForBehov(kandidat.arbeidstid, Kategori.Arbeidstid)}
                />
                <Behovgruppe
                    overskrift="Fysisk tilrettelegging"
                    beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                    behov={hentTeksterForBehov(kandidat.fysisk, Kategori.Fysisk)}
                />
                <Behovgruppe
                    overskrift="Arbeidshverdagen"
                    beskrivelse="Behov for tilpasninger i arbeidshverdagen"
                    behov={hentTeksterForBehov(
                        kandidat.arbeidshverdagen,
                        Kategori.Arbeidshverdagen
                    )}
                />
                <Behovgruppe
                    overskrift="Utfordringer med norsk"
                    beskrivelse="Kandidaten har utfordringer med å:"
                    behov={hentTeksterForBehov(
                        kandidat.utfordringerMedNorsk,
                        Kategori.UtfordringerMedNorsk
                    )}
                />
            </div>
            <Hovedknapp mini onClick={navigerTilRegistreringsside}>
                Endre
            </Hovedknapp>
        </div>
    );
};

export default Visning;
