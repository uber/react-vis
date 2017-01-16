/* eslint no-process-env: "off" */
// NOTE: This is a Webpack 2 configuration file for react-vis
const {resolve} = require('path');
const webpack = require('webpack');

module.exports = {
  // Example entry point
  entry: {
    app: resolve('./examples/main.js')
  },

  // Silence excessive webpack dev server warnings
  devServer: {
    stats: {
      warnings: false
    }
  },

  devtool: 'source-maps',

  resolve: {
    alias: {
      // Work against the latest base library in this repo
      'react-vis': resolve('./')
    }
  },

  plugins: process.env.NODE_ENV === 'production' ?
    [new webpack.optimize.UglifyJsPlugin()] :
    [],

  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        // Compile ES2015 and JSX using buble
        test: /\.js$/,
        loader: 'buble-loader',
        exclude: [/node_modules/],
        options: {
          objectAssign: 'Object.assign',
          transforms: {
            dangerousForOf: true,
            modules: false
          }
        }
      }
    ]
  }
};
