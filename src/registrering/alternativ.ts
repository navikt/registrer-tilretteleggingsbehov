import {
    ArbeidsmijøBehov,
    ArbeidstidBehov,
    Behov,
    FysiskBehov,
    GrunnleggendeBehov,
} from '../api/Behov';
import { Kategori } from './kategori-spørsmål/KategoriSpørsmål';

export type Alternativ = {
    behov: Behov;
    label: string;
    hjelpetekst?: string;
};

export const hentAlternativer = (kategori: Kategori): Alternativ[] => {
    switch (kategori) {
        case 'arbeidstid':
            return arbeidstid;

        case 'fysisk':
            return fysisk;

        case 'arbeidsmiljø':
            return arbeidsmiljø;

        case 'grunnleggende':
            return grunnleggende;

        default:
            return [];
    }
};

const arbeidstid = [
    { behov: ArbeidstidBehov.KanIkkeJobbe, label: 'Kan ikke jobbe nå' },
    { behov: ArbeidstidBehov.Heltid, label: 'Heltid' },
    {
        behov: ArbeidstidBehov.IkkeHeleDager,
        label: 'Kan jobbe hver ukedag, men ikke hele dager',
    },
    {
        behov: ArbeidstidBehov.BorteFasteDagerEllerTider,
        label: 'Må være borte fra jobben til faste dager eller tider',
    },
    { behov: ArbeidstidBehov.Fleksibel, label: 'Må ha fleksible arbeidsdager' },
];

const fysisk = [
    {
        behov: FysiskBehov.Arbeidsstilling,
        label: 'Varierte arbeidsstillinger',
    },
    {
        behov: FysiskBehov.Ergonomi,
        label: 'Ergonomiske tilpasninger',
        hjelpetekst: 'For eksempel hev/senk-pult eller tilpassede lys- eller lydforhold',
    },
    { behov: FysiskBehov.TungeLøft, label: 'Unngå tunge løft' },
    { behov: FysiskBehov.Hørsel, label: 'Hørsel' },
    { behov: FysiskBehov.Syn, label: 'Syn' },
    {
        behov: FysiskBehov.AndreFormer,
        label: 'Andre former for fysisk tilrettelegging',
    },
];

const arbeidsmiljø = [
    {
        behov: ArbeidsmijøBehov.TilrettelagtOpplæring,
        label: 'Tilrettelagt opplæring',
        hjelpetekst: 'For eksempel hyppige tilbakemeldinger eller lengre opplæringsperiode',
    },
    {
        behov: ArbeidsmijøBehov.TilrettelagteArbeidsoppgaver,
        label: 'Tilrettelagte arbeidsoppgaver',
        hjelpetekst: 'For eksempel tydelige oppgaver eller unntak fra noen typer oppgaver',
    },
    {
        behov: ArbeidsmijøBehov.Mentor,
        label: 'Mentor',
        hjelpetekst: 'En egen person med ansvar for tett oppfølging',
    },
    { behov: ArbeidsmijøBehov.Annet, label: 'Andre former for tilrettelegging' },
];

const grunnleggende = [
    {
        behov: GrunnleggendeBehov.SnakkeNorsk,
        label: 'Snakke norsk',
    },
    {
        behov: GrunnleggendeBehov.SkriveNorsk,
        label: 'Skrive norsk',
    },
    {
        behov: GrunnleggendeBehov.LeseNorsk,
        label: 'Lese norsk',
    },
    {
        behov: GrunnleggendeBehov.RegningOgTallforståelse,
        label: 'Regning og tallforståelse',
    },
    { behov: GrunnleggendeBehov.AndreUtfordringer, label: 'Andre utfordringer' },
];
