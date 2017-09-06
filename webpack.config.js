/* global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

let plugins = [];

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({
        minimize: true
    }));
}

let config = {
    output: {
        path: __dirname,
        filename: '[name].js',
        library: 'object-fit-picture-tag-polyfill',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
                test: /(\.jsx|\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /(\.jsx|\.js)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.json', '.js']
    },
    plugins: plugins
};

if (env === 'build') {
    config.entry = {
        './dist/object-fit-picture-tag-polyfill.min': './src/index',
        './tests/app': './tests/index'
    };
} else {
    config.entry = {
        './dist/object-fit-picture-tag-polyfill': './src/index',
        './tests/app': './tests/index'
    };
}

module.exports = config;
