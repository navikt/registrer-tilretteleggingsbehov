import React, { FunctionComponent } from "react";
import { RestArbeidssøker, Samtykkestatus, Status } from "../api/Rest";
import AlertStripe from "nav-frontend-alertstriper";
import { Normaltekst } from "nav-frontend-typografi";
import "./Advarsel.less";

enum Variant {
    IngenJobbprofil = "Kandidaten har ikke jobbprofil",
    IngenCv = "Kandidaten har ikke CV",
    ManglerSamtykke = "Kandidaten har ikke sett NAVs behandlingsgrunnlag",
}

interface Props {
    arbeidssøker: RestArbeidssøker;
    samtykke: Samtykkestatus;
}

const Advarsel: FunctionComponent<Props> = ({ arbeidssøker, samtykke }) => {
    if (arbeidssøker.status === Status.Feil && arbeidssøker.statusKode === 403) {
        return (
            <AlertStripe type="advarsel">
                Du har ikke tilgang til å se informasjon om brukeren.
            </AlertStripe>
        );
    }

    let advarsel = [];

    const notFoundNoContent = (status: number) => status === 404 || status === 204;
    if (arbeidssøker.status === Status.Feil && notFoundNoContent(arbeidssøker.statusKode)) {
        advarsel.push(Variant.IngenCv);
        advarsel.push(Variant.IngenJobbprofil);
    }

    if (arbeidssøker.status === Status.Suksess && !arbeidssøker.data.jobbprofil) {
        advarsel.push(Variant.IngenJobbprofil);
    }

    if (samtykke === Status.IkkeFunnet) {
        advarsel.push(Variant.ManglerSamtykke);
    }

    if (advarsel.length === 0) {
        return null;
    } else {
        return (
            <AlertStripe type="advarsel" className="Samtykkeadvarsel">
                <Normaltekst className="blokk-s">
                    Brukeren er ikke synlig i kandidatsøket.
                </Normaltekst>
                <Normaltekst>Årsak er:</Normaltekst>
                <ul className="Samtykkeadvarsel__liste">
                    {advarsel.map((melding) => (
                        <li>{melding}</li>
                    ))}
                </ul>
                {advarsel.includes(Variant.ManglerSamtykke) && (
                    <>
                        <Normaltekst>Be brukeren om å:</Normaltekst>
                        <ol className="Samtykkeadvarsel__liste">
                            <li>logge inn på arbeidsplassen.no</li>
                            <li>lese teksten om at du må dele CV-en med NAV</li>
                            <li>gå videre og gjennomføre det tjenesten ber om</li>
                        </ol>
                    </>
                )}
            </AlertStripe>
        );
    }
};

export default Advarsel;
