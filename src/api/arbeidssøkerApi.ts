import { RestArbeidssøker, Status } from './Rest';
import { medCookies } from './api';

export interface Arbeidssøker {
    jobbprofil: any;
}

export const hentArbeidssøker = async (aktørid: string): Promise<RestArbeidssøker> => {
    try {
        const respons = await fetch(`/pam-cv-api/rest/v1/arbeidssoker/${aktørid}/`, medCookies);

        if (!respons.ok || respons.status === 204) {
            return {
                status: Status.Feil,
                statusKode: respons.status,
            };
        }

        return {
            status: Status.Suksess,
            data: await respons.json(),
        };
    } catch (error) {
        return {
            status: Status.UkjentFeil,
        };
    }
};
