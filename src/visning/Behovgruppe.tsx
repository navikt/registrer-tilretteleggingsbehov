import React, { FunctionComponent } from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';

interface Props {
    overskrift: String,
    beskrivelse: String,
    behov: String[]
}
const Behovgruppe: FunctionComponent<Props> = ({ overskrift, beskrivelse, behov }) => {

    return (
        <section className="blokk-xs">
            <Element>{overskrift}</Element>
            <Normaltekst>{beskrivelse}</Normaltekst>
            {behov.map(b => (
                <Normaltekst>{b}</Normaltekst>
            ))}
        </section>

    );
};

export default Behovgruppe;