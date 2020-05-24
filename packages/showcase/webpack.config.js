/* eslint-env node */
const process = require('process');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const entry = {app: './app'};
const jsRule = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: [/node_modules/],
  options: {
    rootMode: 'upward'
  },
};
const isProd = process.env.NODE_ENV === 'production';
const config = isProd
  ? {
      entry,
      mode: 'production',
      output: {
        path: process.cwd(),
        filename: 'bundle.js'
      },

      resolve: {
        modules: ['node_modules', path.join(__dirname,'..', 'react-vis', 'src')],
      },

      module: {
        rules: [
          jsRule,
          {
            test: /\.scss$/,
            use: [{
              loader: MiniCssExtractPlugin.loader,
            }, 'css-loader', 'sass-loader']
          }
        ]
      },
      optimization: {
        minimize: true
      },
      plugins: [
       new MiniCssExtractPlugin('bundle.css'),
      ]
    }
  : {
      mode: 'development',
      entry,
      devtool: 'source-maps',
      output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
      },
      plugins: [
        new MiniCssExtractPlugin()
      ],

      module: {
        rules: [
          jsRule,
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: true,
                },
              },
              'css-loader',
              'sass-loader'
            ],
          }
        ]
      },

      resolve: {
        modules: ['node_modules', path.join(__dirname,'..', 'react-vis', 'src')]
      },

    };

module.exports = config;
