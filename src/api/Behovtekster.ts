import {
    Behov,
    Arbeidstid,
    FysiskTilrettelegging,
    Arbeidshverdagen,
    UtfordringerMedNorsk,
} from './Behov';

export type Alternativtekster = {
    label: string;
    hjelpetekst?: string;
};

export declare type Behovmapping = Map<String, Alternativtekster>;

const arbeidstidMapping: Behovmapping = new Map([
    [Arbeidstid.IkkeHeleDager, { label: 'Kan jobbe hver ukedag, men ikke hele dager' }],
    [
        Arbeidstid.BorteFasteDagerEllerTider,
        { label: 'Må være borte fra jobben til faste dager eller tider' },
    ],
    [Arbeidstid.Fleksibel, { label: 'Må ha fleksible arbeidsdager' }],
    [Arbeidstid.GradvisØkning, { label: 'Ønsker gradvis økning av stillingsprosenten' }],
]);

const fysiskTilretteleggingMapping: Behovmapping = new Map([
    [FysiskTilrettelegging.Arbeidsstilling, { label: 'Varierte arbeidsstillinger' }],
    [
        FysiskTilrettelegging.Ergonomi,
        {
            label: 'Ergonomiske tilpasninger',
            hjelpetekster: 'For eksempel hev-senk-pult eller spesialstol',
        },
    ],
    [FysiskTilrettelegging.TungeLøft, { label: 'Unngå tunge løft' }],
    [
        FysiskTilrettelegging.UniversellUtforming,
        { label: 'Universell utforming av arbeidsplassen' },
    ],
]);

const arbeidshverdagenMapping: Behovmapping = new Map([
    [
        Arbeidshverdagen.Opplæring,
        {
            label: 'Opplæring',
            hjelpetekst: 'For eksempel hyppige tilbakemeldinger eller lengre opplæringsperiode',
        },
    ],
    [
        Arbeidshverdagen.Arbeidsoppgaver,
        {
            label: 'Arbeidsoppgaver',
            hjelpetekst: 'For eksempel tydelige oppgaver eller unntak fra noen typer oppgaver',
        },
    ],
    [
        Arbeidshverdagen.TettOppfølging,
        { label: 'Tett oppfølging', hjelpetekst: 'En egen person med ansvar for tett oppfølging' },
    ],
    [Arbeidshverdagen.StilleOgRoligMiljø, { label: 'Stille og rolig miljø' }],
]);

const utfordringerMedNorskMapping: Behovmapping = new Map([
    [UtfordringerMedNorsk.Snakke, { label: 'Snakke' }],
    [UtfordringerMedNorsk.Skrive, { label: 'Skrive' }],
    [UtfordringerMedNorsk.Lese, { label: 'Lese' }],
]);

const hentBehovtekster = (behov: Behov, mapping: Behovmapping): Alternativtekster => {
    return mapping.get(behov) || { label: '' };
};

export const arbeidstidTekster = (arbeidstid: Arbeidstid[]): Alternativtekster[] => {
    return arbeidstid.map(behov => hentBehovtekster(behov, arbeidstidMapping));
};

export const fysiskTekster = (
    fysiskTilrettelegging: FysiskTilrettelegging[]
): Alternativtekster[] => {
    return fysiskTilrettelegging.map(behov =>
        hentBehovtekster(behov, fysiskTilretteleggingMapping)
    );
};

export const arbeidshverdagenTekster = (
    arbeidshverdagen: Arbeidshverdagen[]
): Alternativtekster[] => {
    return arbeidshverdagen.map(behov => hentBehovtekster(behov, arbeidshverdagenMapping));
};

export const utfordringerMedNorskTekster = (
    utfordringerMedNorsk: UtfordringerMedNorsk[]
): Alternativtekster[] => {
    return utfordringerMedNorsk.map(behov => hentBehovtekster(behov, utfordringerMedNorskMapping));
};
