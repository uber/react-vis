const path = require('path');
const {log, COLOR} = require('gatsby-theme-ocular/src/utils/log');
const getPageTemplateUrl = require('gatsby-theme-ocular/src/gatsby-node/create-pages/get-page-template-url');
const ocularOptions = require('../ocular-config');

const MDX_TEMPLATE = path.resolve(__dirname, '../src/templates/mdx-page.js');

// Create static pages
// NOTE: gatsby does automatically build pages from **top level** `/pages`, folder
// but in ocular we keep those pages in the installed structure so gatsby can't see them

// if using simply path.relative(from, to) to files which are in the same folder, the resolved path is: '../to'.
// instead we do relative path between folders, then add the name of the target file in the end.
// in that same scenario, the relative path between folders will be '', and overall path just 'to'.

function linkFromFileToFile(sourceFile, targetFile) {
  const relativePathFromDirToDir = path.relative(path.dirname(sourceFile), path.dirname(targetFile));
  return path.join(relativePathFromDirToDir, path.basename(targetFile));
}

function addToRelativeLinks({source, target, rootFolder, edge, relativeLinks}) {
  // what we are doing here: for each markdown file, we create a mapping of different ways to
  // link to another markdown file that we will honor.

  // let's suppose that we want to go from a file:
  // - physical location: /docs/my-files/source.md, slug: /docs/chapter-1/source
  // to this file:
  // - phyiscal location: /docs/developer-guide/target.md, slug: /docs/advanced-usage/api-reference/target

  // by default, '../../advanced-usage/api/reference/target' would work (target file slug, relative to original slug)
  // '/docs/advanced-usage/api-reference/target' would also work (absolute target slug)
  // however, on github, those links wouldn't work as there is no phyiscal file behind that link.
  // in github however: '/docs/developer-guide/target.md' (file name relative to root) or
  // '../developer-guide/target.md' (relative file name) would work. Those links wouldn't work on the gatsby rendered
  // page however (until that).

  // we are creating a mapping so that ANY OF THESE 4 SYNTAXES would be honored.
  // So, authors can use links that refer to physical files, and gatsby will render a link that works - the same link
  // can work on github and gatsby

  // note that often, the physical location and the slug are the same!
  // However there is no guarantee that this will be the case.

  if (!source || !target) {
    log.log(
      {color: COLOR.YELLOW},
      `couldn't add relative link for: ${JSON.stringify({source, target})}`
    )();
    return {};
  }
  const relativeToCurrentFile = linkFromFileToFile(
    edge.node.fileAbsolutePath,
    source
  );
  const relativeToRootFolder = rootFolder && linkFromFileToFile(rootFolder, source);
  const relativeToCurrentSlug = linkFromFileToFile(edge.node.fields.path, target);

  const absoluteTarget = `/${target}`;

  return {
    ...relativeLinks,
    [relativeToCurrentFile]: absoluteTarget,
    [relativeToCurrentFile]: absoluteTarget,
    [relativeToRootFolder]: absoluteTarget,
    [relativeToCurrentSlug]: absoluteTarget,
    [target]: absoluteTarget
  };
}

function queryMarkdownDocs(graphql) {
  return graphql(
    `
      {
        allMdx {
          edges {
            node {
              fileAbsolutePath
              fields {
                slug
                path
              }
            }
          }
        }
        site {
          siteMetadata {
            config {
              ROOT_FOLDER
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      /* eslint no-console: "off" */
      console.log(result.errors);
      throw new Error(result.errors);
    }
    return result;
  });
}

// Walks all markdown nodes and creates a doc page for each node
function createDocMarkdownPages({graphql, actions}, ocularOptions) {
  const {createPage} = actions;

  return queryMarkdownDocs(graphql).then(result => {
    const rootFolder = ocularOptions.ROOT_FOLDER;
    const pathToSlug = result.data.allMdx.edges.map(({node}) => ({
      source: node.fileAbsolutePath,
      target: node.fields.slug
    }));

    result.data.allMdx.edges.forEach(edge => {
      let relativeLinks = {};
      pathToSlug.forEach(({source, target}) => {
        relativeLinks = addToRelativeLinks({
          source,
          target,
          rootFolder,
          edge,
          relativeLinks
        });
      });

      // console.log('Creating doc page at', edge.node.fields.path);

      // const componentUrl = getPageTemplateUrl('DOC_PAGE_URL', ocularOptions);

      createPage({
        path: edge.node.fields.path,
        component: MDX_TEMPLATE,
        context: {
          relativeLinks,
          slug: edge.node.fields.path,
          toc: 'docs'
        }
      });
    });
  });
}

module.exports = function createDocPages({graphql, actions}) {
  log.log(
    {color: COLOR.CYAN, priority: 1},
    `Creating MDX docs pages...`
  )();

  createDocMarkdownPages({graphql, actions}, ocularOptions);
};