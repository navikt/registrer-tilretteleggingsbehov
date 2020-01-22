const path = require('path');
const express = require('express');
const app = express();

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
const BASE_PATH = '/registrer-tilretteleggingsbehov';

const buildPath = path.join(__dirname, '../build');

const startServer = () => {
    app.use(
        BASE_PATH,
        express.static(buildPath, {
            immutable: true,
            maxAge: 365000000,
        })
    );

    app.get(`${BASE_PATH}/internal/isAlive`, (req, res) => res.sendStatus(200));
    app.get(`${BASE_PATH}/internal/isReady`, (req, res) => res.sendStatus(200));

    app.listen(PORT, () => {
        console.log('Server listening on port', PORT);
    });
};

startServer();
