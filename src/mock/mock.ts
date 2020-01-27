import fetchMock from 'fetch-mock';
import { enKandidat, etFnr } from './testdata';

const basePath = '/finn-kandidat-api';

fetchMock.get(`${basePath}/kandidater/${etFnr}`, enKandidat);
fetchMock.post(`${basePath}/kandidater`, [201, enKandidat]);