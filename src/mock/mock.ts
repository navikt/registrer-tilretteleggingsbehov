import fetchMock from 'fetch-mock';
import { enKandidat } from './testdata';

const basePath = '/finn-kandidat-api';

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
    .delete(`express:${basePath}/kandidater/:fnr`, 200, {
        delay: 20000,
    })
    .post(`${basePath}/tilbakemeldinger`, 201);
