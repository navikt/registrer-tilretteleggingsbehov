import React, { FunctionComponent } from 'react';
import { BodyShort } from '@navikt/ds-react';
import Behovgruppe from './Behovgruppe';
import { formaterDato } from '../utils/datoUtils';
import { Kandidat } from '../api/Kandidat';
import { hentTeksterForValgteBehov } from '../api/tilretteleggingsbehov';
import { Kategori } from '../api/Behov';
import css from './Visning.module.css';

interface Props {
    kandidat: Kandidat;
}

const Visning: FunctionComponent<Props> = ({ kandidat }) => {
    return (
        <>
            <BodyShort>
                Sist endret: {formaterDato(new Date(kandidat.sistEndretAvVeileder))}
            </BodyShort>
            <div className={css.behovkategorier}>
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
        </>
    );
};

export default Visning;
