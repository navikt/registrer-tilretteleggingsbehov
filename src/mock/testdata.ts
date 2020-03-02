import { Fysisk } from './../api/Behov';
import { Arbeidstid, UtfordringerMedNorsk } from '../api/Behov';
import { Kandidat } from '../api/Kandidat';

export const etFnr = '12345678901';

export const enKandidat: Kandidat = {
    aktørId: '4943247287476',
    fnr: etFnr,
    sistEndretAvVeileder: '2019-09-22T20:38:53.312Z',
    sistEndretAv: 'J337738',
    navKontor: '1001',
    arbeidstid: [Arbeidstid.IkkeHeleDager, Arbeidstid.Fleksibel],
    fysisk: [Fysisk.Ergonomi, Fysisk.Arbeidsstilling, Fysisk.UniversellUtforming],
    arbeidshverdagen: [],
    utfordringerMedNorsk: [UtfordringerMedNorsk.Skrive, UtfordringerMedNorsk.Snakke],
};
