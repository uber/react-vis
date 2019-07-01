const {URL} = require('url')
const fetch = require('node-fetch')

function shouldTransform(string) {
  const {host, pathname} = new URL(string)
  return host.endsWith('twitter.com') && pathname.includes('/status/')
}

function getTwitterHtml(string) {
  return fetch(
    `https://publish.twitter.com/oembed?url=${string}&omit_script=true`,
  )
    .then(r => r.json())
    .then(r => {
      return [r.html]
        .map(s => s.replace(/\?ref_src=twsrc.*?fw/g, ''))
        .map(s => s.replace(/<br>/g, '<br />'))
        .join('')
        .trim()
    })
}

module.exports = getTwitterHtml
module.exports.shouldTransform = shouldTransform
