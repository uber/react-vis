const path = require('path')
const fs = require('fs')
const jsToYaml = require('json-to-pretty-yaml')
const mkdirp = require('mkdirp')
const slugify = require('@sindresorhus/slugify')
const inquirer = require('inquirer')
const prettier = require('prettier')
const tinify = require('tinify')
require('dotenv').config({
  path: path.join(__dirname, '.env'),
})

const fromRoot = (...p) => path.join(__dirname, '..', ...p)

tinify.key = process.env.TINY_PNG_API_KEY

const padLeft0 = n => n.toString().padStart(2, '0')
const formatDate = d =>
  `${d.getFullYear()}-${padLeft0(d.getMonth() + 1)}-${padLeft0(d.getDate())}`

const listify = a =>
  a && a.trim().length
    ? a
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
    : null

async function generateBlogPost() {
  const {title, description, categories, keywords} = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Title',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description',
    },
    {
      type: 'input',
      name: 'categories',
      message: 'Categories (comma separated)',
    },
    {
      type: 'input',
      name: 'keywords',
      message: 'Keywords (comma separated)',
    },
  ])
  const slug = slugify(title)
  const destination = fromRoot('content/blog', slug)
  mkdirp.sync(destination)

  const yaml = jsToYaml.stringify(
    removeEmpty({
      slug,
      title,
      date: formatDate(new Date()),
      author: 'React Vis',
      description: `_${description}_`,
      categories: listify(categories),
      keywords: listify(keywords),
    }),
  )
  const markdown = prettier.format(`---\n${yaml}\n---\n`, {
    ...require('../prettier.config'),
    parser: 'mdx',
  })
  fs.writeFileSync(path.join(destination, 'index.md'), markdown)

  console.log(`${destination.replace(process.cwd(), '')} is all ready for you`)
}

function removeEmpty(obj) {
  return Object.entries(obj).reduce((o, [key, value]) => {
    if (value) {
      o[key] = value
    }
    return o
  }, {})
}

generateBlogPost()

/* eslint no-console:0 */
