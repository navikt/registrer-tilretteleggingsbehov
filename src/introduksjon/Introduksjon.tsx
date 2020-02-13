import React, { FunctionComponent } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Hovedknapp } from 'nav-frontend-knapper';
import { navigerTilRegistreringsside } from '../utils/navigering';
import './Introduksjon.less';

const Introduksjon: FunctionComponent = () => (
    <>
        <Normaltekst className="introduksjon__tekst">
            Har brukeren behov som gjør at tilrettelegging er nødvendig for å kunne være i jobb?
            Mulighetene på arbeidsmarkedet kan bli styrket når du registrerer behov for
            tilrettelegging, fordi behovene kobles sammen med arbeidsgivere som kan tilrettelegge.
        </Normaltekst>
        <Normaltekst className="introduksjon__tekst">
            Du kan søke fram brukere med behov for tilrettelegging i Rekrutteringsbistand.
        </Normaltekst>
        <Hovedknapp mini onClick={navigerTilRegistreringsside}>
            Registrer
        </Hovedknapp>
    </>
);

export default Introduksjon;
