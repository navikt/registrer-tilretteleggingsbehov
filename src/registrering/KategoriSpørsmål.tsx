import React, { FunctionComponent } from 'react';
import { Undertittel, Element } from 'nav-frontend-typografi';
import { Checkbox } from 'nav-frontend-skjema';
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
        <div key={kategori}>
            <Undertittel>{tittel}</Undertittel>
            <Element>{beskrivelse}</Element>
            {alternativer.map((alternativ: Alternativ) => (
                <Checkbox
                    key={alternativ.behov}
                    label={alternativ.label}
                    checked={valgteBehov.includes(alternativ.behov)}
                    onChange={() => toggleAlternativ(alternativ.behov)}
                />
            ))}
        </div>
    );
};

export default KategoriSpørsmål;
