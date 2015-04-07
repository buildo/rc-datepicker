'use strict';

var webpack = require('webpack');

var config = {

  entry: './lib/index',

  output: {
    path: './dist/',
    filename: 'react-semantic-datepicker.min.js',
    library: 'SemanticDatePicker',
    libraryTarget: 'umd'
  },

  cache: false,
  debug: true,

  stats: {
    colors: true,
    reasons: true
  },

  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // new webpack.optimize.UglifyJsPlugin({minimize: true})
  ],

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },

  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader!'
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};

module.exports = config;
