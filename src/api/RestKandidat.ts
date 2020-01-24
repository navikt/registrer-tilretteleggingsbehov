import { Kandidat } from './Kandidat';

export type RestKandidat = IkkeLastet | LasterInn | SenderInn | Suksess | Feil;

export enum Status {
    'IkkeLastet',
    'LasterInn',
    'SenderInn',
    'Suksess',
    'Feil',
}

interface IkkeLastet {
    status: Status.IkkeLastet;
}

interface LasterInn {
    status: Status.LasterInn;
}

interface SenderInn {
    status: Status.SenderInn;
    data: Kandidat;
}

interface Suksess {
    status: Status.Suksess;
    data: Kandidat;
}

interface Feil {
    status: Status.Feil;
    error: string;
}
