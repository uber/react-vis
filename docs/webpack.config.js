const {resolve} = require('path');
const isProd = process.env.NODE_ENV === 'production'; // eslint-disable-line

const entry = {
  app: './app.js'
};

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
    path: './docs-dist',
    filename: 'bundle.js'
  }
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
