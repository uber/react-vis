import React, {PropTypes, cloneElement, Children} from 'react';
import NODE_TYPES from '../node-types';

const {string, number} = PropTypes;
const propTypes = {
  /** name of the node, used for links to look the node up. */
  name: string,
  /** x coordinate of the center of node */
  cx: number,
  /** y coordinate of the center of node */
  cy: number,
  /** radius of node */
  r: number,
  /** node background color */
  fill: string,
  /** border color */
  stroke: string,
  /** border width */
  strokeWidth: number
};

const defaultProps = {
  fill: 'transparent',
  stroke: 'rgba(35, 170, 255, 0.5)',
  strokeWidth: 3
};

// todo: implement container block API as a higher level component
function CircleNode({
  name,
  cx,
  cy,
  r,
  fill,
  stroke,
  strokeWidth,
  ...restProps
}) {
  const props = {
    name,
    cx,
    cy,
    r: r - strokeWidth,
    fill,
    stroke,
    strokeWidth,
    ...restProps
  };
  return <circle {...props}/>;
}

CircleNode.graphNodeType = NODE_TYPES.NODE;
CircleNode.propTypes = propTypes;
CircleNode.defaultProps = defaultProps;
CircleNode.displayName = 'CircleNode';
export default CircleNode;
