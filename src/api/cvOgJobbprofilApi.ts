import { RestCvOgJobbprofil, Status } from './Rest';
import { medCookies } from './api';

export interface CvOgJobbprofil {
    jobbprofil: any;
}

export const hentCvOgJobbprofil = async (aktørid: string): Promise<RestCvOgJobbprofil> => {
    try {
        const respons = await fetch(
            '/pam-cv-api/rest/v1/arbeidssoker/' + aktørid + '/',
            medCookies
        );

        if (!respons.ok || respons.status === 204) {
            return {
                status: Status.Feil,
                statusKode: respons.status,
            };
        }

        const cvOgJobbprofil: CvOgJobbprofil = await respons.json();

        return {
            status: Status.Suksess,
            data: cvOgJobbprofil,
        };
    } catch (error) {
        return {
            status: Status.UkjentFeil,
        };
    }
};
