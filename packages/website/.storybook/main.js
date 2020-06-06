/* eslint-env node */
const {join} = require('path');
const isProd = process.env.NODE_ENV === 'production';

// This custom webpack config allows storybook to use the source files from 'react-vis'.
// Changes can be made and instantly be reflected in storybook to allow quick development
module.exports = {
  webpackFinal: config => {
    if (isProd) { return config;}

    const reactVisPath = join(__dirname, '../../react-vis/src')

    // Add an alias to 'react-vis' so that it looks in its src directory.
    config.resolve.alias['react-vis'] =reactVisPath
    config.resolve.modules.push(reactVisPath)

    const jsRule = config.module.rules.find(rule => rule.test.test('test.js'));
    // Add the react-vis/src folder to the list of files to compile
    jsRule.include.push(reactVisPath)

    const babelLoader = jsRule.use.find(x => x.loader === 'babel-loader');
    if (babelLoader) {
      babelLoader.options.rootMode = 'upward'
    }

    return config;
  }
}
