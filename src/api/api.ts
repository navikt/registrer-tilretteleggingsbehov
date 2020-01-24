import { RestKandidat, Status } from './Kandidat';

export const hentKandidat = async (fnr: string): Promise<RestKandidat> => {
    try {
        const response = await fetch('/finn-kandidat-api/kandidater/fnr/' + fnr, medCookies);
        const kandidat = await response.json();
        return Promise.resolve({
            status: Status.Suksess,
            data: kandidat,
        });
    } catch (error) {
        return Promise.resolve({
            status: Status.Feil,
            error: 'Kunne ikke hente kandidater',
        });
    }
};

export const hentVeileder = async (): Promise<string> => {
    try {
        const response = await fetch('/finn-kandidat-api/veileder/me', medCookies);
        const veileder = await response.text();
        return Promise.resolve(veileder);
    } catch (error) {
        return Promise.reject('feil');
    }
};

const medCookies: RequestInit = {
    credentials: 'same-origin',
};
