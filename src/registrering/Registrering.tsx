import React, { FunctionComponent } from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Sidetittel } from 'nav-frontend-typografi';
import Kategori from './Kategori';

export const visDetaljerEvent = 'veilarbmaofs.visDetaljer';

interface Props {
    fnr: string;
}

const Registrering: FunctionComponent<Props> = ({ fnr }) => {
    const navigerTilVisningsside = () => {
        dispatchEvent(new Event(visDetaljerEvent));
    };

    const lagreBehov = () => {
        console.log('lagrer behov');
    };

    return (
        <>
            <Knapp onClick={navigerTilVisningsside}>Tilbake til detaljer</Knapp>
            <Sidetittel>Registrer tilretteleggingsbehov</Sidetittel>
            <section>
                Før du registrerer behovene, må du ha hatt en dialog med brukeren. Brukeren vil
                kunne se disse opplysningene.
            </section>
            <section>
                <Kategori
                    kategori="Arbeidstid"
                    beskrivelse="Behov for tilrettelegging av arbeidstiden"
                    alternativer={['Alternativ 1', 'Alternativ 2']}
                />
                <Hovedknapp onClick={lagreBehov}>Lagre behov</Hovedknapp>
            </section>
        </>
    );
};

export default Registrering;
