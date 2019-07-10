import React from 'react'
import {css} from '@emotion/core'
import {headerFontFamily, rhythm} from '../../lib/typography'
import {bpMaxSM} from '../../lib/breakpoints'
import theme from '../../../config/theme'
import {lighten} from 'polished'
import styles from './styles'
import discountStripe from '../../images/icons/stripe.svg'
import {format} from 'date-fns'
import TimeRange from './time-range'

const Discount = ({discount}) => (
  <>
    {discount && (
      <div
        css={css`
          padding: 0 0 15px 0;
        `}
      >
        <em>
          early bird ends:{' '}
          {format(new Date(discount.ends), 'MMM Do, YYYY h:mm a (ZZ)')}!
        </em>
      </div>
    )}
  </>
)

const Stripe = ({discount, ...props}) => (
  <div
    css={css`
      ${discount
        ? `
        display: block;
        position: absolute;
        width: 70px;
        height: 70px;
        background-image: url(${discountStripe});
        background-size: 100% 100%;
        background-repeat: no-repeat;
      margin-top: -42px;
      margin-left: -42px;
      ${bpMaxSM} {
        margin-top: -21px;
        margin-left: -21px;
        width: 40px;
        height: 40px;
        h1 {
          margin-top: ${discount ? '40px' : 'auto'};
        }
      }
      `
        : `display: none;`}
    `}
    {...props}
  />
)

const Header = ({
  discount = false,
  children,
  title,
  date,
  location,
  soldOut = false,
  buttonText,
  startTime,
  endTime,
  url,
}) => {
  const ticketUrl = discount ? discount.url : url

  return (
    <div
      css={css`
        ${styles}
        background: white;
        border-radius: 5px;
        padding: 40px;
        ${bpMaxSM} {
          padding: 20px;
          margin-left: 0;
          margin-right: 0;
        }
        h1 {
          font-size: 1.75rem;
          font-family: ${headerFontFamily}, sans-serif;
          margin-top: 10px;
          margin-bottom: ${date ? location : buttonText ? '0.775rem' : 0};
        }
        h4 {
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0 0 5px 0;
          opacity: 0.7;
        }

        img,
        .gatsby-image-wrapper {
          margin: 0;
          width: 100%;
          max-width: 280px;
          ${bpMaxSM} {
            max-width: 200px;
          }
        }

        .button {
          margin-top: ${rhythm(1)};
          background: ${lighten(0.4, `${theme.brand.primary}`)};
          color: ${theme.brand.primary};
          :hover {
            background: ${lighten(0.35, `${theme.brand.primary}`)};
            color: ${theme.brand.primary};
          }
        }
      `}
    >
      <Stripe discount={discount} />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;

          ${bpMaxSM} {
            margin-top: ${rhythm(2)};
            width: 100%;
            padding-right: 0;
            padding-left: 0;
          }
        `}
      >
        <h4>Remote Workshop</h4>
        {title && <h1>{title}</h1>}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            //flex-wrap: wrap;
            //display: grid;
            //grid-gap: 10px;
            //grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
            transition: ${theme.transition.ease};
            i {
              font-size: 16px;
            }
          `}
        >
          <Discount discount={discount} />
          {date ? (
            <div className="date">
              {format(new Date(startTime), 'MMM Do, YYYY')}
            </div>
          ) : (
            <div className="date">TBA</div>
          )}

          {startTime ? (
            <TimeRange startTime={startTime} endTime={endTime} />
          ) : (
            <time>TBA</time>
          )}
          {location ? (
            <address>{location}</address>
          ) : (
            <address>
              <span>Zoom</span> <i>(you will receive a link via email)</i>
            </address>
          )}
        </div>

        {children}
        {buttonText && date && (
          <a href={ticketUrl} className="button" aria-label="purchase tickets">
            {soldOut ? 'Join the waiting list' : buttonText}
          </a>
        )}
      </div>
    </div>
  )
}

export default Header
