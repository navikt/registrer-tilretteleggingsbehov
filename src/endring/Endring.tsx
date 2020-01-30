import React, { FunctionComponent, useEffect, useState } from 'react';
import {
    ArbeidsmijøBehov,
    ArbeidstidBehov,
    Behov,
    FysiskBehov,
    GrunnleggendeBehov,
} from '../api/Behov';
import { RestKandidat, Status, ikkeLastet, lasterInn } from '../api/RestKandidat';
import Lenke from 'nav-frontend-lenker';
import { navigerTilVisningsside } from '../utils/navigering';
import { VenstreChevron } from 'nav-frontend-chevron';
import { Feilmelding, Sidetittel } from 'nav-frontend-typografi';
import Alertstripe from 'nav-frontend-alertstriper';
import KategoriSpørsmål from '../registrering/kategori-spørsmål/KategoriSpørsmål';
import { Kandidat, KandidatDto } from '../api/Kandidat';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import './Endring.less';
import { endreKandidat } from '../api/api';
import SlettModal from './slett-modal/SlettModal';

interface Props {
    kandidat: Kandidat;
}

const Endring: FunctionComponent<Props> = ({ kandidat }) => {
    const [arbeidstid, setArbeidstid] = useState<Behov[]>(kandidat.arbeidstidBehov);
    const [fysisk, setFysisk] = useState<Behov[]>(kandidat.fysiskeBehov);
    const [arbeidsmiljø, setArbeidsmiljø] = useState<Behov[]>(kandidat.arbeidsmiljøBehov);
    const [grunnleggende, setGrunnleggende] = useState<Behov[]>(kandidat.grunnleggendeBehov);

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
            arbeidstidBehov: arbeidstid as ArbeidstidBehov[],
            fysiskeBehov: fysisk as FysiskBehov[],
            arbeidsmiljøBehov: arbeidsmiljø as ArbeidsmijøBehov[],
            grunnleggendeBehov: grunnleggende as GrunnleggendeBehov[],
        };

        setRespons(lasterInn);
        const responsFraEndring: RestKandidat = await endreKandidat(endring);
        setRespons(responsFraEndring);
    };

    return (
        <div className="endring">
            <main className="endring__innhold">
                <Lenke
                    href=""
                    onClick={e => {
                        e.preventDefault();
                        navigerTilVisningsside();
                    }}
                    className="endring__tilbake"
                >
                    <VenstreChevron />
                    Tilbake til detaljer
                </Lenke>
                <div className="endring__tittel-wrapper">
                    <Sidetittel>Endre tilretteleggingsbehov</Sidetittel>
                    <Knapp onClick={() => toggleSlettModal(true)} mini={true}>
                        Slett
                    </Knapp>
                </div>
                <Alertstripe className="blokk-m" type="info">
                    Før du registrerer behovene, må du ha hatt en dialog med brukeren. Brukeren vil
                    kunne se disse opplysningene.
                </Alertstripe>
                <form className="endring__form">
                    <KategoriSpørsmål
                        tittel="Arbeidstid"
                        beskrivelse="Behov for tilrettelegging av arbeidstiden"
                        valgteBehov={arbeidstid}
                        onChange={setArbeidstid}
                        kategori="arbeidstid"
                    />
                    <KategoriSpørsmål
                        tittel="Fysisk tilrettelegging"
                        beskrivelse="Behov for fysisk tilrettelegging på arbeidsplassen"
                        valgteBehov={fysisk}
                        onChange={setFysisk}
                        kategori="fysisk"
                    />
                    <KategoriSpørsmål
                        tittel="Arbeidsmiljø"
                        beskrivelse="Dersom det er behov for tilrettelegging av arbeidsmiljøet, hvordan bør det tilrettelegges for kandidaten?"
                        valgteBehov={arbeidsmiljø}
                        onChange={setArbeidsmiljø}
                        kategori="arbeidsmiljø"
                    />
                    <KategoriSpørsmål
                        tittel="Grunnleggende ferdigheter"
                        beskrivelse="Har kandidaten utfordringer med noe av dette?"
                        valgteBehov={grunnleggende}
                        onChange={setGrunnleggende}
                        kategori="grunnleggende"
                    />
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
                            <Feilmelding>Kunne ikke endre tilretteleggingsbehov</Feilmelding>
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
