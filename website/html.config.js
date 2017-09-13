module.exports = {

  title: 'react-vis',

  baseHref: process.env.NODE_ENV === 'production' ? 'website/dist/' : '/',

  meta: [{
    name: 'description',
    content: 'A composable charting library'
  }],

  scripts: ['https://uber.github.io/react-vis/redirect.js']

};
