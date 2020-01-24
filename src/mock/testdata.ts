import { ArbeidstidBehov, FysiskBehov, GrunnleggendeBehov } from '../api/Behov';

export const etFnr = '12345678901';

export const enKandidat = {
    aktørId: '4943247287476',
    fnr: etFnr,
    sistEndret: '2019-09-22T20:38:53.312Z',
    sistEndretAv: 'J337738',
    navKontor: '1001',
    arbeidstidBehov: ArbeidstidBehov.IkkeHeleDager,
    fysiskeBehov: [FysiskBehov.Arbeidsstilling],
    arbeidsmiljøBehov: [],
    grunnleggendeBehov: [GrunnleggendeBehov.SkriveNorsk],
};
