import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    Arbeidshverdagen,
    Arbeidstid,
    Behov,
    FysiskTilrettelegging,
    UtfordringerMedNorsk,
} from '../api/Behov';
import { ikkeLastet, lasterInn, RestKandidat, Status } from '../api/Rest';
import { navigerTilVisningsside } from '../utils/navigering';
import { Feilmelding, Ingress, Sidetittel } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import KategoriSpørsmål, { Kategori } from '../registrering/kategori-spørsmål/KategoriSpørsmål';
import { Kandidat, KandidatDto } from '../api/Kandidat';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { endreKandidat } from '../api/api';
import SlettModal from './slett-modal/SlettModal';
import Tilbakeknapp from '../tilbakeknapp/Tilbakeknapp';
import './Endring.less';
import GiTilbakemelding from '../gi-tilbakemelding/GiTilbakemelding';

interface Props {
    kandidat: Kandidat;
}

const Endring: FunctionComponent<Props> = ({ kandidat }) => {
    const [arbeidstid, setArbeidstid] = useState<Behov[]>(kandidat.arbeidstidBehov);
    const [fysisk, setFysisk] = useState<Behov[]>(kandidat.fysiskeBehov);
    const [arbeidshverdagen, setArbeidhverdagen] = useState<Behov[]>(kandidat.arbeidsmiljøBehov);
    const [utfordringerMedNorsk, setUtfordringerMedNorsk] = useState<Behov[]>(
        kandidat.grunnleggendeBehov
    );

    const [respons, setRespons] = useState<RestKandidat>(ikkeLastet);
    const [visSlettModal, toggleSlettModal] = useState<boolean>(false);

    useEffect(() => {
        if (respons.status === Status.Suksess) {
            navigerTilVisningsside();
        }
    }, [respons]);

    const endreBehov = async () => {
        if (respons.status === Status.LasterInn) return;

        const endring: KandidatDto = {
            fnr: kandidat.fnr,
            arbeidstidBehov: arbeidstid as Arbeidstid[],
            fysiskeBehov: fysisk as FysiskTilrettelegging[],
            arbeidsmiljøBehov: arbeidshverdagen as Arbeidshverdagen[],
            grunnleggendeBehov: utfordringerMedNorsk as UtfordringerMedNorsk[],
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
                    <Knapp onClick={() => toggleSlettModal(true)} mini={true}>
                        Slett
                    </Knapp>
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
                        kategori={Kategori.FysiskTilrettelegging}
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
                    <Knapp onClick={navigerTilVisningsside}>Avbryt</Knapp>
                    {respons.status === Status.Feil ||
                        (respons.status === Status.UkjentFeil && (
                            <Feilmelding>Kunne ikke endre behov for tilrettelegging</Feilmelding>
                        ))}
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
