import React, { FunctionComponent, useEffect, useState } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Feilmelding, Sidetittel } from 'nav-frontend-typografi';
import KategoriSpørsmål from './kategori-spørsmål/KategoriSpørsmål';
import {
    ArbeidsmijøBehov,
    ArbeidstidBehov,
    Behov,
    FysiskBehov,
    GrunnleggendeBehov,
} from '../api/Behov';
import { navigerTilVisningsside } from '../utils/navigering';
import { KandidatDto } from '../api/Kandidat';
import { opprettKandidat } from '../api/api';
import { RestKandidat, Status, ikkeLastet, lasterInn } from '../api/Rest';
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
    const [arbeidsmiljø, setArbeidsmiljø] = useState<Behov[]>([]);
    const [grunnleggende, setGrunnleggende] = useState<Behov[]>([]);

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
            arbeidstidBehov: arbeidstid as ArbeidstidBehov[],
            fysiskeBehov: fysisk as FysiskBehov[],
            arbeidsmiljøBehov: arbeidsmiljø as ArbeidsmijøBehov[],
            grunnleggendeBehov: grunnleggende as GrunnleggendeBehov[],
        };

        setRespons(lasterInn);
        const responsFraRegistrering: RestKandidat = await opprettKandidat(kandidat);
        setRespons(responsFraRegistrering);
    };

    return (
        <div className="registrering">
            <main className="registrering__innhold">
                <Tilbakeknapp />
                <Sidetittel className="blokk-m">Registrer tilretteleggingsbehov</Sidetittel>
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
                        beskrivelse="Behov for tilpasning av arbeidsmiljøet"
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
