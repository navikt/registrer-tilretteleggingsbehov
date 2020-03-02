import React, { FunctionComponent } from 'react';
import { Behov } from '../../api/Behov';
import { Checkbox, CheckboxGruppe } from 'nav-frontend-skjema';
import { Behovtekst, hentTekster } from '../../api/Behovtekster';
import { Kategori } from '../../api/Kategori';
import { Undertittel } from 'nav-frontend-typografi';
import './KategoriSpørsmål.less';

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
    const alternativer = hentTekster(kategori);

    const toggleAlternativ = (behov: Behov) => {
        onChange(
            valgteBehov.includes(behov)
                ? valgteBehov.filter(b => b !== behov)
                : [...valgteBehov, behov]
        );
    };

    return (
        <section className="kategori-spørsmål">
            <Undertittel className="blokk-xxs">{tittel}</Undertittel>
            <CheckboxGruppe legend={beskrivelse}>
                {alternativer.map((alternativ: Behovtekst) => (
                    <div className="kategori-spørsmål__checkbox" key={alternativ.behov}>
                        <Checkbox
                            label={alternativ.label}
                            checked={valgteBehov.includes(alternativ.behov)}
                            onChange={() => toggleAlternativ(alternativ.behov)}
                            aria-describedby={alternativ.behov + '_hjelpetekst'}
                        />
                        {alternativ.hjelpetekst && (
                            <div
                                id={alternativ.behov + '_hjelpetekst'}
                                className="kategori-spørsmål__hjelpetekst"
                            >
                                {alternativ.hjelpetekst}
                            </div>
                        )}
                    </div>
                ))}
            </CheckboxGruppe>
        </section>
    );
};

export default KategoriSpørsmål;
