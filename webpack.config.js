'use strict';

var _ = require('lodash');
var webpack = require('webpack');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');

var DEBUG = !argv.release;

var AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:[' +
  '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", ' +
  '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';

var GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
};

var config = {

  entry: './lib/index',

  output: {
    path: './dist/',
    filename: 'react-semantic-datepicker.min.js',
    library: 'SemanticDatePicker',
    libraryTarget: 'umd'
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    //new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },

  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader!' + AUTOPREFIXER_LOADER
    }, {
      test: /\.gif$/,
      loader: 'url-loader?limit=10000&mimetype=image/gif'
    }, {
      test: /\.jpg$/,
      loader: 'url-loader?limit=10000&mimetype=image/jpg'
    }, {
      test: /\.png$/,
      loader: 'url-loader?limit=10000&mimetype=image/png'
    }, {
      test: /\.svg$/,
      loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};

module.exports = config;
