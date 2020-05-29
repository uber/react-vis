/*eslint-env node*/
const path = require('path');

module.exports = {
  transform: {
    '^.+\\.js$': path.resolve(__dirname, './jestBabelTransform.js')
  },
  setupFilesAfterEnv: ['./jest.setup.js']
};
