import React from 'react';
import PropTypes from 'prop-types';
import {voronoi} from 'd3-voronoi';

import {getAttributeFunctor} from 'utils/scales-utils';

const NOOP = f => f;

// Find the index of the node at coordinates of a touch point
function getNodeIndex(evt) {
  const {
    nativeEvent: {pageX, pageY}
  } = evt;
  const target = document.elementFromPoint(pageX, pageY);
  if (!target) {
    return -1;
  }
  const {parentNode} = target;
  return Array.prototype.indexOf.call(parentNode.childNodes, target);
}

function getExtent({innerWidth, innerHeight, marginLeft, marginTop}) {
  return [
    [marginLeft, marginTop],
    [innerWidth + marginLeft, innerHeight + marginTop]
  ];
}

function Voronoi(props) {
  const {
    className,
    extent,
    nodes,
    onBlur,
    onClick,
    onMouseUp,
    onMouseDown,
    onHover,
    polygonStyle,
    style,
    x,
    y
  } = props;
  // Create a voronoi with each node center points
  const voronoiInstance = voronoi()
    .x(x || getAttributeFunctor(props, 'x'))
    .y(y || getAttributeFunctor(props, 'y'))
    .extent(extent || getExtent(props));

  // Create an array of polygons corresponding to the cells in voronoi
  const polygons = voronoiInstance.polygons(nodes);

  // Create helper function to handle special logic for touch events
  const handleTouchEvent = handler => evt => {
    evt.preventDefault();
    const index = getNodeIndex(evt);
    if (index > -1 && index < polygons.length) {
      const d = polygons[index];
      handler(d.data);
    }
  };

  return (
    <g
      className={`${className} rv-voronoi`}
      style={style}
      // Because of the nature of how touch events, and more specifically touchmove
      // and how it differs from mouseover, we must manage touch events on the parent
      onTouchEnd={handleTouchEvent(onMouseUp)}
      onTouchStart={handleTouchEvent(onMouseDown)}
      onTouchMove={handleTouchEvent(onHover)}
      onTouchCancel={handleTouchEvent(onBlur)}
    >
      {polygons.map((d, i) => (
        <path
          className={`rv-voronoi__cell ${(d.data && d.data.className) || ''}`}
          d={`M${d.join('L')}Z`}
          onClick={() => onClick(d.data)}
          onMouseUp={() => onMouseUp(d.data)}
          onMouseDown={() => onMouseDown(d.data)}
          onMouseOver={() => onHover(d.data)}
          onMouseOut={() => onBlur(d.data)}
          fill="none"
          style={{
            pointerEvents: 'all',
            ...polygonStyle,
            ...(d.data && d.data.style)
          }}
          key={i}
        />
      ))}
    </g>
  );
}

Voronoi.requiresSVG = true;
Voronoi.displayName = 'Voronoi';
Voronoi.defaultProps = {
  className: '',
  onBlur: NOOP,
  onClick: NOOP,
  onHover: NOOP,
  onMouseDown: NOOP,
  onMouseUp: NOOP
};

Voronoi.propTypes = {
  className: PropTypes.string,
  extent: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func
};

export default Voronoi;
