import React, { FunctionComponent } from 'react';
import { Alert, BodyShort } from '@navikt/ds-react';
import { RestArbeidssøker, Samtykkestatus, Status } from '../api/Rest';
import css from './Advarsel.module.css';

enum Variant {
    IngenJobbprofil = 'Kandidaten har ikke jobbprofil',
    IngenCv = 'Kandidaten har ikke CV',
    ManglerSamtykke = 'Kandidaten har ikke blitt informert om NAVs behandlingsgrunnlag',
}

interface Props {
    arbeidssøker: RestArbeidssøker;
    samtykke: Samtykkestatus;
}

const Advarsel: FunctionComponent<Props> = ({ arbeidssøker, samtykke }) => {
    if (
        arbeidssøker.status === Status.Feil &&
        arbeidssøker.statusKode === 403 &&
        samtykke === Status.Suksess
    ) {
        return (
            <Alert variant="warning">Du har ikke tilgang til å se informasjon om brukeren.</Alert>
        );
    }

    let advarsel = [];

    if (arbeidssøker.status === Status.Suksess) {
        if (!arbeidssøker.data.harCv) {
            advarsel.push(Variant.IngenCv);
        }
        if (!arbeidssøker.data.harJobbprofil) {
            advarsel.push(Variant.IngenJobbprofil);
        }
    }

    if (samtykke === Status.IkkeFunnet) {
        advarsel.push(Variant.ManglerSamtykke);
    }

    if (advarsel.length === 0) {
        return null;
    } else {
        return (
            <Alert variant="warning" className={css.advarsel}>
                <BodyShort>
                    Brukeren er ikke synlig i kandidatsøket i Rekrutteringsbistand.
                </BodyShort>
                <BodyShort>Årsak er:</BodyShort>
                <ul className={css.liste}>
                    {advarsel.map((melding) => (
                        <BodyShort as="li" key={melding}>
                            {melding}
                        </BodyShort>
                    ))}
                </ul>
                {advarsel.includes(Variant.ManglerSamtykke) && (
                    <>
                        <BodyShort>Be brukeren om å:</BodyShort>
                        <ol className={css.liste}>
                            <BodyShort as="li">logge inn på arbeidsplassen.no</BodyShort>
                            <BodyShort as="li">
                                lese teksten om at du må dele CV-en med NAV
                            </BodyShort>
                            <BodyShort as="li">
                                gå videre og gjennomføre det tjenesten ber om
                            </BodyShort>
                        </ol>
                    </>
                )}
            </Alert>
        );
    }
};

export default Advarsel;
