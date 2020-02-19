import React, { FunctionComponent, useEffect, useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Feilmelding, Sidetittel } from 'nav-frontend-typografi';
import KategoriSpørsmål, { Kategori } from './kategori-spørsmål/KategoriSpørsmål';
import {
    Arbeidshverdagen,
    Arbeidstid,
    Behov,
    FysiskTilrettelegging,
    UtfordringerMedNorsk,
} from '../api/Behov';
import { navigerTilVisningsside } from '../utils/navigering';
import { KandidatDto } from '../api/Kandidat';
import { opprettKandidat } from '../api/api';
import { ikkeLastet, lasterInn, RestKandidat, Status } from '../api/Rest';
import Alertstripe from 'nav-frontend-alertstriper';
import Tilbakeknapp from '../tilbakeknapp/Tilbakeknapp';
import './Registrering.less';
import GiTilbakemelding from '../gi-tilbakemelding/GiTilbakemelding';

interface Props {
    fnr: string;
}

const Registrering: FunctionComponent<Props> = ({ fnr }) => {
    const [arbeidstid, setArbeidstid] = useState<Behov[]>([]);
    const [fysisk, setFysisk] = useState<Behov[]>([]);
    const [arbeidshverdagen, setArbeidshverdagen] = useState<Behov[]>([]);
    const [utfordringerMedNorsk, setUtfordringerMedNorsk] = useState<Behov[]>([]);

    const [respons, setRespons] = useState<RestKandidat>(ikkeLastet);

    useEffect(() => {
        if (respons.status === Status.Suksess) {
            navigerTilVisningsside();
        }
    }, [respons]);

    const lagreBehov = async () => {
        if (respons.status === Status.LasterInn) return;

        const kandidat: KandidatDto = {
            fnr,
            arbeidstidBehov: arbeidstid as Arbeidstid[],
            fysiskeBehov: fysisk as FysiskTilrettelegging[],
            arbeidsmiljøBehov: arbeidshverdagen as Arbeidshverdagen[],
            grunnleggendeBehov: utfordringerMedNorsk as UtfordringerMedNorsk[],
        };

        setRespons(lasterInn);
        const responsFraRegistrering: RestKandidat = await opprettKandidat(kandidat);
        setRespons(responsFraRegistrering);
    };

    return (
        <div className="registrering">
            <main className="registrering__innhold">
                <Tilbakeknapp />
                <Sidetittel className="blokk-m">Registrer behov for tilrettelegging</Sidetittel>
                <Alertstripe className="blokk-m" type="info">
                    Før du registrerer behovene, må du ha hatt en dialog med brukeren. Brukeren vil
                    kunne se disse opplysningene.
                </Alertstripe>
                <form className="registrering__form">
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
                        onChange={setArbeidshverdagen}
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
                        onClick={lagreBehov}
                        spinner={respons.status === Status.LasterInn}
                        htmlType="button"
                    >
                        Lagre behov
                    </Hovedknapp>
                    {respons.status === Status.Feil ||
                        (respons.status === Status.UkjentFeil && (
                            <Feilmelding>Kunne ikke lagre tilretteleggingsbehov</Feilmelding>
                        ))}
                </form>
            </main>
        </div>
    );
};

export default Registrering;
