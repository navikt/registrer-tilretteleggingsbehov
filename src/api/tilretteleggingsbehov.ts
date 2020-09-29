import {
    Kategori,
    Behov,
    Arbeidshverdagen,
    UtfordringerMedNorsk,
    Fysisk,
    Arbeidstid,
} from './Behov';

export type Behovtekst = {
    behov: Behov;
    beskrivelse: string;
    hjelpetekst?: string;
};

const tilretteleggingsbehov = {
    [Kategori.Arbeidstid]: [
        {
            behov: Arbeidstid.IkkeHeleDager,
            beskrivelse: 'Kan jobbe hver ukedag, men ikke hele dager',
        },
        {
            behov: Arbeidstid.BorteFasteDagerEllerTider,
            beskrivelse: 'Må være borte fra jobben til faste dager eller tider',
        },
        {
            behov: Arbeidstid.GradvisØkning,
            beskrivelse: 'Ønsker gradvis økning av stillingsprosenten',
        },
        { behov: Arbeidstid.Fleksibel, beskrivelse: 'Må ha fleksible arbeidsdager' },
    ],
    [Kategori.Fysisk]: [
        {
            behov: Fysisk.UniversellUtforming,
            beskrivelse: 'Universell utforming av arbeidsplassen',
            hjelpetekst: 'For eksempel rullestolrampe, tale i heis eller teleslynge',
        },
        {
            behov: Fysisk.Ergonomi,
            beskrivelse: 'Ergonomiske tilpasninger',
            hjelpetekst: 'For eksempel heve-/senkepult eller spesialstol',
        },
        { behov: Fysisk.Arbeidsstilling, beskrivelse: 'Varierte arbeidsstillinger' },
        { behov: Fysisk.TungeLøft, beskrivelse: 'Unngå tunge løft' },
    ],
    [Kategori.Arbeidshverdagen]: [
        {
            behov: Arbeidshverdagen.Opplæring,
            beskrivelse: 'Opplæring',
            hjelpetekst: 'For eksempel hyppige tilbakemeldinger eller lengre opplæringsperiode',
        },
        {
            behov: Arbeidshverdagen.Arbeidsoppgaver,
            beskrivelse: 'Arbeidsoppgaver',
            hjelpetekst: 'For eksempel tydelige oppgaver eller unntak fra noen typer oppgaver',
        },
        {
            behov: Arbeidshverdagen.TettOppfølging,
            beskrivelse: 'Tett oppfølging',
            hjelpetekst: 'For eksempel ekstra støtte fra en kollega eller mentor',
        },
        { behov: Arbeidshverdagen.StilleOgRoligMiljø, beskrivelse: 'Stille og rolig miljø' },
        {
            behov: Arbeidshverdagen.PersonligBistand,
            beskrivelse: 'Personlig bistand',
            hjelpetekst: 'For eksempel tolk, assistent eller lese- og sekretærhjelp',
        },
    ],
    [Kategori.UtfordringerMedNorsk]: [
        { behov: UtfordringerMedNorsk.Snakke, beskrivelse: 'Snakke' },
        { behov: UtfordringerMedNorsk.Skrive, beskrivelse: 'Skrive' },
        { behov: UtfordringerMedNorsk.Lese, beskrivelse: 'Lese' },
    ],
};

export const hentTekster = (kategori: Kategori): Behovtekst[] => {
    return tilretteleggingsbehov[kategori];
};

export const hentTeksterForValgteBehov = (kategori: Kategori, behov: Behov[]) => {
    return (tilretteleggingsbehov[kategori] as Behovtekst[]).filter((b) => behov.includes(b.behov));
};
