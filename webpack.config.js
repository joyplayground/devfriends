const path = require('path');
const fs = require('fs');
const App = require('./app_config');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const isProd = mode === 'production';

const output_dir = path.join(__dirname, 'dist');

const PORT = 8000;
const DEVELOPMENT_HOST = 'localhost';
const PRODUCTIION_HOST = 'honchy.cn';
module.exports = {
    mode: mode,
    entry: App.entry,
    output: {
        path: output_dir,
        filename: isProd ? '[name]@[chunkhash].js' : '[name].js',
        publicPath: isProd ? `https://${PRODUCTIION_HOST}/` : `http://${DEVELOPMENT_HOST}:${PORT}/`
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
            }
        ]
    },
    devtool: 'cheap-source-map',
    devServer: {
        contentBase: [output_dir, path.join(__dirname, 'src', 'assets'), __dirname],
        port: PORT,
        allowedHosts: [
            'dev.qunar.com',
            'localhost'
        ],
        hot: false
    },
    resolve: {
        alias: {
            '@common': path.join(__dirname, 'src', 'common'),
            '@components': path.join(__dirname, 'src', 'components'),
            '@style': path.join(__dirname, 'src', 'style')
        }
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin()
        ],
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            maxSize: 0,
            minChunks: 2,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                default: false,
                common: {
                    name: 'common',
                    test: function(module, chunks) {
                        let src = module.resource;
                        let isNodeModule = /\/node_modules\//.test(src);
                        let isCommon = /\/src\/common\//.test(src);
                        let isScript = /\.js$/.test(src);

                        return isScript && (isNodeModule || isCommon);
                    },
                    minChunks: 1,
                    priority: 1,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [].concat(
        new CleanWebpackPlugin(output_dir),
        App.html.map(item => {
            let cfg = {
                filename: item.html_out,
                chunks: [item.name],
                minify: isProd
            };

            if (item.html) {
                cfg.template = item.html;
            }

            return new HtmlWebpackPlugin(cfg);
        }),
        new MiniCssExtractPlugin({
            filename: isProd ? '[name]@[hash].css' : '[name].css',
            chunkFilename: isProd ? '[id]@[hash].css' : '[id].css'
        }),
        new WorkboxPlugin.InjectManifest({
            swSrc: path.join(__dirname, 'service-worker.js'),
            importWorkboxFrom: 'local'
        })
    )
};
