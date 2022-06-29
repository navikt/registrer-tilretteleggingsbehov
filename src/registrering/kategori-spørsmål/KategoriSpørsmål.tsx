import React, { FunctionComponent } from 'react';
import { BodyLong, Checkbox, CheckboxGroup, Detail, Heading } from '@navikt/ds-react';
import { Behov, Kategori } from '../../api/Behov';
import { Behovtekst, hentTekster } from '../../api/tilretteleggingsbehov';
import './KategoriSpørsmål.less';

interface Props {
    tittel: string;
    hjelpetekst?: string;
    beskrivelse: string;
    valgteBehov: Behov[];
    onChange: (behov: Behov[]) => void;
    kategori: Kategori;
}

const KategoriSpørsmål: FunctionComponent<Props> = ({
    tittel,
    beskrivelse,
    hjelpetekst,
    valgteBehov,
    onChange,
    kategori,
}) => {
    const alternativer = hentTekster(kategori);

    const toggleAlternativ = (behov: Behov) => {
        onChange(
            valgteBehov.includes(behov)
                ? valgteBehov.filter((b) => b !== behov)
                : [...valgteBehov, behov]
        );
    };

    return (
        <section className="kategori-spørsmål">
            <Heading level="3" size="medium">
                {tittel}
            </Heading>
            {hjelpetekst && (
                <BodyLong className="kategori-spørsmål__kategorihjelpetekst">
                    {hjelpetekst}
                </BodyLong>
            )}

            <CheckboxGroup legend={beskrivelse}>
                {alternativer.map((alternativ: Behovtekst) => (
                    <div className="kategori-spørsmål__checkbox" key={alternativ.behov}>
                        <Checkbox
                            checked={valgteBehov.includes(alternativ.behov)}
                            onChange={() => toggleAlternativ(alternativ.behov)}
                            aria-describedby={alternativ.behov + '_hjelpetekst'}
                        >
                            {alternativ.beskrivelse}
                        </Checkbox>
                        {alternativ.hjelpetekst && (
                            <Detail
                                size="small"
                                id={alternativ.behov + '_hjelpetekst'}
                                className="kategori-spørsmål__hjelpetekst"
                            >
                                {alternativ.hjelpetekst}
                            </Detail>
                        )}
                    </div>
                ))}
            </CheckboxGroup>
        </section>
    );
};

export default KategoriSpørsmål;
