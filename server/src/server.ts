import path from 'path';
import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';

const PORT = 3000;
const BASE_PATH = '/registrer-tilretteleggingsbehov';
const buildPath = path.join(__dirname, '../build');

const app = express();

const startServer = () => {
    app.use(compression());
    app.use('/*', configureCors);

    app.use(`${BASE_PATH}/static`, express.static(`${buildPath}/static`, cacheForever));

    app.use(`${BASE_PATH}/asset-manifest.json`, express.static(`${buildPath}/asset-manifest.json`));

    app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

    app.listen(PORT, () => {
        console.log('Server kjører på port', PORT);
    });
};

const configureCors = (req: Request, res: Response, next: NextFunction) => {
    const { origin } = req.headers;

    if (origin?.includes('intern.nav.no')) {
        res.header('Access-Control-Allow-Origin', origin);
    }

    next();
};

const cacheForever = {
    immutable: true,
    maxAge: 365000000,
};

startServer();
