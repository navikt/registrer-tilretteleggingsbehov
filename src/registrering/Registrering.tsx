import React, { FunctionComponent, useEffect, useState } from 'react';
import { Feilmelding, Ingress, Sidetittel } from 'nav-frontend-typografi';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';

import {
    Arbeidshverdagen,
    Arbeidstid,
    Behov,
    Fysisk,
    UtfordringerMedNorsk,
    Kategori,
} from '../api/Behov';
import { ikkeLastet, lasterInn, RestKandidat, Status } from '../api/Rest';
import { KandidatDto } from '../api/Kandidat';
import { navigerTilVisningsside } from '../utils/navigering';
import { opprettKandidat } from '../api/api';
import Alertstripe from 'nav-frontend-alertstriper';
import GiTilbakemelding from '../gi-tilbakemelding/GiTilbakemelding';
import KategoriSpørsmål from './kategori-spørsmål/KategoriSpørsmål';
import Tilbakeknapp from '../tilbakeknapp/Tilbakeknapp';
import './Registrering.less';

interface Props {
    fnr: string;
}

const Registrering: FunctionComponent<Props> = ({ fnr }) => {
    const [arbeidstid, setArbeidstid] = useState<Behov[]>([]);
    const [fysisk, setFysisk] = useState<Behov[]>([]);
    const [arbeidshverdagen, setArbeidshverdagen] = useState<Behov[]>([]);
    const [utfordringerMedNorsk, setUtfordringerMedNorsk] = useState<Behov[]>([]);
    const [skalViseIngenValgteBehovFeil, setSkalViseIngenValgteBehovFeil] = useState<boolean>(
        false
    );

    const [respons, setRespons] = useState<RestKandidat>(ikkeLastet);

    useEffect(() => {
        setSkalViseIngenValgteBehovFeil(false);
    }, [arbeidstid, fysisk, arbeidshverdagen, utfordringerMedNorsk]);

    useEffect(() => {
        if (respons.status === Status.Suksess) {
            navigerTilVisningsside();
        }
    }, [respons]);

    const harIngenValgteBehov = () => {
        return (
            arbeidstid.length === 0 &&
            fysisk.length === 0 &&
            arbeidshverdagen.length === 0 &&
            utfordringerMedNorsk.length === 0
        );
    };

    const lagreBehov = async () => {
        if (respons.status === Status.LasterInn) return;

        if (harIngenValgteBehov()) {
            setSkalViseIngenValgteBehovFeil(true);
            return;
        }

        const kandidat: KandidatDto = {
            fnr,
            arbeidstid: arbeidstid as Arbeidstid[],
            fysisk: fysisk as Fysisk[],
            arbeidshverdagen: arbeidshverdagen as Arbeidshverdagen[],
            utfordringerMedNorsk: utfordringerMedNorsk as UtfordringerMedNorsk[],
        };

        setRespons(lasterInn);
        const responsFraRegistrering: RestKandidat = await opprettKandidat(kandidat);
        setRespons(responsFraRegistrering);
    };

    return (
        <div className="registrering">
            <main className="registrering__innhold">
                <Tilbakeknapp />
                <Sidetittel className="blokk-xxs">Registrer behov for tilrettelegging</Sidetittel>
                <Ingress className="registrering__ingress">
                    Registrer bare brukere som har behov for tilrettelegging for å kunne jobbe. Du
                    skal ikke registrere brukere som har problemer med å få seg jobb av andre
                    årsaker (etnisitet, religion, hull i CV-en m.m.).
                </Ingress>
                <Alertstripe className="blokk-s" type="info">
                    Før du registrerer behovene, må du ha hatt en dialog med brukeren. Brukeren vil
                    kunne se det du registrerer under Personopplysninger på Ditt NAV.
                </Alertstripe>
                <form className="registrering__form">
                    <KategoriSpørsmål
                        tittel="Arbeidstid"
                        hjelpetekst="I jobbprofilen må brukeren selv registrere informasjon om arbeidstid, slik som deltid/heltid, kun dagtid, turnus og lignende."
                        beskrivelse="Behov for tilrettelegging av arbeidstiden"
                        valgteBehov={arbeidstid}
                        onChange={setArbeidstid}
                        kategori={Kategori.Arbeidstid}
                    />
                    <KategoriSpørsmål
                        tittel="Fysisk tilrettelegging"
                        beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                        valgteBehov={fysisk}
                        onChange={setFysisk}
                        kategori={Kategori.Fysisk}
                    />
                    <KategoriSpørsmål
                        tittel="Arbeidshverdagen"
                        beskrivelse="Behov for tilpasninger i arbeidshverdagen"
                        valgteBehov={arbeidshverdagen}
                        onChange={setArbeidshverdagen}
                        kategori={Kategori.Arbeidshverdagen}
                    />
                    <KategoriSpørsmål
                        tittel="Utfordringer med norsk"
                        hjelpetekst="For eksempel brukere med lese- og skrivevansker, språk- og taleforstyrrelser eller utfordringer med norsk fordi personen kommer fra et annet land."
                        beskrivelse="Kandidaten har utfordringer med å:"
                        valgteBehov={utfordringerMedNorsk}
                        onChange={setUtfordringerMedNorsk}
                        kategori={Kategori.UtfordringerMedNorsk}
                    />
                    <GiTilbakemelding />
                    <Hovedknapp
                        className="registrering__lagreknapp"
                        onClick={lagreBehov}
                        spinner={respons.status === Status.LasterInn}
                        htmlType="button"
                    >
                        Lagre behov
                    </Hovedknapp>
                    <Knapp onClick={navigerTilVisningsside}>Avbryt</Knapp>
                    {respons.status === Status.Feil ||
                        (respons.status === Status.UkjentFeil && (
                            <Feilmelding className="registrering__feilmelding">
                                Kunne ikke lagre tilretteleggingsbehov
                            </Feilmelding>
                        ))}
                    {skalViseIngenValgteBehovFeil && (
                        <Feilmelding className="registrering__feilmelding">
                            Du må velge minst ett behov
                        </Feilmelding>
                    )}
                </form>
            </main>
        </div>
    );
};

export default Registrering;
