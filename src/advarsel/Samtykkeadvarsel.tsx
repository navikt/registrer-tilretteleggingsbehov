import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Samtykkestatus, Status } from '../api/Rest';
import { hentSamtykke } from '../api/api';
import AlertStripe from 'nav-frontend-alertstriper';

interface Props {
    aktørId: string;
}

const SamtykkeAdvarsel: FunctionComponent<Props> = ({aktørId}) => {

    const [samtykke, setSamtykke] = useState<Samtykkestatus>(Status.IkkeLastet);

    const finnSamtykke = useCallback(async () => {
        setSamtykke(Status.LasterInn);
        setSamtykke(await hentSamtykke(aktørId));
    }, [aktørId]);

    useEffect(() => {
        finnSamtykke();
    }, [finnSamtykke]);

    if (samtykke === Status.IkkeFunnet) {
        return (
            <AlertStripe type="advarsel">
                Brukeren må informeres om NAVs behandlingsgrunnlag, og vil derfor ikke være synlig i kandidatsøket.
                <p> Be brukeren om å:</p>
                <ol>
                    <li>logge inn på arbeidsplassen.no</li>
                    <li>lese teksten om at du må dele CV-en med NAV</li>
                    <li>gå videre og gjennomføre det tjenesten ber om</li>
                </ol>
            </AlertStripe>
        )
    } else {
        return ( <></>)
    }
};

export default SamtykkeAdvarsel;
