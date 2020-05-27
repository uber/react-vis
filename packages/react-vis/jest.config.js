/*eslint-env node*/
const path = require('path');

module.exports = {
  testMatch: ['**/?(*-)+(test|tests).[tj]s?(x)'],
  transform: {
    '^.+\\.js$': path.resolve(__dirname, './jestBabelTransform.js')
  },
  setupFilesAfterEnv: ['./jest.setup.js']
};
