const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const entry = {app: './app'};
const jsRule = {
  test: /\.js$/,
  loader: 'babel-loader',
  exclude: [/node_modules/],
  query: {
    presets: ['react', 'es2015', 'stage-0']
  }
};
const isProd = process.env.NODE_ENV === 'production'; // eslint-disable-line
const config = isProd
  ? {
      entry,

      output: {
        path: './',
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

      devtool: 'source-maps',

      module: {
        rules: [
          jsRule,
          {
            test: /\.(sass|scss)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
          }
        ]
      }
    };

module.exports = config;
