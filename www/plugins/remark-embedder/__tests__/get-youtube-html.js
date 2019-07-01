import cases from 'jest-in-case'
import {
  getYouTubeIFrameSrc,
  shouldTransform,
  getTimeValueInSeconds,
} from '../get-youtube-html'

cases(
  'url validation',
  ({url, valid}) => {
    expect(shouldTransform(url)).toBe(valid)
  },
  {
    'url with youtube': {url: 'https://not-a-youtube-url.com', valid: false},
    'short url': {
      url: 'https://youtu.be/dQw4w9WgXcQ',
      valid: true,
    },
  },
)

cases(
  'get youtube ids',
  ({url, iframe}) => {
    expect(getYouTubeIFrameSrc(url)).toBe(iframe)
  },
  {
    'short url': {
      url: 'https://youtu.be/dQw4w9WgXcQ',
      iframe: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',
    },
    'http url': {
      url: 'http://youtu.be/dQw4w9WgXcQ',
      iframe: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',
    },
    'with list and time params': {
      url: 'https://youtu.be/dQw4w9WgXcQ?list=123&t=23',
      iframe:
        'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&list=123&start=23',
    },
    'full url': {
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      iframe: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',
    },
    'full url with list param': {
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ&list=123',
      iframe:
        'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&list=123',
    },
    'full url with list and time param': {
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ&t=123',
      iframe:
        'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&start=123',
    },
    'time with seconds': {
      url: 'https://youtu.be/dQw4w9WgXcQ?t=23s',
      iframe:
        'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&start=23',
    },
  },
)

cases(
  'getTimeValueInSeconds',
  ({value, seconds}) => {
    expect(getTimeValueInSeconds(value)).toBe(seconds)
  },
  [
    {value: '23s', seconds: '23'},
    {value: '2m1s', seconds: '121'},
    {value: '1h', seconds: '3600'},
    {value: '1h1m1s', seconds: '3661'},
  ].map(opts => ({
    name: `${opts.value} -> ${opts.seconds}`,
    ...opts,
  })),
)
