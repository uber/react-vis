/* eslint-env node */
const ocularConfig = require('./ocular-config');

module.exports = {
  plugins: [
    {resolve: `gatsby-theme-ocular`, options: ocularConfig},
    {
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
    }
  ]
};
