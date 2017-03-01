import path from 'path';
import StyleLintPlugin from 'stylelint-webpack-plugin';

export const paths = {
  SRC: path.resolve(__dirname, '../src'),
  ENTRY: path.resolve(__dirname, 'examples.js'),
  INDEX_HTML: path.resolve(__dirname, 'index.html'),
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

  plugins: [
    new StyleLintPlugin({
      files: '**/*.scss',
      failOnError: false,
      syntax: 'scss'
    })
  ],

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
