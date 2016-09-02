import React, {PropTypes} from 'react';
import Bezier from 'bezier-js';
import NODE_TYPES from '../node-types';

const STYLErestProps = {
  fill: 'transparent'
};

const {number, string} = PropTypes;
const propTypes = {
  from: string,
  to: string,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  /** width of the bezier connector */
  width: number.isRequired,
  /** offset for the anchor points of the cubit bezier curve */
  bezierOffset: number,
  stroke: string,
  strokeWidth: number
};

function BezierConnector({
  from,
  to,
  x1,
  y1,
  x2,
  y2,
  width,
  bezierOffset = 30,
  stroke = 'black',
  strokeWidth = 0,
  ...pathProps
}) {

  const props = {
    ...STYLErestProps,
    strokeWidth: 0,
    ...pathProps
  };

  const line = new Bezier(x1, y1, x1 + bezierOffset,
    y1, x2 - bezierOffset, y2, x2, y2);

  try {
    const d = line.outline(width / 2).curves.map(
      bezier => bezier.toSVG().replace('M', 'L')
    ).join(' ').replace(/^L/i, 'M');
    return (
      <path {...props} d={d}/>
    );
  } catch (e) {
    // if points are degenerate, fall back on regular path
    return <path d={
      `M ${x1} ${y1 + width / 2} L ${x2} ${y2 + width / 2}
    L ${x2} ${y2 - width / 2} L ${x1} ${y1 - width / 2} Z`} {...props}/>
  }

}

BezierConnector.graphNodeType = NODE_TYPES.LINK;
BezierConnector.propTypes = propTypes;
BezierConnector.displayName = 'BezierConnector';
export default BezierConnector;
