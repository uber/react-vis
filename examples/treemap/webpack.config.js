// NOTE: This is a Webpack 2 configuration file for react-vis
const {resolve} = require('path');

module.exports = {
  // Example entry point
  entry: {
    app: resolve('./app.js')
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
      'react-vis': resolve('../../'),
      // Ensure only one copy of react and react-dom
      react: resolve('../../node_modules/react'),
      'react-dom': resolve('../../node_modules/react-dom')
    }
  },

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
