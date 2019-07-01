import React from 'react'
import parseQueryString from '../../lib/parse-query-string'

function ZencastrLink() {
  const [{link, retrievedLink}, dispatch] = React.useReducer(
    (state, {zencastr}) => {
      if (zencastr) {
        return {
          link: `https://zencastr.com/react-vis/${zencastr.toLowerCase()}`,
          retrievedLink: true,
        }
      } else {
        return {retrievedLink: true}
      }
    },
    {link: null, retrievedLink: false},
  )
  React.useEffect(() => {
    const qs = parseQueryString(window.location.search)
    dispatch(qs)
  }, [link])

  return (
    <div css={{minHeight: 80}}>
      {retrievedLink ? (
        link ? (
          <a
            css={{fontSize: '1.1em', fontWeight: 'bold'}}
            target="_blank"
            rel="noopener noreferrer"
            href={link}
          >
            Join Your Zencastr Here{' '}
            <span role="img" aria-label="microphone">
              🎙
            </span>
          </a>
        ) : (
          `Your calendar event will be updated with a link to this page that includes a link to your Zencastr page. Please watch for that update.`
        )
      ) : null}
    </div>
  )
}

export default ZencastrLink
