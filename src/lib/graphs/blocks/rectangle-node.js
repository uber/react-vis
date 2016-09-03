import React, {PropTypes, cloneElement, Children} from 'react';
import NODE_TYPES from '../node-types';
import isDefined from '../utils/is-defined';

const {string, number, any} = PropTypes;

const propTypes = {
  name: string,
  x: number,
  y: number,
  width: number,
  height: number,
  margin: number,
  fill: string,
  stroke: number,
  strokeWidth: number,
  children: any
};

// todo: implement container block API as a higher level component
function RectangleNode({
  name,
  x,
  y,
  width = 10,
  height = 10,
  margin = 0,
  fill = 'transparent',
  stroke = 'rgba(35, 170, 255, 0.5)',
  strokeWidth = '3',
  children,
  ...restProps
}) {
  const props = {
    name,
    x: x + strokeWidth / 2 + margin,
    y: y + strokeWidth / 2 + margin,
    width: width - strokeWidth - margin * 2,
    height: height - strokeWidth - margin * 2,
    fill,
    stroke,
    strokeWidth,
    ...restProps
  };

  if (isDefined(children)) {
    return (
      <g>
        <rect {...props}/>
        {Children.toArray(children).map(
          child => {
            return cloneElement(child, {
              anchorX: x,
              anchorY: y,
              anchorWidth: width,
              anchorHeight: height
            });
          }
        )}
      </g>
    );
  }
  return <rect {...props}/>;
}

RectangleNode.graphNodeType = NODE_TYPES.NODE;
RectangleNode.propTypes = propTypes;
RectangleNode.displayName = 'RectangleNode';
export default RectangleNode;
