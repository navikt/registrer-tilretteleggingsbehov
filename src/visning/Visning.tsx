import Behovgruppe from './Behovgruppe';
import { formaterDato } from '../utils/datoUtils';
import {
    ikkeLastet as jobbprofilIkkelastet,
    lasterInn as jobbprofilLasterInn,
    ikkeFunnet as jobbprofilIkkeFunnet,
    RestJobbprofil,
} from '../api/RestJobbprofil';
import { hentJobbprofilstatus } from '../api/JobbprofilApi';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { navigerTilRegistreringsside } from '../utils/navigering';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst } from 'nav-frontend-typografi';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

import {
    arbeidstidTekster,
    fysiskTekster,
    grunnleggendeTekster,
    arbeidsmiljøTekster,
} from '../api/Behovtekster';

import './Visning.less';
import { Kandidat } from '../api/Kandidat';

interface Props {
    kandidat: Kandidat;
}

const Visning: FunctionComponent<Props> = ({ kandidat }) => {
    const [jobbprofilstatus, setJobbprofilstatus] = useState<RestJobbprofil>(jobbprofilIkkelastet);

    useEffect(() => {
        const hentJobbprofil = async () => {
            setJobbprofilstatus(jobbprofilLasterInn);
            setJobbprofilstatus(await hentJobbprofilstatus(kandidat.aktørId));
        };
        hentJobbprofil();
    }, [kandidat.aktørId]);

    return (
        <div className="visning">
            <div className="sistendret">
                <Normaltekst>
                    Sist endret: {formaterDato(new Date(kandidat.sistEndret))}
                </Normaltekst>
            </div>
            {jobbprofilstatus.status === jobbprofilIkkeFunnet.status && (
                <AlertStripeAdvarsel className="visning__jobbprofiladvarsel">
                    Brukeren har ikke jobbprofil, og vil derfor ikke være synlig i kandidatsøket.
                </AlertStripeAdvarsel>
            )}
            <div className="visning__behovkategorier">
                <Behovgruppe
                    overskrift="Arbeidstid"
                    beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                    behov={arbeidstidTekster(kandidat.arbeidstidBehov)}
                />
                <Behovgruppe
                    overskrift="Arbeidshverdagen"
                    beskrivelse="Behov for tilpasninger i arbeidshverdagen"
                    behov={arbeidsmiljøTekster(kandidat.arbeidsmiljøBehov)}
                />
                <Behovgruppe
                    overskrift="Fysisk tilrettelegging"
                    beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                    behov={fysiskTekster(kandidat.fysiskeBehov)}
                />
                <Behovgruppe
                    overskrift="Utfordringer med norsk"
                    beskrivelse="Kandidaten har utfordringer med å:"
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
