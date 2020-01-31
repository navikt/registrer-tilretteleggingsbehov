import { Kandidat } from './Kandidat';

export type RestKandidat = IkkeLastet | LasterInn | Suksess | Slettet | Feil | UkjentFeil;
export type Jobbprofilstatus =
    | Status.IkkeLastet
    | Status.Suksess
    | Status.LasterInn
    | Status.IkkeFunnet
    | Status.Feil
    | Status.UkjentFeil;
export type Tilbakemeldingstatus =
    | Status.IkkeLastet
    | Status.LasterInn
    | Status.Suksess
    | Status.Feil
    | Status.UkjentFeil;

export enum Status {
    IkkeLastet,
    LasterInn,
    Suksess,
    Slettet,
    Feil,
    IkkeFunnet,
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

interface Slettet {
    status: Status.Slettet;
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
