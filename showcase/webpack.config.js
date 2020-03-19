const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const entry = {app: './app'};
const jsRule = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: [/node_modules/],
  query: {
    presets: ['@babel/preset-react', '@babel/preset-env'],
    plugins: [
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-class-properties'
    ]
  }
};
const isProd = process.env.NODE_ENV === 'production'; // eslint-disable-line
const config = isProd
  ? {
      entry,

      output: {
        path: path.resolve(__dirname, './'),
        filename: 'bundle.js'
      },

      resolve: {
        alias: {
          // 'index':path.join(__dirname,'..', 'src', 'index.js'),
          // 'theme':path.join(__dirname,'..', 'src', 'theme.js')
        }
      },

      module: {
        rules: [
          jsRule,
          {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
              fallbackLoader: 'style-loader',
              loader: ['css-loader', 'sass-loader']
            })
          }
        ]
      },

      plugins: [
        new ExtractTextPlugin('bundle.css'),
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
      ]
    }
  : {
      entry,

      output: {
        path: path.resolve(__dirname, './'),
        filename: 'bundle.js'
      },

      devtool: 'source-maps',

      module: {
        rules: [
          jsRule,
          {
            test: /\.(sass|scss)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          }
        ]
      },

      resolve: {
        modules: ['node_modules', path.join(__dirname, '..', 'src')]
      }
    };

module.exports = config;
