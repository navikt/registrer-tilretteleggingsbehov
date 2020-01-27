import fetchMock from 'fetch-mock';
import { enKandidat, etFnr } from './testdata';

const basePath = '/finn-kandidat-api';

fetchMock.get(`${basePath}/kandidater/fnr/${etFnr}`, enKandidat);
fetchMock.post(`${basePath}/kandidater/fnr`, [201, enKandidat]);
