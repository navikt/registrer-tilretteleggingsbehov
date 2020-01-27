import React, { FunctionComponent, useState } from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import KategoriSpørsmål from './KategoriSpørsmål';
import { Behov } from '../api/Behov';

export const visDetaljerEvent = 'veilarbmaofs.visDetaljer';

interface Props {
    fnr: string;
}

const Registrering: FunctionComponent<Props> = ({ fnr }) => {
    const [arbeidstid, setArbeidstid] = useState<Behov[]>([]);
    const [fysisk, setFysisk] = useState<Behov[]>([]);
    const [arbeidsmiljø, setArbeidsmiljø] = useState<Behov[]>([]);
    const [grunnleggende, setGrunnleggende] = useState<Behov[]>([]);

    const navigerTilVisningsside = () => {
        dispatchEvent(new Event(visDetaljerEvent));
    };

    const lagreBehov = () => {
        console.log('lagrer behov');
    };

    return (
        <>
            <Knapp onClick={navigerTilVisningsside}>Tilbake til detaljer</Knapp>
            <Sidetittel>Registrer tilretteleggingsbehov</Sidetittel>
            <section>
                Før du registrerer behovene, må du ha hatt en dialog med brukeren. Brukeren vil
                kunne se disse opplysningene.
            </section>
            <section>
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
                <Hovedknapp onClick={lagreBehov}>Lagre behov</Hovedknapp>
            </section>
        </>
    );
};

export default Registrering;
