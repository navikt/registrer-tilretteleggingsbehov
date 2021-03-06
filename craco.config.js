const path = require('path');
const CracoLessPlugin = require('craco-less');

const buildPath = path.resolve(__dirname, './build');

const webpack = {
    configure: {
        optimization: {
            splitChunks: {
                cacheGroups: {
                    default: false,
                    vendors: false,
                },
            },
            runtimeChunk: false,
        },
    },
    output: {
        path: buildPath,
        filename: 'static/js/[name].[hash].js',
    },
};

const eslint = {
    enable: true,
    mode: 'extends',
    configure: {
        extends: 'react-app',
        rules: {
            // Det er en bug i denne sjekken som automatisk feiler på ÆØÅ
            // https://github.com/yannickcr/eslint-plugin-react/issues/1654
            'react/jsx-pascal-case': 'off',
        },
    },
};

module.exports = {
    plugins: [{ plugin: CracoLessPlugin }],
    webpack,
    eslint,
};
