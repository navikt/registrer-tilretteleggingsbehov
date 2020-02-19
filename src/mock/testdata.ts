import { Arbeidstid, FysiskTilrettelegging, UtfordringerMedNorsk } from '../api/Behov';
import { Kandidat } from '../api/Kandidat';

export const etFnr = '12345678901';

export const enKandidat: Kandidat = {
    aktørId: '4943247287476',
    fnr: etFnr,
    sistEndret: '2019-09-22T20:38:53.312Z',
    sistEndretAv: 'J337738',
    navKontor: '1001',
    arbeidstidBehov: [Arbeidstid.IkkeHeleDager, Arbeidstid.Fleksibel],
    fysiskeBehov: [FysiskTilrettelegging.Arbeidsstilling],
    arbeidsmiljøBehov: [],
    grunnleggendeBehov: [UtfordringerMedNorsk.Skrive, UtfordringerMedNorsk.Snakke],
};
