'use strict';

var path = require('path');

var config = {
  entry: {
    pillow: path.resolve('src')
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js',
    library: '[name]'
  },
  externals: {
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'jsx-loader?harmony'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};

module.exports = config;
