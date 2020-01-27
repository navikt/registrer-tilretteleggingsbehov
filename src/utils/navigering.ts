export const visRegistreringEvent = 'veilarbmaofs.visTilretteleggingsbehov';
export const visDetaljerEvent = 'veilarbmaofs.visDetaljer';

export const navigerTilRegistreringsside = () => {
    dispatchEvent(new Event(visRegistreringEvent));
};

export const navigerTilVisningsside = () => {
    dispatchEvent(new Event(visDetaljerEvent));
};
