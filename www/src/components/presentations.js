import React from 'react'
import {css} from '@emotion/core'
import {isEmpty} from 'lodash'
import Markdown from 'react-markdown'
import {bpMaxSM} from '../lib/breakpoints'

function Presentations({presentations}) {
  return presentations.map(
    ({title, slug, description, deliveries, resources, tags}) => (
      <div
        key={title}
        css={css`
          background: white;
          border-radius: 5px;
          padding: 40px;
          ${bpMaxSM} {
            padding: 20px;
          }
          margin-bottom: 20px;
          ul {
            list-style: none;
            margin: 0;
          }
          h4 {
            text-transform: uppercase;
            opacity: 0.6;
            font-size: 13px;
            letter-spacing: 1px;
            line-height: 34px;
            margin: 10px 0;
          }
          h2 {
            margin: 0;
            margin-right: 5px;
            flex: 1 1;
            ${bpMaxSM} {
              margin-bottom: 10px;
            }
            max-width: 80%;
            ${bpMaxSM} {
              max-width: 100%;
            }
          }
          hr {
            margin: 20px 0;
            opacity: 0.5;
          }
          li > time {
            float: right;
            font-size: 14px;
            opacity: 0.8;
          }
          li {
            display: flex;
            align-items: center;
            margin: 0;
            margin-bottom: 10px;
            justify-content: space-between;
          }

          .tags {
            display: flex;
            flex-wrap: wrap;
            margin: -2.5px;
          }

          .tag {
            padding: 8px 10px;
            background: white;
            border: 1px solid #f1f1f1;
            border-radius: 3px;
            font-size: 16px;
            margin: 2.5px;
            ${bpMaxSM} {
              padding: 6px 8px;
              font-size: 14px;
            }
          }
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
            ${bpMaxSM} {
              flex-direction: column;
              align-items: flex-start;
            }
            a {
              color: inherit;
            }
          `}
        >
          <h2>
            <a href={`#${slug}`} name={slug}>
              {title}
            </a>
          </h2>
          <div className="tags">
            {tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div
          css={css`
            margin-top: 20px;
            font-size: 16px;
          `}
        >
          <Markdown source={description} />
        </div>
        <hr />
        {!isEmpty(deliveries) && <h4>Presentations</h4>}
        <ul>
          {deliveries.map((delivery, index) => (
            <li key={index}>
              <div
                css={{
                  display: 'flex',
                  alignItems: 'center',
                  '& > p': {marginBottom: 0},
                }}
              >
                <Markdown source={delivery.event} />
                {delivery.recording ? (
                  <a
                    css={{fontSize: '0.8rem', marginLeft: 10}}
                    href={delivery.recording}
                  >
                    <span role="img" aria-label="recording">
                      📺
                    </span>
                  </a>
                ) : null}
              </div>
              <FutureTime date={delivery.date} />
            </li>
          ))}
        </ul>
        {!isEmpty(resources) && <h4>Resources</h4>}
        <ul>
          {resources.map((resource, i) => (
            <li key={i}>
              <Markdown source={resource} />
            </li>
          ))}
        </ul>
      </div>
    ),
  )
}

function FutureTime({date: dateString}) {
  const [year, month, day] = dateString.split('-')
  const date = new Date(year, month - 1, day)
  const isFuture = date > new Date()
  return (
    <span>
      <time>{dateString}</time>
      <small css={{opacity: '0.8'}}>{isFuture ? ' future ⚡️' : null}</small>
    </span>
  )
}

export default Presentations
