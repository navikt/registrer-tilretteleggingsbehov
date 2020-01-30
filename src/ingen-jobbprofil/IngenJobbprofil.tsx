import React, { FunctionComponent } from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Jobbprofilstatus, Status } from '../api/RestKandidat';

interface Props {
    status: Jobbprofilstatus;
}

const IngenJobbprofil: FunctionComponent<Props> = ({ status }) =>
    status === Status.IkkeFunnet ? (
        <AlertStripeAdvarsel>
            Brukeren har ikke jobbprofil, og vil derfor ikke være synlig i kandidatsøket.
        </AlertStripeAdvarsel>
    ) : null;

export default IngenJobbprofil;
