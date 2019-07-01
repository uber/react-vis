export default function parseQueryString(str = '') {
  const decode = decodeURIComponent
  if (str.startsWith('?')) {
    str = str.slice(1)
  }
  return str
    .replace(/\+/g, ' ')
    .split('&')
    .filter(Boolean)
    .reduce((obj, item) => {
      const ref = item.split('=')
      const key = decode(ref[0] || '')
      const val = decode(ref[1] || '')
      const prev = obj[key]
      obj[key] = prev === undefined ? val : [].concat(prev, val)
      return obj
    }, {})
}
