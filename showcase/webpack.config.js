const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const entry = {app: './index'};
const jsRule = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: [/node_modules/]
};

const isProd = process.env.NODE_ENV === 'production'; // eslint-disable-line

const config = isProd ? {

  entry,

  output: {
    path: './',
    filename: 'bundle.js'
  },

  module: {
    rules: [jsRule, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: ['css-loader', 'sass-loader']
      })
    }]
  },

  plugins: [
    new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
  ]

} : {

  entry,

  devtool: 'source-maps',

  module: {
    rules: [jsRule, {
      test: /\.(sass|scss)$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  }

};

module.exports = config;
