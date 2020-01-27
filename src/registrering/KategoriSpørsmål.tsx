import React, { FunctionComponent } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { Alternativ, hentAlternativer } from './alternativ';
import { Behov } from '../api/Behov';

export type Kategori = 'arbeidstid' | 'fysisk' | 'arbeidsmiljø' | 'grunnleggende';

interface Props {
    tittel: string;
    beskrivelse: string;
    valgteBehov: Behov[];
    onChange: (behov: Behov[]) => void;
    kategori: Kategori;
}

const KategoriSpørsmål: FunctionComponent<Props> = ({
    tittel,
    beskrivelse,
    valgteBehov,
    onChange,
    kategori,
}) => {
    const alternativer = hentAlternativer(kategori);

    const toggleAlternativ = (behov: Behov) => {
        onChange(
            valgteBehov.includes(behov)
                ? valgteBehov.filter(b => b !== behov)
                : [...valgteBehov, behov]
        );
    };

    return (
        <section>
            <Undertittel>{tittel}</Undertittel>
            <CheckboxGruppe legend={beskrivelse}>
                {alternativer.map((alternativ: Alternativ) => (
                    <Checkbox
                        key={alternativ.behov}
                        label={alternativ.label}
                        checked={valgteBehov.includes(alternativ.behov)}
                        onChange={() => toggleAlternativ(alternativ.behov)}
                    />
                ))}
            </CheckboxGruppe>
        </section>
    );
};

export default KategoriSpørsmål;
