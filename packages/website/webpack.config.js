/* eslint-env node */
const {resolve} = require('path');

module.exports = {
  resolve: {
    alias: {
      react: resolve(__dirname, './node_modules/react')
    }
  }
};
