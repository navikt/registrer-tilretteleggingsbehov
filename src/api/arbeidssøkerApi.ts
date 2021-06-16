import { RestArbeidssøker, Status } from './Rest';
import { medCookies } from './api';

export interface Arbeidssøker {
    harCv: boolean;
    harJobbprofil: boolean;
}

export const hentArbeidssøker = async (aktørid: string): Promise<RestArbeidssøker> => {
    try {
        const respons = await fetch(`/finn-kandidat-api/synlighet/${aktørid}`, medCookies);

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
