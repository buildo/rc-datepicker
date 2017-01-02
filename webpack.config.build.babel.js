import ExtractTextPlugin from 'extract-text-webpack-plugin';

import path from 'path';

const paths = {
  SRC: path.resolve(__dirname, 'src'),
  ENTRY: path.resolve(__dirname, 'styles.js'),
  BUILD: path.resolve(__dirname, 'lib'),
  NODE_MODULES: path.resolve(__dirname, 'node_modules')
};

export default {

  output: {
    path: paths.BUILD,
    filename: 'bundle.js'
  },

  entry: paths.ENTRY,

  resolve: {
    root: [paths.NODE_MODULES]
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: [paths.SRC]
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css!resolve-url!sass?sourceMap')
    }]
  },

  plugins: [
    new ExtractTextPlugin('style', 'style.css')
  ]
};
