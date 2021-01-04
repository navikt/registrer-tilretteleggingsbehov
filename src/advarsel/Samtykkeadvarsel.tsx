import React, { FunctionComponent } from 'react';
import { Samtykkestatus, Status } from '../api/Rest';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import './Samtykkeadvarsel.less';

interface Props {
    samtykke: Samtykkestatus;
}

const SamtykkeAdvarsel: FunctionComponent<Props> = ({ samtykke }) => {
    if (samtykke === Status.IkkeFunnet) {
        return (
            <AlertStripe type="advarsel" className="Samtykkeadvarsel">
                <Normaltekst className="blokk-s">
                    Brukeren må informeres om NAVs behandlingsgrunnlag, og vil derfor ikke være
                    synlig i kandidatsøket.
                </Normaltekst>
                <Normaltekst>Be brukeren om å:</Normaltekst>
                <ol className="Samtykkeadvarsel__liste">
                    <li>logge inn på arbeidsplassen.no</li>
                    <li>lese teksten om at du må dele CV-en med NAV</li>
                    <li>gå videre og gjennomføre det tjenesten ber om</li>
                </ol>
            </AlertStripe>
        );
    } else {
        return <></>;
    }
};

export default SamtykkeAdvarsel;
