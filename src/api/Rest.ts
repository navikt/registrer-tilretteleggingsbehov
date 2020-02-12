import { Kandidat } from './Kandidat';
import { CvOgJobbprofil } from './cvOgJobbprofilApi';

export type RestKandidat = IkkeLastet | LasterInn | Suksess<Kandidat> | Slettet | Feil | UkjentFeil;
export type RestCvOgJobbprofil =
    | IkkeLastet
    | LasterInn
    | Suksess<CvOgJobbprofil>
    | Feil
    | UkjentFeil;

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

interface Suksess<T> {
    status: Status.Suksess;
    data: T;
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
