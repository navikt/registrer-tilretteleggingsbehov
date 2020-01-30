import fetchMock from 'fetch-mock';
import { enKandidat, etFnr } from './testdata';

const basePath = '/finn-kandidat-api';
const jobbprofilpath = '/pam-cv-api';

fetchMock
    .get(`${basePath}/kandidater/${etFnr}`, enKandidat)
    .post(`${basePath}/kandidater`, {
        status: 201,
        body: enKandidat,
    })
    .put(`${basePath}/kandidater`, {
        ...enKandidat,
        sistEndret: new Date().toISOString(),
    })
    .delete(`${basePath}/kandidater/${etFnr}`, 200)
    .get(`${jobbprofilpath}/rest/v1/arbeidssoker/${enKandidat.aktørId}/`, 404);
