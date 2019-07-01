import React from 'react'
import {css} from '@emotion/core'
import Link from '../link'
import theme from '../../../config/theme'
import {rhythm} from '../../lib/typography'
import styles from './styles'
import {bpMaxSM} from '../../lib/breakpoints'
import Markdown from 'react-markdown'
import jsIcon from '../../images/icons/js.svg'
import reactIcon from '../../images/icons/react.svg'
import testingIcon from '../../images/icons/testing.svg'

function Workshop({title, description, url, tech}) {
  const techImage = workshopTech => {
    return (
      (workshopTech === 'react' && `${reactIcon}`) ||
      (workshopTech === 'javascript' && `${jsIcon}`) ||
      (tech === 'testing' && `${testingIcon}`)
    )
  }
  return (
    <Link to={url}>
      <div
        css={css`
          ${styles}
          margin: 0;
          h1 {
            font-size: 22px;
            min-height: 55px;
            ${bpMaxSM} {
              min-height: auto;
            }
          }
          img {
            margin-bottom: 0;
          }
        `}
      >
        <h1>{title}</h1>
        {description && (
          <Markdown
            css={css`
              p {
                font-size: 16px;
                color: hsla(0, 0%, 0%, 0.75);
                margin-top: ${rhythm(0.5)};
              }
              height: 180px;
              overflow: hidden;
            `}
          >
            {description}
          </Markdown>
        )}
        <div
          css={css`
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
          `}
        >
          <span
            css={css`
              color: ${theme.brand.primary};
            `}
          >
            Learn more
          </span>
          <img src={techImage(tech)} alt={tech} />
        </div>
      </div>
    </Link>
  )
}

export default Workshop
