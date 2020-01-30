import { RestJobbprofil, Status, ukjentFeil } from './RestJobbprofil';
import { medCookies } from './api';

export const hentJobbprofilstatus = async (aktørid: string): Promise<RestJobbprofil> => {
    try {
        const respons = await fetch(
            '/pam-cv-api/rest/v1/arbeidssoker/' + aktørid + '/',
            medCookies
        );
        if (respons.status === 404) {
            console.log('kkkk')
            return {status: Status.IkkeFunnet}
        }
        if (!respons.ok) {
            return { status: Status.Feil, statusKode: respons.status };
        }
        return { status: Status.Suksess };
    } catch (error) {
        return ukjentFeil;
    }
};
