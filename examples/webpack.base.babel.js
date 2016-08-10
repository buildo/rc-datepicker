import fs from 'fs';
import path from 'path';

export const indexHtml = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

export const paths = {
  SRC: path.resolve(__dirname, '../src'),
  ENTRY: path.resolve(__dirname, 'examples.js'),
  BUILD: path.resolve(__dirname, 'build'),
  EXAMPLES: path.resolve(__dirname),
  NODE_MODULES: path.resolve(__dirname, 'node_modules')
};

export default {
  output: {
    path: paths.BUILD,
    filename: 'bundle.js'
  },

  resolve: {
    root: [paths.NODE_MODULES]
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: [paths.SRC, paths.EXAMPLES]
      }
    ],
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: [paths.SRC, paths.EXAMPLES],
        exclude: /node_modules/
      }
    ]
  }
};
