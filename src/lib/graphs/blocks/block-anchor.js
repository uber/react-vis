/**
 * A higher-level component that layouts a component
 * with respect to its parent block.
 */
import React, {PropTypes} from 'react';

const {oneOf, any} = PropTypes;

export const HORIZONTAL_ALIGNS = {
  LEFT: 'left',
  RIGHT: 'right',
  CENTER: 'center'
};

export const VERTICAL_ALIGNS = {
  TOP: 'top',
  BOTTOM: 'bottom',
  MIDDLE: 'middle'
};

const propTypes = {
  component: any.isRequired,
  alignHorizontal: oneOf(Object.keys(HORIZONTAL_ALIGNS).map(key => HORIZONTAL_ALIGNS[key])),
  alignVertical: oneOf(Object.keys(VERTICAL_ALIGNS).map(key => VERTICAL_ALIGNS[key]))
};

const defaultProps = {
  alignHorizontal: HORIZONTAL_ALIGNS.RIGHT,
  alignVertical: VERTICAL_ALIGNS.MIDDLE,
  margin: 0
};

// todo: add anchor logic prop to allow passing-in of custom layout function.
function BlockAnchor({
  children,
  component: Component,
  anchorX,
  anchorY,
  anchorWidth,
  anchorHeight,
  alignHorizontal,
  alignVertical,
  margin,
  ...restProps
}) {
  let ax = anchorX;
  let ay = anchorY;
  switch (alignHorizontal) {
    case HORIZONTAL_ALIGNS.LEFT:
      ax = anchorX - margin;
      break;
    case HORIZONTAL_ALIGNS.RIGHT:
      ax = anchorX + anchorWidth + margin;
      break;
    case HORIZONTAL_ALIGNS.CENTER:
      ax = anchorX + anchorWidth / 2;
      break;
  }

  switch (alignVertical) {
    case VERTICAL_ALIGNS.TOP:
      ay = anchorY - margin;
      break;
    case VERTICAL_ALIGNS.BOTTOM:
      ay = anchorY + anchorHeight + margin;
      break;
    case VERTICAL_ALIGNS.MIDDLE:
      ay = anchorY + anchorHeight / 2;
      break;
  }

  const props = {
    ax,
    ay,
    ...restProps
  };

  return <Component {...props}>{children}</Component>;
}

BlockAnchor.propTypes = propTypes;
BlockAnchor.defaultProps = defaultProps;
BlockAnchor.displayName = 'BlockAnchor';
export default BlockAnchor;
