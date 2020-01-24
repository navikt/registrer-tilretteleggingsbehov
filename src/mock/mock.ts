import fetchMock from 'fetch-mock';
import { enKandidat, etFnr } from './testdata';

const basePath = '/finn-kandidat-api';

fetchMock.get(`${basePath}/kandidater/fnr/${etFnr}`, enKandidat);
