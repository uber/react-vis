import React, {PropTypes} from 'react';
import isDefined from '../utils/is-defined';

export default function Text({
  children,
  x,
  y,
  ax,
  ay,
  ...restProps
}) {
  if (!isDefined(x) && isDefined(ax)) {
    x = ax;
  }

  if (!isDefined(y) && isDefined(ay)) {
    y = ay;
  }

  const props = {
    x,
    y,
    ...restProps
  };

  return (
    <text {...props}>
      {children}
    </text>
  );
}
