import { RestKandidat, Status, ukjentFeil } from './RestKandidat';
import { KandidatDto } from './Kandidat';
import { ArbeidstidBehov } from './Behov';

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
        const respons = await fetch(
            '/finn-kandidat-api/kandidater',
            options('POST', {
                ...kandidat,
                arbeidstidBehov:
                    kandidat.arbeidstidBehov.length !== 0
                        ? kandidat.arbeidstidBehov[0]
                        : ArbeidstidBehov.Heltid,
            })
        );
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
        const respons = await fetch(
            '/finn-kandidat-api/kandidater',
            options('PUT', {
                ...kandidat,
                arbeidstidBehov:
                    kandidat.arbeidstidBehov.length !== 0
                        ? kandidat.arbeidstidBehov[0]
                        : ArbeidstidBehov.Heltid,
            })
        );
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
        const respons = await fetch('finn-kandidat-api/kandidater/' + fnr, {
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

const options = (method: string, body: any) => ({
    method,
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
    ...medCookies,
});

const medCookies: RequestInit = { credentials: 'same-origin' };
