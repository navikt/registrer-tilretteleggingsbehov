import { Kandidat } from './Kandidat';

export type RestKandidat = IkkeLastet | LasterInn | Suksess | Feil | UkjentFeil;

export enum Status {
    IkkeLastet,
    LasterInn,
    Suksess,
    Feil,
    UkjentFeil,
}

interface IkkeLastet {
    status: Status.IkkeLastet;
}

interface LasterInn {
    status: Status.LasterInn;
}

interface Suksess {
    status: Status.Suksess;
    data: Kandidat;
}

interface Feil {
    status: Status.Feil;
    statusKode: number;
}

interface UkjentFeil {
    status: Status.UkjentFeil;
}

export const ikkeLastet: IkkeLastet = { status: Status.IkkeLastet };
export const lasterInn: LasterInn = { status: Status.LasterInn };
export const ukjentFeil: UkjentFeil = { status: Status.UkjentFeil };
