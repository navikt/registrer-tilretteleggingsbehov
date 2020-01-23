import React, { FunctionComponent } from 'react';

export const visDetaljerEvent = 'veilarbmaofs.visDetaljer';

const Registrering: FunctionComponent = () => {
    const navigerTilVisningsside = () => {
        dispatchEvent(new Event(visDetaljerEvent));
    };

    return (
        <>
            <button onClick={navigerTilVisningsside}>tilbake</button>
            Registrering
        </>
    );
};

export default Registrering;
