import React, { FunctionComponent } from 'react';
import { Undertittel, Element } from 'nav-frontend-typografi';
import { Checkbox } from 'nav-frontend-skjema';

interface Props {
    kategori: string;
    beskrivelse: string;
    alternativer: string[];
}

const Kategori: FunctionComponent<Props> = ({ kategori, beskrivelse, alternativer }) => {
    return (
        <div key={kategori}>
            <Undertittel>{kategori}</Undertittel>
            <Element>{beskrivelse}</Element>
            {alternativer.map(alternativ => (
                <Checkbox key={alternativ} label={alternativ} />
            ))}
        </div>
    );
};

export default Kategori;
