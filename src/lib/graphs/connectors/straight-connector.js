import React, {PropTypes} from 'react';
import NODE_TYPES from '../node-types';

const STYLEP_ROPS = {
  fill: 'transparent'
};

const {number, string} = PropTypes;
const propTypes = {
  /** the name of the starting node */
  from: string,
  /** the name of the ending node */
  to: string,
  /** the padding to apply to the start of the connector,\
   * typically used to avoid intersecting the node border */
  paddingStart: number,
  /** same as above for the other end */
  paddingEnd: number,
  /** x coordinate of the start, used to override default layout. */
  x1: number,
  /** x coordinate of the end. */
  y1: number,
  /** y coordinate of the start. */
  x2: number,
  /** y coordinate of the end. */
  y2: number,
  /** the marker component to use for the start, need to \
   * be the ID of an element defined inside the <defs> container.*/
  markerStartId: string,
  /** same but for path midpoints */
  markerMidId: string,
  /** same bug for end piont */
  markerEndId: string,
  /** color of the link */
  stroke: string,
  /** width of the link */
  strokeWidth: number,
};
const defaultProps = {
  stroke: 'black'
};

function StraightConnector({
  from,
  to,
  paddingStart,
  paddingEnd,
  x1,
  y1,
  x2,
  y2,
  markerStartId,
  markerMidId,
  markerEndId,
  stroke,
  strokeWidth,
  ...restProps
}) {
  const d = `M ${x1},${y1} ${x2},${y2}`;

  const markerStart = markerStartId ? `url(#${markerStartId})` : '';
  const markerMid = markerMidId ? `url(#${markerMidId})` : '';
  const markerEnd = markerEndId ? `url(#${markerEndId})` : '';

  const props = {
    ...STYLEP_ROPS,
    d, stroke, strokeWidth, markerStart, markerMid, markerEnd,
    ...restProps
  };
  return (
    <path {...props}/>
  );
}

StraightConnector.graphNodeType = NODE_TYPES.LINK;
StraightConnector.propTypes = propTypes;
StraightConnector.defaultProps = defaultProps;
StraightConnector.displayName = 'StraightConnector';
export default StraightConnector;
