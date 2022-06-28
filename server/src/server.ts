import path from 'path';
import express from 'express';

const PORT = 3000;
const BASE_PATH = '/registrer-tilretteleggingsbehov';
const buildPath = path.join(__dirname, '../build');

const app = express();

const startServer = () => {
    app.use('/*', (req, res, next) => {
        const { origin } = req.headers;

        if (origin?.includes('intern.nav.no')) {
            res.header('Access-Control-Allow-Origin', origin);
        }

        next();
    });

    app.use(
        `${BASE_PATH}/static`,
        express.static(`${buildPath}/static`, {
            immutable: true,
            maxAge: 365000000,
        })
    );

    app.use(`${BASE_PATH}/asset-manifest.json`, express.static(`${buildPath}/asset-manifest.json`));

    app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

    app.listen(PORT, () => {
        console.log('Server kjører på port', PORT);
    });
};

startServer();
