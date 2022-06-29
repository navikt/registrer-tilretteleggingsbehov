import React, { FunctionComponent } from 'react';
import { BodyShort, Button } from '@navikt/ds-react';
import Behovgruppe from './Behovgruppe';
import { formaterDato } from '../utils/datoUtils';
import { navigerTilRegistreringsside } from '../utils/navigering';
import { RestArbeidssøker, Samtykkestatus } from '../api/Rest';
import Advarsel from '../advarsel/Advarsel';
import { Kandidat } from '../api/Kandidat';
import { hentTeksterForValgteBehov } from '../api/tilretteleggingsbehov';
import { Kategori } from '../api/Behov';
import './Visning.less';

interface Props {
    kandidat: Kandidat;
    arbeidssøker: RestArbeidssøker;
    samtykke: Samtykkestatus;
}

const Visning: FunctionComponent<Props> = ({ kandidat, arbeidssøker, samtykke }) => {
    return (
        <>
            <BodyShort>
                Sist endret: {formaterDato(new Date(kandidat.sistEndretAvVeileder))}
            </BodyShort>
            <Advarsel arbeidssøker={arbeidssøker} samtykke={samtykke} />
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
            <Button variant="primary" size="medium" onClick={navigerTilRegistreringsside}>
                Endre
            </Button>
        </>
    );
};

export default Visning;
