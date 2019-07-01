const {URL} = require('url')
const nodemailer = require('nodemailer')
const ow = require('ow')
const {markdownToHtml} = require('../utils')

const isEmail = ow.string.is(e => /^.+@.+\..+$/.test(e))

ow(
  process.env.EMAIL_PASSWORD,
  'EMAIL_PASSWORD environment variable is not set',
  ow.string.minLength(1),
)
ow(
  process.env.EMAIL_USERNAME,
  'EMAIL_USERNAME environment variable is not set to an email',
  isEmail,
)

const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
})

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
}

exports.handler = async event => {
  const runId = Date.now()
    .toString()
    .slice(-5)
  // eslint-disable-next-line no-console
  const log = (...args) => console.log(runId, ...args)

  const origin = new URL(event.headers.origin)
  const acceptable =
    (origin.hostname === 'localhost' &&
      process.env.NODE_ENV !== 'production') ||
    origin.hostname === 'kentcdodds.com'
  if (!acceptable) {
    return Promise.reject({
      statusCode: 403,
      body: 'Unacceptable request',
      headers,
    })
  }
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      body: 'CORS ok',
      headers,
    }
  }
  const {name, email, subject, body, ...otherData} = JSON.parse(event.body)

  try {
    log('> Validating input', ' name: ', name, ' email:', email)
    ow(name, 'Name is too short', ow.string.minLength(1))
    ow(name, 'Name is too long', ow.string.maxLength(60))
    ow(email, 'Email is invalid', isEmail)
    ow(
      subject,
      'Please keep the subject to a reasonable length',
      ow.any(ow.string.minLength(5), ow.string.maxLength(120)),
    )
    ow(
      body,
      'Please keep the body to a reasonable length',
      ow.any(ow.string.minLength(40), ow.string.maxLength(1001)),
    )
  } catch (e) {
    log('> Validation failed', e.message)
    return Promise.reject({
      statusCode: 403,
      body: e.message,
      headers,
    })
  }

  const otherDataString = JSON.stringify(otherData, null, 2)

  const text = `${body}\n\n---\n\nOther form data:\n\`\`\`\n${otherDataString}\n\`\`\`\n`
  const sender = `"${name}" <${email}>`

  const message = {
    from: sender,
    to: `"KCD Team" <team@kentcdodds.com>`,
    cc: sender,
    subject,
    text,
    html: await markdownToHtml(text),
  }

  try {
    log('> Sending...')
    await transporter.verify()
    await transporter.sendMail(message)
    log('> Send success!')
  } catch (error) {
    log('> Send failure!', error.message)
    return Promise.reject({
      statusCode: 500,
      body: error.message,
      headers,
    })
  }

  return {
    statusCode: 200,
    body: JSON.stringify({success: true}),
    headers,
  }
}
