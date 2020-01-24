import { ArbeidsmijøBehov, ArbeidstidBehov, FysiskBehov, GrunnleggendeBehov } from './Behov';

export interface Kandidat {
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
