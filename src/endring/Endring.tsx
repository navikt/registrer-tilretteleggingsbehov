import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    Arbeidshverdagen,
    Arbeidstid,
    Behov,
    UtfordringerMedNorsk,
    Fysisk,
    Kategori,
} from '../api/Behov';
import { ikkeLastet, lasterInn, RestKandidat, Status } from '../api/Rest';
import { navigerTilVisningsside } from '../utils/navigering';
import { Feilmelding, Ingress, Sidetittel } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import KategoriSpørsmål from '../registrering/kategori-spørsmål/KategoriSpørsmål';
import { Kandidat, KandidatDto } from '../api/Kandidat';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { endreKandidat } from '../api/api';
import SlettModal from './slett-modal/SlettModal';
import Tilbakeknapp from '../tilbakeknapp/Tilbakeknapp';
import GiTilbakemelding from '../gi-tilbakemelding/GiTilbakemelding';
import './Endring.less';

interface Props {
    kandidat: Kandidat;
}

const Endring: FunctionComponent<Props> = ({ kandidat }) => {
    const [arbeidstid, setArbeidstid] = useState<Behov[]>(kandidat.arbeidstid);
    const [fysisk, setFysisk] = useState<Behov[]>(kandidat.fysisk);
    const [arbeidshverdagen, setArbeidhverdagen] = useState<Behov[]>(kandidat.arbeidshverdagen);
    const [utfordringerMedNorsk, setUtfordringerMedNorsk] = useState<Behov[]>(
        kandidat.utfordringerMedNorsk
    );
    const [skalViseIngenValgteBehovFeil, setSkalViseIngenValgteBehovFeil] = useState<boolean>(
        false
    );

    const [respons, setRespons] = useState<RestKandidat>(ikkeLastet);
    const [visSlettModal, toggleSlettModal] = useState<boolean>(false);

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

    const endreBehov = async () => {
        if (respons.status === Status.LasterInn) return;

        if (harIngenValgteBehov()) {
            setSkalViseIngenValgteBehovFeil(true);
            return;
        }

        const endring: KandidatDto = {
            fnr: kandidat.fnr,
            arbeidstid: arbeidstid as Arbeidstid[],
            fysisk: fysisk as Fysisk[],
            arbeidshverdagen: arbeidshverdagen as Arbeidshverdagen[],
            utfordringerMedNorsk: utfordringerMedNorsk as UtfordringerMedNorsk[],
        };

        setRespons(lasterInn);
        const responsFraEndring: RestKandidat = await endreKandidat(endring);
        setRespons(responsFraEndring);
    };

    return (
        <div className="endring">
            <main className="endring__innhold">
                <div className="endring__tilbake-og-slett">
                    <Tilbakeknapp />
                </div>
                <Sidetittel className="blokk-xxs">Endre behov for tilrettelegging</Sidetittel>
                <Ingress className="endring__ingress">
                    Registrer bare brukere som har behov for tilrettelegging for å kunne jobbe. Du
                    skal ikke registrere brukere som har problemer med å få seg jobb av andre
                    årsaker (etnisitet, religion, hull i CV-en m.m.).
                </Ingress>
                <Alertstripe className="blokk-s" type="info">
                    Før du registrerer behovene, må du ha hatt en dialog med brukeren. Brukeren vil
                    kunne se det du registrerer under Personopplysninger på Ditt NAV.
                </Alertstripe>
                <form className="endring__form">
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
                        onChange={setArbeidhverdagen}
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
                        onClick={endreBehov}
                        spinner={respons.status === Status.LasterInn}
                        htmlType="button"
                        className="endring__lagreknapp"
                    >
                        Lagre endringer
                    </Hovedknapp>
                    <Knapp
                        onClick={() => toggleSlettModal(true)}
                        className="endring__slettknapp"
                        htmlType="button"
                    >
                        Slett
                    </Knapp>
                    <Knapp onClick={navigerTilVisningsside} className="endring__avbrytknapp">
                        Avbryt
                    </Knapp>
                    {respons.status === Status.Feil ||
                        (respons.status === Status.UkjentFeil && (
                            <Feilmelding className="registrering__feilmelding">
                                Kunne ikke endre behov for tilrettelegging
                            </Feilmelding>
                        ))}
                    {skalViseIngenValgteBehovFeil && (
                        <Feilmelding className="registrering__feilmelding">
                            Du må velge minst ett behov
                        </Feilmelding>
                    )}
                </form>
            </main>
            <SlettModal
                erÅpen={visSlettModal}
                fnr={kandidat.fnr}
                lukk={() => toggleSlettModal(false)}
            />
        </div>
    );
};

export default Endring;
