import React, { FunctionComponent } from 'react';

export const visRegistreringEvent = 'veilarbmaofs.visTilretteleggingsbehov';

const Visning: FunctionComponent = () => {
    const navigerTilRegistreringsside = () => {
        dispatchEvent(new Event(visRegistreringEvent));
    };

    return (
        <>
            <button onClick={navigerTilRegistreringsside}>registrer</button>
            Visning
        </>
    );
};

export default Visning;
