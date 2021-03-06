import { Arbeidshverdagen, Arbeidstid, UtfordringerMedNorsk, Fysisk } from './Behov';

export interface Kandidat {
    aktørId: string;
    fnr: string;
    sistEndretAvVeileder: string;
    sistEndretAv: string;
    arbeidstid: Arbeidstid[];
    fysisk: Fysisk[];
    arbeidshverdagen: Arbeidshverdagen[];
    utfordringerMedNorsk: UtfordringerMedNorsk[];
}

export interface KandidatDto {
    fnr: string;
    arbeidstid: Arbeidstid[];
    fysisk: Fysisk[];
    arbeidshverdagen: Arbeidshverdagen[];
    utfordringerMedNorsk: UtfordringerMedNorsk[];
}
