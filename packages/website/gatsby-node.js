const config = require('./ocular-config');
const getGatsbyNodeCallbacks = require('ocular-gatsby/gatsby-node');

module.exports = getGatsbyNodeCallbacks(config);

// NOTE: It is possible to override the ocular-provided callbacks
// and this take control any aspect of gatsby:

// exports.onCreateNode = ({ node, actions, getNode }) =>
//   ocular.onCreateNode({ node, actions, getNode });

// exports.setFieldsOnGraphQLNodeType = ({ type, actions }) =>
//   ocular.setFieldsOnGraphQLNodeType({ type, actions });

// // This is a main gatsby entry point
// // Here we get to programmatically create pages after all nodes are created
// // by gatsby.
// // We use graphgl to query for nodes and iterate
// exports.createPages = ({ graphql, actions }) =>
//   ocular.createPages({ graphql, actions });
