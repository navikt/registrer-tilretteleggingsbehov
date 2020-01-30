export type RestJobbprofil = Suksess | IkkeLastet | LasterInn | IkkeFunnet | Feil | UkjentFeil;

export enum Status {
    Suksess,
    LasterInn,
    IkkeFunnet,
    Feil,
    UkjentFeil,
    IkkeLastet,
}

interface IkkeLastet {
    status: Status.IkkeLastet;
}

interface LasterInn {
    status: Status.LasterInn;
}

interface Suksess {
    status: Status.Suksess;
}

interface IkkeFunnet {
    status: Status.IkkeFunnet;
}
interface Feil {
    status: Status.Feil;
    statusKode: number;
}

interface UkjentFeil {
    status: Status.UkjentFeil;
}

export const ikkeFunnet: IkkeFunnet = { status: Status.IkkeFunnet };
export const suksess: Suksess = { status: Status.Suksess };
export const ukjentFeil: UkjentFeil = { status: Status.UkjentFeil };
export const ikkeLastet: IkkeLastet = { status: Status.IkkeLastet };
export const lasterInn: LasterInn = { status: Status.LasterInn };
