import React, { FunctionComponent } from 'react';
import { RestArbeidssøker, Status } from '../api/Rest';
import AlertStripe from 'nav-frontend-alertstriper';

enum Variant {
    IngenAdvarsel,
    IngenJobbprofil = 'Brukeren har ikke jobbprofil, og vil derfor ikke være synlig i kandidatsøket.',
    VerkenCvEllerJobbprofil = 'Brukeren har verken CV eller jobbprofil, og vil derfor ikke være synlig i kandidatsøket.',
    VeilederHarIkkeTilgang = 'Brukeren er ikke tilgjengelig i kandidatsøket.',
}

interface Props {
    arbeidssøker: RestArbeidssøker;
}

const Advarsel: FunctionComponent<Props> = ({ arbeidssøker }) => {
    let advarsel = Variant.IngenAdvarsel;

    if (arbeidssøker.status === Status.Suksess && !arbeidssøker.data.jobbprofil) {
        advarsel = Variant.IngenJobbprofil;
    }

    if (arbeidssøker.status === Status.Feil && arbeidssøker.statusKode === 403) {
        advarsel = Variant.VeilederHarIkkeTilgang;
    }

    const notFoundNoContent = (status: number) => status === 404 || status === 204;
    if (arbeidssøker.status === Status.Feil && notFoundNoContent(arbeidssøker.statusKode)) {
        advarsel = Variant.VerkenCvEllerJobbprofil;
    }

    if (advarsel === Variant.IngenAdvarsel) {
        return null;
    } else {
        return <AlertStripe type="advarsel">{advarsel}</AlertStripe>;
    }
};

export default Advarsel;
