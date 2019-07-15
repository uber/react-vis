import React from 'react'
// import Link from '../components/link'
import {css} from '@emotion/core'
// import theme from '../../config/theme'
// import {bpMaxSM} from '../lib/breakpoints'
// import SubscribeForm from './forms/subscribe'
import {Twitter, GitHub, YouTube} from './social'
// import Container from './container'

// import Signature from '../images/signature.png'

const Footer = () => (
  // {subscribeForm = <SubscribeForm />}
  <footer
    css={css`
      border-top: 1px solid #f2f2f2;
      color: black;
      line-height: 6rem;
    `}
  >
    {/*subscribeForm ? (
        <div css={{marginTop: -40}}>
          {subscribeForm}
          <br />
          <br />
        </div>
      ) : null*/}
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      `}
    >
      <div>
        <Twitter />
        <GitHub />
        <YouTube />
      </div>

      {/*<Link to="/" aria-label="Return to homepage">
          <img
            src={Signature}
            alt="React Vis"
            css={css`
              max-width: 100px;
            `}
          />
        </Link>*/}
    </div>
  </footer>
)

export default Footer
