import { RestKandidat, Status, ukjentFeil, Tilbakemeldingstatus } from './RestKandidat';
import { KandidatDto } from './Kandidat';

export const hentKandidat = async (fnr: string): Promise<RestKandidat> => {
    try {
        const respons = await fetch('/finn-kandidat-api/kandidater/' + fnr, medCookies);
        if (!respons.ok) {
            return { status: Status.Feil, statusKode: respons.status };
        }

        const kandidat = await respons.json();
        return { status: Status.Suksess, data: kandidat };
    } catch (error) {
        return ukjentFeil;
    }
};

export const opprettKandidat = async (kandidat: KandidatDto): Promise<RestKandidat> => {
    try {
        const respons = await fetch('/finn-kandidat-api/kandidater', options('POST', kandidat));
        if (!respons.ok) {
            return { status: Status.Feil, statusKode: respons.status };
        }

        const opprettetKandidat = await respons.json();
        return { status: Status.Suksess, data: opprettetKandidat };
    } catch (error) {
        return ukjentFeil;
    }
};

export const endreKandidat = async (kandidat: KandidatDto): Promise<RestKandidat> => {
    try {
        const respons = await fetch('/finn-kandidat-api/kandidater', options('PUT', kandidat));
        if (!respons.ok) {
            return { status: Status.Feil, statusKode: respons.status };
        }

        const endretKandidat = await respons.json();
        return { status: Status.Suksess, data: endretKandidat };
    } catch (error) {
        return ukjentFeil;
    }
};

export const slettKandidat = async (fnr: string): Promise<RestKandidat> => {
    try {
        const respons = await fetch('/finn-kandidat-api/kandidater/' + fnr, {
            method: 'DELETE',
            ...medCookies,
        });
        if (!respons.ok) {
            return { status: Status.Feil, statusKode: respons.status };
        }

        return { status: Status.Slettet };
    } catch (error) {
        return ukjentFeil;
    }
};

export const sendTilbakemelding = async (tilbakemelding: any): Promise<Tilbakemeldingstatus> => {
    try {
        const respons = await fetch(
            '/finn-kandidat-api/tilbakemeldinger',
            options('POST', tilbakemelding)
        );

        if (respons.ok) {
            return Status.Suksess;
        }

        return Status.Feil;
    } catch (error) {
        return Status.UkjentFeil;
    }
};

const options = (method: string, body: any) => ({
    method,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    ...medCookies,
});

export const medCookies: RequestInit = { credentials: 'same-origin' };
