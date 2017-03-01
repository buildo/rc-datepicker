// called by mocha
const requireDir = require('require-dir');

require('babel-register')({
  ignore: /node_modules/,
  extensions: ['.js', '.jsx'],
  presets: ['es2015', 'react', 'stage-0'],
  plugins: [
    'transform-decorators-legacy',
    'lodash'
  ]
});

requireDir('./tests', {
  recurse: true
});
