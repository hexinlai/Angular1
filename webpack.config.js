"use strict";

const webpack = require('webpack');

module.exports = {
    entry: './public/src/main.js',
    output: {
        path: './public/dest',
        filename: 'app.bundle.js',
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }

            }
        ]
    }

}