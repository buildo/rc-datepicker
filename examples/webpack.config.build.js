var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackBase = require('./webpack.base');
var assign = require('lodash/assign');
var indexHtml = require('fs').readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

indexHtml = indexHtml.replace(/__GZIP__/g, '');


var paths = {
  SRC: path.resolve(__dirname, '../src'),
  EXAMPLES: path.resolve(__dirname, '.')
};

module.exports = assign(webpackBase, {

  entry: paths.EXAMPLES + '/examples.js',

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
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new CompressionPlugin({
      regExp: /\.js$|\.css$/
    }),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({ bundle: true, templateContent: indexHtml }),
    new ExtractTextPlugin('style', 'style.[hash].min.css')
  ]

});
