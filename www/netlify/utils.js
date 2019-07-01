const unified = require('unified')
const markdown = require('remark-parse')
const remark2rehype = require('remark-rehype')
const doc = require('rehype-document')
const format = require('rehype-format')
const html = require('rehype-stringify')

function markdownToHtml(markdownString) {
  return unified()
    .use(markdown)
    .use(remark2rehype)
    .use(doc)
    .use(format)
    .use(html)
    .process(markdownString)
    .then(x => x.contents)
}

module.exports = {markdownToHtml}
