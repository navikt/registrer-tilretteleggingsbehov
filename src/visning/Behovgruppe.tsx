import React, { FunctionComponent } from 'react';
import { Behovtekst } from '../api/tilretteleggingsbehov';
import { BodyShort, Heading } from '@navikt/ds-react';

interface Props {
    overskrift: String;
    beskrivelse: String;
    behov: Behovtekst[];
}

const Behovgruppe: FunctionComponent<Props> = ({ overskrift, beskrivelse, behov }) => {
    return (
        <section className="visning__behovgruppe">
            <Heading level="3" size="small" className="visning__behovgruppetittel">
                {overskrift}
            </Heading>
            <BodyShort>{beskrivelse}</BodyShort>
            {behov.length ? (
                <ul className="visning__behovliste">
                    {behov.map((behov) => (
                        <BodyShort as="li" key={behov.beskrivelse}>
                            {behov.beskrivelse}
                        </BodyShort>
                    ))}
                </ul>
            ) : (
                <BodyShort className="visning__ingenbehov">Ingen registrerte behov</BodyShort>
            )}
        </section>
    );
};

export default Behovgruppe;
