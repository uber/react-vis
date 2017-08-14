const {resolve} = require('path');
const isProd = process.env.NODE_ENV === 'production'; // eslint-disable-line
const path = require('path');
const webpack = require('webpack');

const entry = {
  app: './app.js'
};

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin()
];

const moduleConfig = {
  rules: [
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        'autoprefixer-loader'
      ]
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [/node_modules/]
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader?name=public/fonts/[name].[ext]'
    }
  ]
};

const resolveConfig = {
  modules: [resolve('../src'), 'node_modules'],

  alias: {
    react: resolve('./node_modules/react')
  }
};

const prodConfig = {
  entry,
  module: moduleConfig,
  resolve: resolveConfig,
  output: {
    path: path.resolve(__dirname, 'docs-dist'),
    filename: 'bundle.js'
  },
  plugins
};

const devConfig = {
  entry,
  module: moduleConfig,
  resolve: resolveConfig,
  devServer: {
    stats: {
      warnings: false
    }
  },
  devtool: 'source-maps'
};

module.exports = isProd ? prodConfig : devConfig;
