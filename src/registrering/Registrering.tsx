import React, { FunctionComponent, useState } from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
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
import { NyKandidat } from '../api/Kandidat';
import { opprettKandidat } from '../api/api';
import { RestKandidat, Status } from '../api/RestKandidat';
import Alertstripe from 'nav-frontend-alertstriper';
import './Registrering.less';

interface Props {
    fnr: string;
}

const Registrering: FunctionComponent<Props> = ({ fnr }) => {
    const [arbeidstid, setArbeidstid] = useState<Behov[]>([]);
    const [fysisk, setFysisk] = useState<Behov[]>([]);
    const [arbeidsmiljø, setArbeidsmiljø] = useState<Behov[]>([]);
    const [grunnleggende, setGrunnleggende] = useState<Behov[]>([]);
    const [status, setStatus] = useState<Status>(Status.IkkeLastet);

    const lagreBehov = async () => {
        if (status === Status.LasterInn) return;

        const kandidat: NyKandidat = {
            fnr,
            arbeidstidBehov: arbeidstid as ArbeidstidBehov[],
            fysiskeBehov: fysisk as FysiskBehov[],
            arbeidsmiljøBehov: arbeidsmiljø as ArbeidsmijøBehov[],
            grunnleggendeBehov: grunnleggende as GrunnleggendeBehov[],
        };

        setStatus(Status.LasterInn);
        const respons: RestKandidat = await opprettKandidat(kandidat);
        setStatus(respons.status);
    };

    return (
        <div className="registrering">
            <main className="registrering__innhold">
                <Knapp onClick={navigerTilVisningsside} className="registrering__tilbake">
                    Tilbake til detaljer
                </Knapp>
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
                        spinner={status === Status.LasterInn}
                        htmlType="button"
                    >
                        Lagre behov
                    </Hovedknapp>
                    {status === Status.Feil ||
                        (status === Status.UkjentFeil && (
                            <Feilmelding>Kunne ikke lagre behov</Feilmelding>
                        ))}
                </form>
            </main>
        </div>
    );
};

export default Registrering;
