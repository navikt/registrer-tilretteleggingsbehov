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
import { RestKandidat, Status, ikkeLastet, lasterInn } from '../api/RestKandidat';
import Alertstripe from 'nav-frontend-alertstriper';
import Lenke from 'nav-frontend-lenker';
import { VenstreChevron } from 'nav-frontend-chevron';
import './Registrering.less';

interface Props {
    fnr: string;
    setRegistrertKandidat: (kandidat: RestKandidat) => void;
}

const Registrering: FunctionComponent<Props> = ({ fnr, setRegistrertKandidat }) => {
    const [arbeidstid, setArbeidstid] = useState<Behov[]>([]);
    const [fysisk, setFysisk] = useState<Behov[]>([]);
    const [arbeidsmiljø, setArbeidsmiljø] = useState<Behov[]>([]);
    const [grunnleggende, setGrunnleggende] = useState<Behov[]>([]);

    const [respons, setRespons] = useState<RestKandidat>(ikkeLastet);

    useEffect(() => {
        if (respons.status === Status.Suksess) {
            setRegistrertKandidat(respons);
            navigerTilVisningsside();
        }
    }, [respons, setRegistrertKandidat]);

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
                <Lenke
                    href=""
                    onClick={e => {
                        e.preventDefault();
                        navigerTilVisningsside();
                    }}
                    className="registrering__tilbake"
                >
                    <VenstreChevron />
                    Tilbake til detaljer
                </Lenke>
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
