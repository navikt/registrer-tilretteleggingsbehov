import { Kategori } from './Kategori';
import { Behov, Arbeidshverdagen, UtfordringerMedNorsk, Fysisk } from './Behov';

export type Behovtekst = {
    behov: Behov;
    label: string;
    hjelpetekst?: string;
};

const tilretteleggingsbehov = {
    [Kategori.Arbeidstid]: [
        {
            behov: Fysisk.UniversellUtforming,
            label: 'Universell utforming av arbeidsplassen',
            hjelpetekst: 'For eksempel rullestolrampe, tale i heis eller teleslynge',
        },
        {
            behov: Fysisk.Ergonomi,
            label: 'Ergonomiske tilpasninger',
            hjelpetekst: 'For eksempel heve-/senkepult eller spesialstol',
        },
        { behov: Fysisk.Arbeidsstilling, label: 'Varierte arbeidsstillinger' },
        { behov: Fysisk.TungeLøft, label: 'Unngå tunge løft' },
    ],
    [Kategori.Fysisk]: [
        {
            behov: Fysisk.UniversellUtforming,
            label: 'Universell utforming av arbeidsplassen',
            hjelpetekst: 'For eksempel rullestolrampe, tale i heis eller teleslynge',
        },
        {
            behov: Fysisk.Ergonomi,
            label: 'Ergonomiske tilpasninger',
            hjelpetekst: 'For eksempel heve-/senkepult eller spesialstol',
        },
        { behov: Fysisk.Arbeidsstilling, label: 'Varierte arbeidsstillinger' },
        { behov: Fysisk.TungeLøft, label: 'Unngå tunge løft' },
    ],
    [Kategori.Arbeidshverdagen]: [
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
    ],
    [Kategori.UtfordringerMedNorsk]: [
        { behov: UtfordringerMedNorsk.Snakke, label: 'Snakke' },
        { behov: UtfordringerMedNorsk.Skrive, label: 'Skrive' },
        { behov: UtfordringerMedNorsk.Lese, label: 'Lese' },
    ],
};

export const hentTekster = (kategori: Kategori): Behovtekst[] => {
    return tilretteleggingsbehov[kategori];
};

export const hentTeksterForValgteBehov = (kategori: Kategori, behov: Behov[]) => {
    return (tilretteleggingsbehov[kategori] as Behovtekst[]).filter(b => behov.includes(b.behov));
};
