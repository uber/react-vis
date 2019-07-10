import {css} from '@emotion/core'
import CalendarIcon from '../../images/icons/calendar.svg'
import LocationIcon from '../../images/icons/location.svg'
import TimeIcon from '../../images/icons/time.svg'
import {headerFontFamily} from '../../lib/typography'
import theme from '../../../config/theme'
import {bpMaxSM} from '../../lib/breakpoints'

const styles = css`
  background: ${theme.colors.white};
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 40px;
  ${bpMaxSM} {
    padding: 20px;
  }
  img {
    margin-bottom: 0;
  }
  h1 {
    margin-top: 0;
    font-family: ${headerFontFamily}, sans-serif;
    font-weight: 700;
    font-size: 26px;
  }
  time {
    margin-left: 22px;
    margin-bottom: 0;
    ::before {
      content: '';
      width: 16px;
      height: 16px;
      position: absolute;
      background-size: 16px 16px;
      background: url(${TimeIcon}) no-repeat 0 0 transparent;
      margin-left: -22px;
      margin-top: 5px;
    }
  }
  .date {
    margin-left: 22px;
    margin-bottom: 0;
    ::before {
      content: '';
      width: 16px;
      height: 16px;
      position: absolute;
      background-size: 16px 16px;
      background: url(${CalendarIcon}) no-repeat 0 0 transparent;
      margin-left: -22px;
      margin-top: 5px;
    }
  }
  address {
    margin-left: 22px;
    font-style: normal;
    margin-bottom: 0;
    ::before {
      content: '';
      width: 13px;
      height: 17px;
      position: absolute;
      background-size: 13px 17px;
      background: url(${LocationIcon}) no-repeat 0 0 transparent;
      margin-left: -20px;
      margin-top: 5px;
    }
  }
  .button {
    font-size: 16px;
    padding: 15px 20px;
    background-image: linear-gradient(-180deg, #8161ff 0%, #5b36d0 100%);
    text-align: center;
    border: 1px solid transparent;
    color: white;
    border-radius: 5px;
    :hover {
      background-image: linear-gradient(-180deg, #4054f4 0%, #3647ce 100%);
      border: 1px solid transparent;
    }
  }
`
export default styles
