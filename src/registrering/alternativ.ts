import { Fysisk } from './../api/Behov';
import { Behov, Arbeidstid, Arbeidshverdagen, UtfordringerMedNorsk } from '../api/Behov';
import { Kategori } from './kategori-spørsmål/KategoriSpørsmål';

export type Alternativ = {
    behov: Behov;
    label: string;
    hjelpetekst?: string;
};

export const hentAlternativer = (kategori: Kategori): Alternativ[] => {
    switch (kategori) {
        case Kategori.Arbeidstid:
            return arbeidstid;

        case Kategori.Fysisk:
            return fysisk;

        case Kategori.Arbeidshverdagen:
            return arbeidshverdagen;

        case Kategori.UtfordringerMedNorsk:
            return utfordringerMedNorsk;

        default:
            return [];
    }
};

const arbeidstid: Alternativ[] = [
    {
        behov: Arbeidstid.IkkeHeleDager,
        label: 'Kan jobbe hver ukedag, men ikke hele dager',
    },
    {
        behov: Arbeidstid.BorteFasteDagerEllerTider,
        label: 'Må være borte fra jobben til faste dager eller tider',
    },
    { behov: Arbeidstid.GradvisØkning, label: 'Ønsker gradvis økning av stillingsprosenten' },
    { behov: Arbeidstid.Fleksibel, label: 'Må ha fleksible arbeidsdager' },
];

const fysisk: Alternativ[] = [
    {
        behov: Fysisk.Ergonomi,
        label: 'Ergonomiske tilpasninger',
        hjelpetekst: 'For eksempel heve-/senkepult eller spesialstol',
    },
    {
        behov: Fysisk.UniversellUtforming,
        label: 'Universell utforming av arbeidsplassen',
        hjelpetekst: 'For eksempel rullestolrampe, tale i heis eller teleslynge',
    },
    {
        behov: Fysisk.Arbeidsstilling,
        label: 'Varierte arbeidsstillinger',
    },
    { behov: Fysisk.TungeLøft, label: 'Unngå tunge løft' },
];

const arbeidshverdagen: Alternativ[] = [
    {
        behov: Arbeidshverdagen.Opplæring,
        label: 'Opplæring',
        hjelpetekst: 'For eksempel hyppige tilbakemeldinger eller lengre opplæringsperiode',
    },
    {
        behov: Arbeidshverdagen.Arbeidsoppgaver,
        label: 'Arbeidsoppgaver',
        hjelpetekst: 'For eksempel tydelige oppgaver eller unntak fra noen typer oppgaver',
    },
    {
        behov: Arbeidshverdagen.TettOppfølging,
        label: 'Tett oppfølging',
        hjelpetekst: 'For eksempel ekstra støtte fra en kollega eller mentor',
    },
    { behov: Arbeidshverdagen.StilleOgRoligMiljø, label: 'Stille og rolig miljø' },
];

const utfordringerMedNorsk: Alternativ[] = [
    {
        behov: UtfordringerMedNorsk.Snakke,
        label: 'Snakke',
    },
    {
        behov: UtfordringerMedNorsk.Skrive,
        label: 'Skrive',
    },
    {
        behov: UtfordringerMedNorsk.Lese,
        label: 'Lese',
    },
];
