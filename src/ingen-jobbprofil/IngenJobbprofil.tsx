import React, { FunctionComponent } from 'react';
import { Jobbprofilstatus, Status } from '../api/RestKandidat';
import Ikon from 'nav-frontend-ikoner-assets';
import { Element } from 'nav-frontend-typografi';
import './IngenJobbprofil.less';

interface Props {
    status: Jobbprofilstatus;
}

const IngenJobbprofil: FunctionComponent<Props> = ({ status }) =>
    status === Status.IkkeFunnet ? (
        <div className="ingen-jobbprofil blokk-s">
            <Ikon kind="advarsel-sirkel-fyll" size="1.5em" />
            <Element>
                Brukeren har ikke jobbprofil, og vil derfor ikke være synlig i kandidatsøket.
            </Element>
        </div>
    ) : null;

export default IngenJobbprofil;
