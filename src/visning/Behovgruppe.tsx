import React, { FunctionComponent } from 'react';
import { Behovtekst } from '../api/tilretteleggingsbehov';
import { BodyShort, Heading } from '@navikt/ds-react';
import visningCss from './Visning.module.css';

interface Props {
    overskrift: String;
    beskrivelse: String;
    behov: Behovtekst[];
}

const Behovgruppe: FunctionComponent<Props> = ({ overskrift, beskrivelse, behov }) => {
    return (
        <section className={visningCss.behovgruppe}>
            <Heading level="3" size="small" className={visningCss.behovgruppetittel}>
                {overskrift}
            </Heading>
            <BodyShort>{beskrivelse}</BodyShort>
            {behov.length ? (
                <ul className={visningCss.behovliste}>
                    {behov.map((behov) => (
                        <BodyShort as="li" key={behov.beskrivelse}>
                            {behov.beskrivelse}
                        </BodyShort>
                    ))}
                </ul>
            ) : (
                <BodyShort className={visningCss.ingenbehov}>Ingen registrerte behov</BodyShort>
            )}
        </section>
    );
};

export default Behovgruppe;
