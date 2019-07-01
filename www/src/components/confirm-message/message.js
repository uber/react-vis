import React from 'react'
import {css, keyframes} from '@emotion/core'
import styled from '@emotion/styled'
import Markdown from 'react-markdown'
import Link from '../link'
import {bpMaxSM} from '../../lib/breakpoints'

export default function Message({
  illustration,
  title,
  body,
  note,
  fullscreen = false,
  articleTitle,
  articleSlug,
}) {
  return (
    <Center
      css={css`
        min-height: ${fullscreen ? '70vh' : 'auto'};
        ${bpMaxSM} {
          min-height: auto;
        }
      `}
    >
      <div>{illustration}</div>
      <h2>{title}</h2>
      {body && <Markdown>{body}</Markdown>}
      {note && (
        <div
          className={css`
            color: rgba(0, 0, 0, 0.7);
            transform: scale(0.85);
            span:hover {
              opacity: 1;
              color: rgba(0, 0, 0, 1);
            }
          `}
        >
          <span>
            <Markdown>{note}</Markdown>
          </span>
        </div>
      )}
      {articleTitle && (
        <div>
          <Link to={`/${articleSlug}`}>{articleTitle}</Link>
        </div>
      )}
    </Center>
  )
}

const FadeIn = keyframes`
from, 0% {
    opacity: 0;
}
to, 100% {
    opacity: 1;
}
`
export const Center = styled.div`
  width: 100vw;
  max-width: 100% !important;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  p {
    margin-top: 10px;
    max-width: 400px;
    line-height: 1.5;
    font-weight: 400;
    strong {
      font-weight: 600;
    }
    animation: ${FadeIn} 600ms ease-in-out 1;
  }
  h2 {
    font-size: 26px;
    font-weight: 400;
    margin-bottom: 0;
    margin-top: 25px;
    animation: ${FadeIn} 400ms ease-in-out 1;
  }
`
