import React from 'react'
import ReactDOM from 'react-dom'
import {css} from '@emotion/core'
import theme from '../../config/theme'
import parseQueryString from '../lib/parse-query-string'

// this component is one big shrug. I didn't have time to get good at animation
// and it's such a simple single-use component hack something I could ship...
function NotificationMessage({queryStringKey, children}) {
  const portalContainerRef = React.useRef(null)
  const [showMessage, setShowMessage] = React.useState(false)
  const [animateIn, setAnimateIn] = React.useState(false)
  React.useEffect(() => {
    portalContainerRef.current = document.createElement('div')
    Object.assign(portalContainerRef.current.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 11,
    })
    document.body.append(portalContainerRef.current)
  }, [])

  React.useEffect(() => {
    if (
      parseQueryString(window.location.search).hasOwnProperty(queryStringKey)
    ) {
      setTimeout(() => {
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
        }, 8000)
      }, 200)
    }
  }, [queryStringKey])

  React.useEffect(() => {
    if (showMessage) {
      setAnimateIn(true)
      setTimeout(() => setAnimateIn(false), 7500)
    }
  }, [showMessage])

  if (showMessage) {
    return ReactDOM.createPortal(
      <button
        onClick={() => setAnimateIn(false)}
        css={css`
          border-radius: 0;
          width: 100%;
          padding: 20px;
          display: flex;
          justify-content: center;
          background-color: ${theme.colors.green};
          color: ${theme.colors.primary_light};
          transition: 0.3s;
          transform: translateY(${animateIn ? '0' : '-85'}px);
        `}
      >
        {children}
      </button>,
      portalContainerRef.current,
    )
  } else {
    return null
  }
}

export default NotificationMessage
