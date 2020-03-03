const path = require('path');
const webpack = require('webpack');

const outputPath = path.join(__dirname, 'dist');

module.exports = (env, argv) => ({
    context: process.cwd(),
    entry: {
        vendors: [
            'react',
            'react-dom',
            'styled-components',
            'styled-normalize',
            'redux',
            'react-redux',
            'redux-persist',
        ],
    },

    output: {
        filename: '[name].dll.js',
        path: outputPath,
        library: '[name]_[hash]',
    },

    plugins: [
        new webpack.DllPlugin({
            name: '[name]_[hash]',
            path: path.join(outputPath, '[name].json'),
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(argv.mode),
            },
        }),
    ],
});
