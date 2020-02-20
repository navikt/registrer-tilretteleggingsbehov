import React, { FunctionComponent } from 'react';
import { Normaltekst, Element } from 'nav-frontend-typografi';
import { Alternativtekster } from '../api/Behovtekster';

interface Props {
    overskrift: String;
    beskrivelse: String;
    behov: Alternativtekster[];
}

const Behovgruppe: FunctionComponent<Props> = ({ overskrift, beskrivelse, behov }) => {
    return (
        <section className="visning__behovgruppe">
            <Element>{overskrift}</Element>
            <Normaltekst>{beskrivelse}</Normaltekst>
            {behov.length ? (
                <ul className="visning__behovliste">
                    {behov.map(behov => (
                        <li key={behov.label}>
                            <Normaltekst>{behov.label}</Normaltekst>
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
