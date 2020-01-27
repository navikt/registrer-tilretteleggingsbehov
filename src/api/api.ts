import { RestKandidat, Status, ukjentFeil } from './RestKandidat';
import { NyKandidat } from './Kandidat';

export const hentKandidat = async (fnr: string): Promise<RestKandidat> => {
    try {
        const respons = await fetch('/finn-kandidat-api/kandidater/fnr/' + fnr, medCookies);
        if (!respons.ok) {
            return { status: Status.Feil, statusKode: respons.status };
        }

        const kandidat = await respons.json();
        return { status: Status.Suksess, data: kandidat };
    } catch (error) {
        return ukjentFeil;
    }
};

export const opprettKandidat = async (nyKandidat: NyKandidat): Promise<RestKandidat> => {
    try {
        const respons = await fetch('/finn-kandidat-api/kandidater', body(nyKandidat));
        if (!respons.ok) {
            return { status: Status.Feil, statusKode: respons.status };
        }

        const opprettetKandidat = await respons.json();
        return { status: Status.Suksess, data: opprettetKandidat };
    } catch (error) {
        return ukjentFeil;
    }
};

const body = (body: any) => ({
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    ...medCookies,
});

const medCookies: RequestInit = { credentials: 'same-origin' };
