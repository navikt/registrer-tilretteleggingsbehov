import React, { FunctionComponent } from 'react';
import { BodyLong, Button } from '@navikt/ds-react';
import { navigerTilRegistreringsside } from '../utils/navigering';
import css from './Introduksjon.module.css';

const Introduksjon: FunctionComponent = () => (
    <>
        <BodyLong className={css.tekst}>
            Har brukeren behov som gjør at tilrettelegging er nødvendig for å kunne være i jobb?
            Mulighetene på arbeidsmarkedet kan bli styrket når du registrerer behov for
            tilrettelegging, fordi behovene kobles sammen med arbeidsgivere som kan tilrettelegge.
        </BodyLong>
        <BodyLong className={css.tekst}>
            Du kan søke fram brukere med behov for tilrettelegging i Rekrutteringsbistand.
        </BodyLong>
        <Button size="medium" onClick={navigerTilRegistreringsside}>
            Registrer
        </Button>
    </>
);

export default Introduksjon;
