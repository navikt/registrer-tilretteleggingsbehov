import { ArbeidsmijøBehov, ArbeidstidBehov, FysiskBehov, GrunnleggendeBehov } from './Behov';

interface Kandidat {
    aktørId: string;
    fnr: string;
    sistEndret: string;
    sistEndretAv: string;
    navKontor: string;
    arbeidstidBehov: ArbeidstidBehov[];
    fysiskeBehov: FysiskBehov[];
    arbeidsmiljøBehov: ArbeidsmijøBehov[];
    grunnleggendeBehov: GrunnleggendeBehov[];
}

export interface NyKandidat {
    aktørId: string;
    arbeidstidBehov: ArbeidstidBehov[];
    fysiskeBehov: FysiskBehov[];
    arbeidsmiljøBehov: ArbeidsmijøBehov[];
    grunnleggendeBehov: GrunnleggendeBehov[];
}

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
