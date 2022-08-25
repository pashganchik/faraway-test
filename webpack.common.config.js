const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const configData = require("./build-config.json");

const devMode = process.env.NODE_ENV !== 'production';

const getPublicPath = (configurationData) => {
    if (configurationData.testMode) {
        return "http://localhost:3001";
    } else {
        return `${configurationData.domain}:${configurationData.port}/${configurationData.root}`;
    }
};

module.exports = (configurationMode) => {
    console.log(`Configuration Mode = '${configurationMode}'`);

    const configurationData = configData.buildConfigurations[configurationMode];
    console.log("Configuration Data: ", configurationData);

    const SRC_DIR = __dirname + '/src';
    const PUBLIC_DIR = `${__dirname}/public/${configurationData.publicFolder}`;
    const DIST_DIR = `${__dirname}/dist/`;
    const entryPath = `${SRC_DIR}/index.tsx`;

    console.log(`SRC_DIR = '${SRC_DIR}'`);
    console.log(`PUBLIC_DIR = '${PUBLIC_DIR}'`);
    console.log(`DIST_DIR = '${DIST_DIR}'`);
    console.log(`entryPath = '${entryPath}'`);

    const publicPath = getPublicPath(configurationData);
    console.log(`publicPath = '${publicPath}'`);

    return {
        entry: [entryPath],
        output: {
            path: DIST_DIR,
            publicPath: publicPath,
            filename: 'js/bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            noEmit: false,
                        },
                    },
                },
                {
                    test: /\.(scss|sass|css)$/,
                    exclude: /node_modules/,
                    loaders: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 1,
                                localIdentName: '[local]',
                                outputPath: 'styles',
                            },
                        },
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(html)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'html-loader',
                        options: {minimize: true},
                    },
                },
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
            modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin({
                template: PUBLIC_DIR + '/index.html',
                filename: './index.html',
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? 'style/[name].css' : 'style/[name].[hash].css',
                chunkFilename: devMode ? 'style/[id].css' : 'style/[id].[hash].css',
            }),
            new CopyPlugin({
                patterns: [{
                    from: PUBLIC_DIR + '/images/favicon.ico',
                    to: DIST_DIR + "images/"
                }, {
                    from: SRC_DIR + '/images/',
                    to: DIST_DIR + "images/"
                }]
            })
        ],
        performance: {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        },
        devServer: {
            contentBase: DIST_DIR,
            hot: true,
            historyApiFallback: true,
            disableHostCheck: true,
            port: configurationData.port
        }
    };
};
