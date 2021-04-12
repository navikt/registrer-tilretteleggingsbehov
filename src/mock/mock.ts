import fetchMock from 'fetch-mock';
import { enArbeidssoker, enKandidat } from './testdata';

const basePath = '/finn-kandidat-api';
const pamBasePath = '/pam-cv-api';

fetchMock
    .get(`express:${basePath}/kandidater/:fnr`, enKandidat)
    .post(`${basePath}/kandidater`, {
        status: 201,
        body: enKandidat,
    })
    .put(`${basePath}/kandidater`, {
        ...enKandidat,
        sistEndretAvVeileder: new Date().toISOString(),
    })
    .delete(`express:${basePath}/kandidater/:fnr`, 200)
    .get(`express:${pamBasePath}/rest/v1/arbeidssoker/:aktorId/`, enArbeidssoker)
    .post(`${basePath}/tilbakemeldinger`, 201)
    .get(`express:${basePath}/samtykke/:aktorId`, 200);
