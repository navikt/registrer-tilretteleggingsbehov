import React, { FunctionComponent } from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { Behovtekst } from '../api/tilretteleggingsbehov';

interface Props {
    overskrift: String;
    beskrivelse: String;
    behov: Behovtekst[];
}

const Behovgruppe: FunctionComponent<Props> = ({ overskrift, beskrivelse, behov }) => {
    return (
        <section className="visning__behovgruppe">
            <Element>{overskrift}</Element>
            <Normaltekst>{beskrivelse}</Normaltekst>
            {behov.length ? (
                <ul className="visning__behovliste">
                    {behov.map(behov => (
                        <li key={behov.beskrivelse}>
                            <Normaltekst>{behov.beskrivelse}</Normaltekst>
                        </li>
                    ))}
                </ul>
            ) : (
                <Normaltekst className="visning__ingenbehov">Ingen registrerte behov</Normaltekst>
            )}
        </section>
    );
};

export default Behovgruppe;
