const {getGatsbyConfig} = require('ocular-gatsby/api');
const util = require('util');

const config = require('./ocular-config');
console.log('myconfig', util.inspect(getGatsbyConfig(config), {depth: null}));
const gatsbyConfig = getGatsbyConfig(config);
gatsbyConfig.plugins.push({
  resolve: 'gatsby-plugin-mdx',
  options: {
    gatsbyRemarkPlugins: [
      {resolve: 'gatsby-remark-images', options: {maxWidth: 690}},
      {resolve: 'gatsby-remark-responsive-iframe'},
      'gatsby-remark-prismjs',
      'gatsby-remark-copy-linked-files',
      'gatsby-remark-autolink-headers'
    ]
  }
});

module.exports = gatsbyConfig;
