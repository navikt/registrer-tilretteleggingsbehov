import { Arbeidshverdagen, Arbeidstid, Fysisk } from '../api/Behov';
import { Kandidat } from '../api/Kandidat';

export const etFnr = '12345678901';

export const enKandidat: Kandidat = {
    aktørId: '4943247287476',
    fnr: etFnr,
    sistEndretAvVeileder: '2019-09-22T20:38:53.312Z',
    sistEndretAv: 'J337738',
    arbeidstid: [Arbeidstid.IkkeHeleDager, Arbeidstid.Fleksibel],
    fysisk: [Fysisk.Ergonomi, Fysisk.Arbeidsstilling, Fysisk.UniversellUtforming],
    arbeidshverdagen: [Arbeidshverdagen.PersonligBistand],
    utfordringerMedNorsk: [],
};
