import React, { FunctionComponent } from 'react';
import { RestArbeidssøker, Status } from '../api/Rest';
import Ikon from 'nav-frontend-ikoner-assets';
import { Element } from 'nav-frontend-typografi';
import './Advarsel.less';

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
        return (
            <div className="advarsel blokk-s">
                <Ikon kind="advarsel-sirkel-fyll" size="1.5em" />
                <Element>{advarsel}</Element>
            </div>
        );
    }
};

export default Advarsel;
