module.exports = {
  entry: {
    app: './docs/app.js'
  },

  devServer: {
    stats: {
      warnings: false
    }
  },

  devtool: 'source-maps',

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      }
    ]
  }
};
