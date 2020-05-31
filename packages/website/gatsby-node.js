/* eslint-env node */
const {setOcularConfig} = require('gatsby-theme-ocular');
const createPages = require('./gatsby-node/mdx-pages');
const onCreateNode = require('./gatsby-node/on-create-node');

const ocularConfig = require('./ocular-config');
setOcularConfig(ocularConfig);

module.exports.createPages = createPages;
module.exports.onCreateNode = onCreateNode;
