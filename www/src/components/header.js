import React from 'react'
import Link from './link'
import {css} from '@emotion/core'
import styled from '@emotion/styled'

import logo from './logo'
import theme from '../../config/theme'
import {headerFontFamily, bodyFontFamily} from '../lib/typography'
import MobileNav from './mobile-nav'
import {GitHubIcon} from './social'
import {bpMaxSM} from '../lib/breakpoints'
import config from '../../config/website'

function HeaderLink(props) {
  return (
    <Link
      activeClassName="active"
      css={{
        textDecoration: 'none',
        color: theme.colors.body_color,
        borderRight: '1px solid #f2f2f2',
        '&:hover': {
          background: '#f2f2f2',
        },
        '&:focus': {
          background: '#c0c0c0',
          outline: 'none',
        },
      }}
      {...props}
    />
  )
}

const NavLink = styled(HeaderLink)({
  padding: '0 1.5rem',
  lineHeight: '4rem',
  background: 'transparent',
  [bpMaxSM]: {
    display: 'none',
  },
  '&.active': {
    background: '#c0c0c0',
  },
  svg: {
    height: '1.25em',
    marginLeft: '0.5em',
    marginTop: '-2px',
  },
})

const Header = ({
  dark,
  bgColor = 'none',
  siteTitle,
  headerLink = '/',
  headerColor = 'black',
  fixed = false,
}) => {
  const [numStars, setStars] = React.useState(null)

  if (!numStars) {
    fetch(`https://api.github.com/repos/uber/react-vis`)
      .then(res => res.json())
      .then(json => setStars(json.stargazers_count))
  }

  return (
    <header
      css={css`
        width: 100%;
        line-height: 4rem;
        border-bottom: 1px solid #f2f2f2;
        flex-shrink: 0;
        background: none;
        font-family: ${bodyFontFamily};
        background: ${dark ? '#090909' : `${bgColor}` || 'none'};
        z-index: 10;
        position: ${fixed ? 'fixed' : 'absolute'};
        top: 0;
      `}
    >
      <nav
        css={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <HeaderLink
          to={headerLink}
          aria-label="go to homepage"
          headerColor={headerColor}
          css={{
            fontFamily: headerFontFamily,
            fontWeight: 600,
            padding: '0 1.5rem',
            display: 'flex',
            lineHeight: '4rem',
            alignItems: 'center',
            svg: {
              height: '2em',
              marginRight: '0.75em',
            },
            ':hover, :focus': {
              background: 'transparent',
            },
          }}
        >
          {logo}
          <span>{siteTitle}</span>
        </HeaderLink>
        <div
          css={css`
            font-size: 16px;
            display: flex;
            align-items: center;
            .mobile-nav {
              display: none;
              visibility: hidden;
              ${bpMaxSM} {
                display: block;
                visibility: visible;
              }
            }
          `}
        >
          <MobileNav color={headerColor} />
          <NavLink
            headerColor={headerColor}
            to="/quickstart/"
            aria-label="Quickstart"
          >
            Quick Start
          </NavLink>
          <NavLink
            headerColor={headerColor}
            to="/talks/"
            aria-label="View talks page"
          >
            Talks
          </NavLink>
          <NavLink
            headerColor={headerColor}
            to="/about/"
            aria-label="View about page"
          >
            About
          </NavLink>
          <NavLink
            headerColor={headerColor}
            to={config.github}
            aria-label="View about page"
          >
            GitHub
            {GitHubIcon}
          </NavLink>
          {numStars ? (
            <div
              css={css`
                padding: 0 1.5rem;
                display: flex;
                align-items: center;
                svg {
                  margin-left: 0.5rem;
                }
              `}
            >
              {numStars}
              <svg
                fill="currentColor"
                preserveAspectRatio="xMidYMid meet"
                height="1em"
                width="1em"
                viewBox="0 0 40 40"
              >
                <g>
                  <path d="m37.5 15l-12.2-1.6-5.3-10.9-5.3 10.9-12.2 1.6 9 8.2-2.3 11.8 10.8-5.8 10.8 5.8-2.3-11.8 9-8.2z" />
                </g>
              </svg>
            </div>
          ) : null}
        </div>
      </nav>
    </header>
  )
}

export default Header
