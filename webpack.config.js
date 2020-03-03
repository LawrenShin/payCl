const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require('dotenv-webpack');

const manifestPath = path.join(__dirname, 'dist/vendors.json');

module.exports = () => ({
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            emitError: process.env.NODE_ENV === 'development',
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                ],
            },
        ],
    },
    plugins: [
        new DotEnv(),
        new HtmlWebpackPlugin({
            template: './utils/index.html',
        }),
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            // eslint-disable-next-line import/no-dynamic-require, global-require
            manifest: require(manifestPath),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ].filter(Boolean),
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@client': path.join(__dirname, 'src'),
        },
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        port: 9090,
    },
});
