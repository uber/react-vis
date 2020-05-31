/* eslint-env node */
// default location for table of contents
const resolve = require('path').resolve;
const DOCS = require('../../docs/table-of-contents.json');
// const DEPENDENCIES = require('./package.json').dependencies;

module.exports = {
  // Adjusts amount of debug information from ocular-gatsby
  logLevel: 4,

  DOC_FOLDER: `${__dirname}/../../docs/`,
  ROOT_FOLDER: `${__dirname}/../../`,
  DIR_NAME: `${__dirname}`,

  EXAMPLES: [
    // Make sure to rebuild react-vis to see the issues.
    {
      title: 'Plots',
      // Path to code to download
      path: 'docs/examples/showcases/plots-showcase',
      image: 'images/examples/demo-thumb-line.jpg',
      componentUrl: resolve(
        __dirname,
        '../showcase/showcase-sections/plots-showcase.js'
      )
    }
  ],
  // your table of contents go there
  DOCS,

  PROJECT_TYPE: 'github',
  PROJECT_NAME: 'react-vis-website',
  PROJECT_ORG: 'uber',
  PROJECT_URL: 'https://github.com/uber/react-vis-website',
  PROJECT_DESC: 'A composable charting library',
  PATH_PREFIX: '',

  FOOTER_LOGO: '',

  HOME_PATH: '/',
  HOME_HEADING: 'A composable charting library',
  HOME_RIGHT: null,
  HOME_BULLETS: [
    {
      text: 'Designed for React',
      desc: 'Seamless integration.',
      img: 'images/icon-react.svg'
    },
    {
      text: 'Totally ready for production',
      img: 'images/icon-layers.svg'
    }
  ],

  LINK_TO_GET_STARTED: '/docs',

  PROJECTS: [
    {name: 'Project name', url: 'http://project.url'},
  ],
  ADDITIONAL_LINKS: [
    {name: 'link label', href: 'http://link.url', index: 1}
  ],

  GA_TRACKING: null,

  // For showing star counts and contributors.
  // Should be like btoa('YourUsername:YourKey') and should be readonly.
  GITHUB_KEY: null,

  webpack: {
    resolve: {
      alias: {
        'react-vis': resolve(__dirname, '../react-vis/es')
      }
    }
  }
};
