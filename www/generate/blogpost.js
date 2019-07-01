const path = require('path')
const fs = require('fs')
const util = require('util')
const jsToYaml = require('json-to-pretty-yaml')
const mkdirp = require('mkdirp')
const fakeUa = require('fake-useragent')
const opn = require('opn')
const axios = require('axios')
const slugify = require('@sindresorhus/slugify')
const inquirer = require('inquirer')
const prettier = require('prettier')
const tinify = require('tinify')
const ora = require('ora')
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

  const bannerCredit = await getBannerPhoto(title, destination)

  const yaml = jsToYaml.stringify(
    removeEmpty({
      slug,
      title,
      date: formatDate(new Date()),
      author: 'Kent C. Dodds',
      description: `_${description}_`,
      categories: listify(categories),
      keywords: listify(keywords),
      banner: './images/banner.jpg',
      bannerCredit,
    }),
  )
  const markdown = prettier.format(`---\n${yaml}\n---\n`, {
    ...require('../prettier.config'),
    parser: 'mdx',
  })
  fs.writeFileSync(path.join(destination, 'index.md'), markdown)

  console.log(`${destination.replace(process.cwd(), '')} is all ready for you`)
}

async function getBannerPhoto(title, destination) {
  const imagesDestination = path.join(destination, 'images')

  await opn(`https://unsplash.com/search/photos/${encodeURIComponent(title)}`, {
    wait: false,
  })

  const {unsplashPhotoId} = await inquirer.prompt([
    {
      type: 'input',
      name: 'unsplashPhotoId',
      message: `What's the Unsplash Photo ID for the banner for this post?`,
    },
  ])
  mkdirp.sync(imagesDestination)

  const source = tinify
    .fromUrl(
      `https://unsplash.com/photos/${unsplashPhotoId}/download?force=true`,
    )
    .resize({
      method: 'scale',
      width: 2070,
    })

  const spinner = ora('compressing the image with tinypng.com').start()
  await util
    .promisify(source.toFile)
    .call(source, path.join(imagesDestination, 'banner.jpg'))
  spinner.text = 'compressed the image with tinypng.com'
  spinner.stop()

  const bannerCredit = await getPhotoCredit(unsplashPhotoId)
  return bannerCredit
}

async function getPhotoCredit(unsplashPhotoId) {
  const response = await axios({
    url: `https://unsplash.com/photos/${unsplashPhotoId}`,
    headers: {'User-Agent': fakeUa()},
  })
  const {
    groups: {title},
  } = response.data.match(/<title.*?>(?<title>.*?)<\/title>/) || {
    groups: {title: 'by Unknown ('},
  }
  const {
    groups: {name},
  } = title.match(/by (?<name>.+?) \(/) || {groups: {name: 'Unknown'}}
  return `Photo by [${name}](https://unsplash.com/photos/${unsplashPhotoId})`
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
