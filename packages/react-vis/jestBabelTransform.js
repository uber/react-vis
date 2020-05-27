/*eslint-env node*/
const babelJest = require('babel-jest');

// see https://github.com/facebook/jest/issues/7359#issuecomment-471509996
module.exports = babelJest.createTransformer({
  rootMode: 'upward'
});
