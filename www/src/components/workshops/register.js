import React from 'react'
import {css} from '@emotion/core'
import theme from '../../../config/theme'
import {lighten, darken} from 'polished'
import {rhythm, fonts} from '../../lib/typography'
import {bpMaxSM} from '../../lib/breakpoints'
import Countdown from 'react-countdown-now'

const TitoWidget = props => {
  const {event, discount} = props
  const [titoWidgetReady, setWidgetReady] = React.useState(
    typeof window !== 'undefined' && window.hasOwnProperty('TitoWidget'),
  )

  React.useEffect(() => {
    if (titoWidgetReady) {
      window.TitoWidget.buildWidgets()
    } else {
      const original = window.titoWidgetCallback
      window.titoWidgetCallback = () => {
        if (original) {
          original()
        }
        setWidgetReady(true)
      }
      return () => {
        window.titoWidgetCallback = original
      }
    }
  }, [discount, event, titoWidgetReady])

  return (
    <div
      css={css`
        .tito-ticket {
          display: flex;
          flex-direction: column-reverse;
        }
        .clearfix {
          display: flex;
          flex-direction: column;
        }
        .tito-badge-link,
        .tito-discount-code,
        .tito-ticket-description,
        .tito-ticket-quantity > span {
          display: none;
        }
        .tito-ticket-name-wrapper {
          padding: 20px 0;
        }
        .tito-ticket-name {
          visibility: hidden;
          position: absolute;
          span {
            width: 200px;
            height: auto;
            position: absolute;
            left: 0;
            visibility: visible;
          }
          display: flex;
          flex-direction: row;
          align-content: center;
          justify-content: flex-start;
        }
        li {
          list-style: none;
        }
        .tito-ticket-price > span {
          display: flex;
          flex-direction: row-reverse;
          justify-content: flex-end;
          font-family: ${fonts.semibold}, sans-serif;
          margin-bottom: 7px;
        }
        .price-was {
          padding-top: 10px;
          padding-left: 5px;
        }
        .tito-ticket-quantity {
          margin-left: 90px;
        }
        .tito-ticket-quantity::before {
          content: 'Quantity:';
          position: absolute;
          margin-left: -90px;
          margin-top: 10px;
          color: black;
        }
        .tito-ticket-quantity-field {
          width: 95px;
        }
      `}
    >
      <tito-widget
        discount-code={discount && 'early'}
        event={`/kent-c-dodds/${event}`}
      />
    </div>
  )
}

export const DaysLeft = ({dealEndDate}) => (
  <Countdown
    date={dealEndDate}
    renderer={({days}) => {
      return (
        <div>
          {days > 0 ? (
            <p>
              The early bird discount of <strong>$200</strong> ends in{' '}
              <strong>{days}</strong> days!
            </p>
          ) : (
            ''
          )}
        </div>
      )
    }}
  />
)

export const Counter = ({dealEndDate}) => (
  <Countdown
    date={dealEndDate}
    renderer={({days, hours, minutes, seconds, completed}) => {
      return (
        <div
          css={css`
            padding: 11px 15px;
            background: ${lighten(0.41, `${theme.brand.primary}`)};
            span,
            div {
              color: ${theme.brand.primary} !important;
            }
            border-radius: 5px;
          `}
        >
          {!completed && (
            <div
              css={css`
                display: flex;
                text-align: center;
                flex-wrap: nowrap;
                align-items: center;
                font-variant-numeric: tabular-nums;
                font-size: 32px;
                span:not(:last-of-type) {
                  margin-right: ${rhythm(1)};
                }
                span > div {
                  font-size: 50%;
                  opacity: 0.7;
                }
                ${bpMaxSM} {
                  font-size: 28px;
                  span {
                    flex-grow: 1;
                  }
                }
              `}
            >
              <span>
                {days}
                <div>days</div>
              </span>
              <span>
                {hours}
                <div>hours</div>
              </span>
              <span>
                {minutes}
                <div>minutes</div>
              </span>
              <span>
                {seconds}
                <div>seconds</div>
              </span>
            </div>
          )}
        </div>
      )
    }}
  />
)

const Register = props => {
  const {title, restProps, light, discount, event, dealEndDate} = props
  return (
    <div
      id="register"
      css={css`
        width: 100%;
        margin: 0 auto;
        display: grid;
        grid-template-columns: ${title || dealEndDate ? '1fr 1fr' : '1fr'};
        border-radius: 5px;
        margin-top: ${rhythm(2.5)};
        margin-bottom: 50px;
        ${!light &&
          `
        background-image: linear-gradient(-213deg, #5e31dc 0%, #3155dc 100%),
          linear-gradient(
            32deg,
            rgba(255, 255, 255, 0.25) 33%,
            rgba(0, 0, 0, 0.25) 100%
          );`};
        background: ${light && 'white'};
        ${bpMaxSM} {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        h1,
        h2,
        h4,
        h3,
        p,
        div {
          color: ${light
            ? `${theme.colors.body_color}`
            : `${theme.colors.white}`};
        }
        h1 {
          color: ${theme.colors.body_color};
          font-size: 24px;
          max-width: ${rhythm(13)};
          margin-bottom: ${rhythm(1)};
          margin-top: 0;
        }
        h2,
        .tito-ticket-price {
          font-size: 48px;
          margin-bottom: 0;
        }

        .button,
        .tito-submit,
        .btn-waitlist {
          min-width: 230px;
          width: 100%;
          font-size: 18px;
          padding: 20px 25px;
          ${light
            ? `background-image: linear-gradient(-180deg, #8161ff 0%, #5b36d0 100%);`
            : `background: white;`}
          text-align: center;
          background-color: transparent;
          :hover {
            background-color: transparent;
            background-image: linear-gradient(
              -180deg,
              ${darken(0.1, '#8161ff')} 0%,
              ${darken(0.1, '#5b36d0')} 100%
            );
          }
          border: 1px solid transparent;
          color: ${light ? 'white' : `${theme.colors.body_color}`};
          border-radius: 5px;
        }
        s {
          font-size: 24px;
          text-transform: line-through;
          opacity: 0.8;
          font-family: ${fonts.regular};
        }
      `}
      {...restProps}
    >
      <div
        css={css`
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          border: 1px solid #f1f1f1;
          border-radius: 5px 0 0 5px;
          justify-content: space-between;
          padding: ${rhythm(2)};
          ${bpMaxSM} {
            border-radius: 5px 5px 0 0;
            width: 100%;
            h2 {
              margin-top: 0;
            }
            padding: ${rhythm(1)};
            justify-content: flex-start;
            text-align: center;
            align-items: center;
          }
        `}
      >
        <>
          <TitoWidget discount={discount} event={event} />
          <p>{props.children}</p>
        </>
      </div>
      {title ||
        (dealEndDate && (
          <div
            css={css`
              border-radius: 0 5px 5px 0;
              width: 100%;
              display: flex;
              align-items: flex-start;
              text-align: left;
              flex-direction: column;
              padding: ${rhythm(2)};
              box-shadow: inset 10px 0 30px hsla(0, 0%, 0%, 0.05);
              ${bpMaxSM} {
                box-shadow: inset 0 10px 30px hsla(0, 0%, 0%, 0.05);
                border-radius: 0 0 5px 5px;
              }
              p {
                font-family: ${fonts.light};
              }
              ${bpMaxSM} {
                padding: ${rhythm(1)};
                align-items: center;
                text-align: center;
              }
              h1 {
                line-height: 1.5;
              }
              background: #fafafa;
              border: 1px solid #f1f1f1;
            `}
          >
            {title && <h1>{title}</h1>}
            {dealEndDate && (
              <>
                <p>
                  Your chance to save <strong>$200</strong> in early bird
                  discount ends in:
                </p>
                <Counter dealEndDate={dealEndDate} />
              </>
            )}
          </div>
        ))}
    </div>
  )
}

export default Register
