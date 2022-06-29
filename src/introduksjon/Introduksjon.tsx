import React, { FunctionComponent } from 'react';
import { BodyLong, Button } from '@navikt/ds-react';
import { navigerTilRegistreringsside } from '../utils/navigering';
import './Introduksjon.less';

const Introduksjon: FunctionComponent = () => (
    <>
        <BodyLong className="introduksjon__tekst">
            Har brukeren behov som gjør at tilrettelegging er nødvendig for å kunne være i jobb?
            Mulighetene på arbeidsmarkedet kan bli styrket når du registrerer behov for
            tilrettelegging, fordi behovene kobles sammen med arbeidsgivere som kan tilrettelegge.
        </BodyLong>
        <BodyLong className="introduksjon__tekst">
            Du kan søke fram brukere med behov for tilrettelegging i Rekrutteringsbistand.
        </BodyLong>
        <Button size="small" onClick={navigerTilRegistreringsside}>
            Registrer
        </Button>
    </>
);

export default Introduksjon;
