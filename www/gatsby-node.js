const path = require('path')
const slugify = require('@sindresorhus/slugify')
const {createFilePath} = require('gatsby-source-filesystem')
const remark = require('remark')
const stripMarkdownPlugin = require('strip-markdown')
const _ = require('lodash')

const PAGINATION_OFFSET = 7

function stripMarkdown(markdownString) {
  return remark()
    .use(stripMarkdownPlugin)
    .processSync(markdownString)
    .toString()
}

const createPosts = (createPage, edges) => {
  edges.forEach(({node}, i) => {
    const prev = i === 0 ? null : edges[i - 1].node
    const next = i === edges.length - 1 ? null : edges[i + 1].node
    const pagePath = node.fields.slug

    createPage({
      path: pagePath,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        id: node.id,
        prev,
        next,
      },
    })
  })
}

function createBlogPages({blogPath, data, paginationTemplate, actions}) {
  if (_.isEmpty(data.edges)) {
    throw new Error('There are no posts!')
  }

  const {edges} = data
  const {createPage} = actions
  createPosts(createPage, edges)
  createPaginatedPages(
    actions.createPage,
    edges,
    blogPath,
    paginationTemplate,
    {
      categories: [],
    },
  )
  return null
}

exports.createPages = async ({actions, graphql}) => {
  const {data, errors} = await graphql(`
    fragment PostDetails on Mdx {
      fileAbsolutePath
      id
      parent {
        ... on File {
          name
          sourceInstanceName
        }
      }
      excerpt(pruneLength: 250)
      fields {
        title
        slug
        description
        date
      }
      code {
        scope
      }
    }
    query {
      quickstart: allMdx(
        filter: {
          frontmatter: {published: {ne: false}}
          fileAbsolutePath: {regex: "//content/quickstart//"}
        }
        sort: {order: DESC, fields: [frontmatter___date]}
      ) {
        edges {
          node {
            ...PostDetails
          }
        }
      }
    }
  `)

  if (errors) {
    return Promise.reject(errors)
  }

  const {quickstart} = data

  createBlogPages({
    blogPath: '/quickstart',
    data: quickstart,
    paginationTemplate: path.resolve(`src/templates/quickstart.js`),
    actions,
  })
}

exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}

function createPaginatedPages(
  createPage,
  edges,
  pathPrefix,
  paginationTemplate,
  context,
) {
  const pages = edges.reduce((acc, value, index) => {
    const pageIndex = Math.floor(index / PAGINATION_OFFSET)

    if (!acc[pageIndex]) {
      acc[pageIndex] = []
    }

    acc[pageIndex].push(value.node.id)

    return acc
  }, [])

  pages.forEach((page, index) => {
    const previousPagePath = `${pathPrefix}/${index + 1}`
    const nextPagePath = index === 1 ? pathPrefix : `${pathPrefix}/${index - 1}`

    createPage({
      path: index > 0 ? `${pathPrefix}/${index}` : `${pathPrefix}`,
      component: paginationTemplate,
      context: {
        pagination: {
          page,
          nextPagePath: index === 0 ? null : nextPagePath,
          previousPagePath:
            index === pages.length - 1 ? null : previousPagePath,
          pageCount: pages.length,
          pathPrefix,
        },
        ...context,
      },
    })
  })
}

// eslint-disable-next-line complexity
exports.onCreateNode = ({node, getNode, actions}) => {
  const {createNodeField} = actions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    let slug =
      node.frontmatter.slug ||
      createFilePath({node, getNode, basePath: `pages`})

    if (node.fileAbsolutePath.includes('content/quickstart/')) {
      slug = `/quickstart/${node.frontmatter.slug || slugify(parent.name)}`
    }

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    })

    createNodeField({
      name: 'published',
      node,
      value: node.frontmatter.published,
    })

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    })

    createNodeField({
      name: 'author',
      node,
      value: node.frontmatter.author || 'React Vis',
    })

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description,
    })

    createNodeField({
      name: 'plainTextDescription',
      node,
      value: stripMarkdown(node.frontmatter.description),
    })

    createNodeField({
      name: 'slug',
      node,
      value: slug,
    })

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date ? node.frontmatter.date.split(' ')[0] : '',
    })

    createNodeField({
      name: 'banner',
      node,
      value: node.frontmatter.banner,
    })

    createNodeField({
      name: 'bannerCredit',
      node,
      value: node.frontmatter.bannerCredit,
    })

    createNodeField({
      name: 'categories',
      node,
      value: node.frontmatter.categories || [],
    })

    createNodeField({
      name: 'keywords',
      node,
      value: node.frontmatter.keywords || [],
    })

    createNodeField({
      name: 'editLink',
      node,
      value: `https://github.com/uber/react-vis/react-vis.com/edit/master${node.fileAbsolutePath.replace(
        __dirname,
        '',
      )}`,
    })
  }
}

/* eslint consistent-return:0 */
