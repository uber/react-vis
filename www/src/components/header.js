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
})

const Header = ({
  dark,
  bgColor = 'none',
  siteTitle,
  headerLink = '/',
  headerColor = 'black',
  fixed = false,
}) => (
  <header
    css={css`
      width: 100%;
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
          img: {
            marginBottom: 0,
            maxWidth: '50px',
            position: 'absolute',
            borderRadius: '100%',
            background:
              headerColor === '#fff' ? 'rgba(40, 28, 77, 0.7)' : '#f1f1f1',
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
          line-height: 1.25;
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
          to="/blog/"
          aria-label="View blog page"
        >
          Blog
        </NavLink>
        <NavLink
          headerColor={headerColor}
          to="/talks/"
          aria-label="View talks page"
        >
          Talks
        </NavLink>
        {/*<NavLink
            headerColor={headerColor}
            to="/workshops/"
            aria-label="View workshops page"
          >
            Workshops
          </NavLink>*/}
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
          {GitHubIcon}
        </NavLink>
      </div>
    </nav>
  </header>
)

export default Header
