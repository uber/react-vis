const path = require('path')
const config = require('./config/website')
const proxy = require('http-proxy-middleware')

const here = (...p) => path.join(__dirname, ...p)
const pathPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      }),
    )
  },
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    siteUrl: config.siteUrl + pathPrefix,
    title: config.siteTitle,
    twitterHandle: config.twitterHandle,
    description: config.siteDescription,
    keywords: ['Video Blogger'],
    canonicalUrl: config.siteUrl,
    image: config.siteLogo,
    author: {
      name: config.author,
      minibio: config.minibio,
    },
    organization: {
      name: config.organization,
      url: config.siteUrl,
      logo: config.siteLogo,
    },
    social: {
      twitter: config.twitterHandle,
      fbAppID: '',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/writing-blog`,
        name: 'writing-blog',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src`,
        name: 'src',
      },
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        defaultLayouts: {
          default: here('./src/templates/markdown-page.js'),
        },
        extensions: ['.mdx', '.md', '.markdown'],
        gatsbyRemarkPlugins: [
          {resolve: 'gatsby-remark-copy-linked-files'},
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: '#fafafa',
              maxWidth: 1035,
            },
          },
          {resolve: require.resolve('./plugins/remark-embedder')},
        ],
      },
    },
    'gatsby-plugin-twitter',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-emotion',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'standalone',
        icon: './static/favicons/android-icon-192x192.png',
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          getBlogFeed({
            filePathRegex: `//content/blog//`,
            blogUrl: 'https://react-vis.com/blog',
            output: '/blog/rss.xml',
            title: 'React Vis Blog RSS Feed',
          }),
          getBlogFeed({
            filePathRegex: `//content/writing-blog//`,
            blogUrl: 'https://react-vis.com/writing/blog',
            output: '/writing/blog/rss.xml',
            title: `Kent's Writing Blog RSS Feed`,
          }),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-62924965-1`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/lib/typography`,
      },
    },
    {
      resolve: `netlify-cache`,
      options: {
        extraDirsToCache: ['./public/static'],
      },
    },
    'gatsby-plugin-offline',
  ],
}

function getBlogFeed({filePathRegex, blogUrl, ...overrides}) {
  return {
    serialize: ({query: {site, allMdx}}) => {
      const stripSlash = slug => (slug.startsWith('/') ? slug.slice(1) : slug)
      return allMdx.edges.map(edge => {
        const siteUrl = site.siteMetadata.siteUrl
        const url = `${siteUrl}/${stripSlash(edge.node.fields.slug)}`
        // TODO: clean this up... This shouldn't be here and it should be dynamic.
        const footer = `
          <div style="width: 100%; margin: 0 auto; padding: 40px 40px;">
            <div style="display: flex;">
              <div style="padding-right: 20px;">
                <img
                  src="https://react-vis.com/images/small-circular-kent.png"
                  alt="React Vis"
                  style="max-width: 80px; border-radius: 50%;"
                />
              </div>
              <p>
                <strong>React Vis</strong> is a JavaScript software engineer and
                teacher. He's taught hundreds of thousands of people how to make the world
                a better place with quality software development tools and practices. He
                lives with his wife and four kids in Utah.
              </p>
            </div>
            <div>
              <p>Learn more with React Vis:</p>
              <ul>
                <li>
                  <a href="https://testingjavascript.com">TestingJavaScript.com</a>: Jump on
                  this self-paced workshop and learn the smart, efficient way to test any
                  JavaScript application. 🏆
                </li>
              </ul>
            </div>
          </div>
        `

        const postText = `<div>${footer}</div><div style="margin-top=55px; font-style: italic;">(This article was posted to my blog at <a href="${blogUrl}">${blogUrl}</a>. You can <a href="${url}">read it online by clicking here</a>.)</div>`

        // Hacky workaround for https://github.com/gaearon/overreacted.io/issues/65
        const html = (edge.node.html || ``)
          .replace(/href="\//g, `href="${siteUrl}/`)
          .replace(/src="\//g, `src="${siteUrl}/`)
          .replace(/"\/static\//g, `"${siteUrl}/static/`)
          .replace(/,\s*\/static\//g, `,${siteUrl}/static/`)

        return {
          ...edge.node.frontmatter,
          description: edge.node.excerpt,
          date: edge.node.fields.date,
          url,
          guid: url,
          custom_elements: [
            {
              'content:encoded': `<div style="width: 100%; margin: 0 auto; padding: 40px 40px;">
                ${html}
                ${postText}
              </div>`,
            },
          ],
        }
      })
    },
    query: `
     {
       site {
         siteMetadata {
           title
           description
           siteUrl
           site_url: siteUrl
         }
       }

       allMdx(
         limit: 1000,
         filter: {
           frontmatter: {published: {ne: false}}
           fileAbsolutePath: {regex: "${filePathRegex}"}
         }
         sort: { order: DESC, fields: [frontmatter___date] }
       ) {
         edges {
           node {
             excerpt(pruneLength: 250)
             html
             fields {
               slug
               date
             }
             frontmatter {
               title
             }
           }
         }
       }
     }
   `,
    ...overrides,
  }
}
