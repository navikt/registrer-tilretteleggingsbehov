import Behovgruppe from './Behovgruppe';
import { formaterDato } from '../utils/datoUtils';
import React, { FunctionComponent } from 'react';
import { navigerTilRegistreringsside } from '../utils/navigering';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { RestArbeidssøker, Samtykkestatus } from '../api/Rest';
import Advarsel from '../advarsel/Advarsel';
import { Kandidat } from '../api/Kandidat';
import { hentTeksterForValgteBehov } from '../api/tilretteleggingsbehov';
import './Visning.less';
import { Kategori } from '../api/Behov';
import SamtykkeAdvarsel from '../advarsel/Samtykkeadvarsel';

interface Props {
    kandidat: Kandidat;
    arbeidssøker: RestArbeidssøker;
    samtykke: Samtykkestatus;
}

const Visning: FunctionComponent<Props> = ({ kandidat, arbeidssøker, samtykke }) => {
    return (
        <div className="visning">
            <div className="sistendret">
                <Normaltekst className="blokk-s">
                    Sist endret: {formaterDato(new Date(kandidat.sistEndretAvVeileder))}
                </Normaltekst>
            </div>

            <div className="visning__advarsler">
                <Advarsel arbeidssøker={arbeidssøker} />
                <SamtykkeAdvarsel samtykke={samtykke} />
            </div>
            <div className="visning__behovkategorier">
                <Behovgruppe
                    overskrift="Arbeidstid"
                    beskrivelse="Behov for tilrettelegging av arbeidstiden"
                    behov={hentTeksterForValgteBehov(Kategori.Arbeidstid, kandidat.arbeidstid)}
                />
                <Behovgruppe
                    overskrift="Fysisk tilrettelegging"
                    beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                    behov={hentTeksterForValgteBehov(Kategori.Fysisk, kandidat.fysisk)}
                />
                <Behovgruppe
                    overskrift="Arbeidshverdagen"
                    beskrivelse="Behov for tilpasninger i arbeidshverdagen"
                    behov={hentTeksterForValgteBehov(
                        Kategori.Arbeidshverdagen,
                        kandidat.arbeidshverdagen
                    )}
                />
                <Behovgruppe
                    overskrift="Utfordringer med norsk"
                    beskrivelse="Kandidaten har utfordringer med å:"
                    behov={hentTeksterForValgteBehov(
                        Kategori.UtfordringerMedNorsk,
                        kandidat.utfordringerMedNorsk
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
