import { Jobbprofilstatus, Status } from './RestKandidat';
import { medCookies } from './api';

export const hentJobbprofilstatus = async (aktørid: string): Promise<Jobbprofilstatus> => {
    try {
        const respons = await fetch(
            '/pam-cv-api/rest/v1/arbeidssoker/' + aktørid + '/',
            medCookies
        );

        if (respons.ok) {
            return Status.Suksess;
        }

        if (respons.status === 404) {
            return Status.IkkeFunnet;
        }

        return Status.Feil;
    } catch (error) {
        return Status.UkjentFeil;
    }
};
