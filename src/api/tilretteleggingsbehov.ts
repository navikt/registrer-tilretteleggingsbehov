import { Kategori, Behov, Arbeidshverdagen, UtfordringerMedNorsk, Fysisk } from './Behov';

export type Behovtekst = {
    behov: Behov;
    beskrivelse: string;
    hjelpetekst?: string;
};

const tilretteleggingsbehov = {
    [Kategori.Arbeidstid]: [
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
    return (tilretteleggingsbehov[kategori] as Behovtekst[]).filter(b => behov.includes(b.behov));
};
