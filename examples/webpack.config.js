var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackBase = require('./webpack.base');
var assign = require('lodash/object').assign;
var indexHtml = require('fs').readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

indexHtml = indexHtml.replace(/__GZIP__/g, '');


var paths = {
  SRC: path.resolve(__dirname, '../src'),
  EXAMPLES: path.resolve(__dirname, '.')
};

module.exports = assign(webpackBase, {

  entry: [
    'webpack/hot/dev-server',
    paths.EXAMPLES + '/examples.js'
  ],

  devtool: 'source-map',

  devServer: {
    contentBase: paths.EXAMPLES,
    hot: true,
    inline: true,
    port: '8080'
  },

  module: assign({}, webpackBase.module, {
    loaders: webpackBase.module.loaders.concat([
      // SASS
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
      }
    ])
  }),

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new HtmlWebpackPlugin({ bundle: false, templateContent: indexHtml }),
    new ExtractTextPlugin('style', 'style.[hash].min.css'),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]

});
