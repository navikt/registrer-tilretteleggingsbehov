import React, { FunctionComponent } from 'react';
import Behovgruppe from './Behovgruppe';

export const visRegistreringEvent = 'veilarbmaofs.visTilretteleggingsbehov';

const Visning: FunctionComponent = () => {
    const navigerTilRegistreringsside = () => {
        dispatchEvent(new Event(visRegistreringEvent));
    };

    interface Props {

    }

    const overskrift = 'overskrift';
    const beskrivelse = 'beskrivelse';
    const behov = ['behov1', 'behov2'];

    return (
        <>
            <button onClick={navigerTilRegistreringsside}>registrer</button>
            <Behovgruppe overskrift={overskrift} beskrivelse={beskrivelse} behov={behov} />
        </>
    );
};

export default Visning;
