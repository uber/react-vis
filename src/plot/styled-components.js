/* eslint-disable camelcase */
import React from 'react';
import {styled, withWrapper} from 'styletron-react';

const styledWithClass = (elem, className, styleObj) => {
  // eslint-disable-next-line react/display-name
  return withWrapper(styled(elem, styleObj), Styled => props => (
    <Styled className={className} {...props} />
  ));
}

export const XYPlotInnerSvg = styledWithClass(
  'svg',
  'rv-xy-plot__inner',
  {
    display: 'block',
  }
);
