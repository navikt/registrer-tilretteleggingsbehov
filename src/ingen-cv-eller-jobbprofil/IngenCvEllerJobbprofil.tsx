import React, { FunctionComponent } from 'react';
import { RestCvOgJobbprofil, Status } from '../api/Rest';
import Ikon from 'nav-frontend-ikoner-assets';
import { Element } from 'nav-frontend-typografi';
import './IngenCvEllerJobbprofil.less';

enum Advarsel {
    IngenAdvarsel,
    IngenJobbprofil = 'Brukeren har ikke jobbprofil, og vil derfor ikke være synlig i kandidatsøket.',
    HverkenCvEllerJobbprofil = 'Brukeren har hverken CV eller jobbprofil, og vil derfor ikke være synlig i kandidatsøket.',
}

interface Props {
    cvOgJobbprofil: RestCvOgJobbprofil;
}

const IngenCvEllerJobbprofil: FunctionComponent<Props> = ({ cvOgJobbprofil }) => {
    let advarsel = Advarsel.IngenAdvarsel;

    console.log(cvOgJobbprofil);

    if (cvOgJobbprofil.status === Status.Suksess && !cvOgJobbprofil.data.jobbprofil) {
        advarsel = Advarsel.IngenJobbprofil;
    }

    const notFoundNoContent = (status: number) => status === 404 || status === 204;
    if (cvOgJobbprofil.status === Status.Feil && notFoundNoContent(cvOgJobbprofil.statusKode)) {
        advarsel = Advarsel.HverkenCvEllerJobbprofil;
    }

    if (advarsel === Advarsel.IngenAdvarsel) {
        return null;
    } else {
        return (
            <div className="ingen-cv-eller-jobbprofil blokk-s">
                <Ikon kind="advarsel-sirkel-fyll" size="1.5em" />
                <Element>{advarsel}</Element>
            </div>
        );
    }
};

export default IngenCvEllerJobbprofil;
