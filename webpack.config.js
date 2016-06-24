'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const precss = require('precss')
const autoprefixer = require('autoprefixer');
const lost = require('lost');
const colorFunction = require('postcss-color-function');
const fontPath = require('postcss-fontpath');
const cssShort = require('postcss-short');
const colorShort = require('postcss-color-short');
const pseudoElems = require('postcss-pseudo-elements-content');
const cssMq = require('css-mqpacker')();
const cssClearfix = require('postcss-clearfix'); 


module.exports = {
    context: path.join(__dirname, "src"),

    entry: {
        app: './client.js',
        // common: './js/common.js'
        // common: ['./js/common.js', 'welcome.js]
    },

    output: {
        path: __dirname + "/build/",
        publicPath: '/',
        filename: '[name].js',
        library: '[name]'
    },

    externals: {
        lodash: '_',
        jquery: '$'
    },

    watch: NODE_ENV == 'development',

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,

    resolve: {
        root: path.join(__dirname, "vendor"),
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js'],
        alias: {
            old: 'old/dist/old'
        }
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        modulesTemplates: ['*-loader'],
        extensions: ['', '.js']
    },

    module: {
        loaders: [{
            test: /\.js?$/,
            include: path.join(__dirname, "src"),
            loaders: ['babel'],
            plugins: ['transform-runtime'],
        }, {
            test: /\.jade$/,
            loader: 'jade'
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style', 'css?modules&camelCase=dashes!resolve-url!sass?sourceMap!postcss')
        }, {
            test: /\.(png|jpg|svg|eot|ttf|woff|woff2)$/,
            loader: 'file?name=[path][name].[ext]?[hash]'
        }],

        noParse: /node_modules\/(react|react-dom|angular|swiper)/
    },

    plugins: [
        new ExtractTextPlugin('[name].css', {allChunks: true, disable: NODE_ENV=='development'}),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            DEFAULT_TAILS_DATA: JSON.stringify('/data/tails/southpark.json'),
            DEFAULT_TILES_COUNT: 16,
            DEFAULT_ROUND_TIME: 60, // 1min
            DEFAULT_TILE_SHOW_TIME: 500 // 30 msec
        }),
        new webpack.NoErrorsPlugin(),
        // new webpack.ProvidePlugin({
        //     _: 'lodash'
        // }),
        //new webpack.ContextReplacementPlugin( /node_modules\/moment\/locale/, /ru|en-gb/ ),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common'
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common-goods',
        //     chunks: ['shop', 'order']
        // })
    ],

    postcss: function () {
        return [autoprefixer, precss, lost, colorFunction, fontPath, cssShort, colorShort, pseudoElems, cssMq, cssClearfix];
    },

    devServer: {
        port: 3000,
        open: true,
        contentBase: path.join(__dirname, "public"),
        hot: true
    }
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
};
