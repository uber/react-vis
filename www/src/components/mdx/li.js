import React from 'react'
import {css} from '@emotion/core'
import {bpMaxSM} from '../../lib/breakpoints'
import CheckIcon from '../../images/check.svg'

const Li = ({children, check}) => {
  return (
    <li
      css={css({
        verticalAlign: 'middle',
        listStyleType: check ? 'none' : 'circle',
        background: check && `url(${CheckIcon}) no-repeat 0 2px transparent`,
        paddingLeft: check ? '40px' : '0',
        [bpMaxSM]: {
          paddingLeft: check ? '35px' : '0',
        },
      })}
    >
      {children}
    </li>
  )
}

export default Li
