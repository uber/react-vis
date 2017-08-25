import React from 'react';
import PropTypes from 'prop-types';
import {voronoi} from 'd3-voronoi';

const NOOP = f => f;

function Voronoi({className, extent, nodes, onBlur, onClick, onHover, polygonStyle, style, x, y}) {
  // Create a voronoi with each node center points
  const voronoiInstance = voronoi()
    .x(x)
    .y(y)
    .extent(extent);

  return (
    <g className={`${className} rv-voronoi`} style={style}>
      {voronoiInstance.polygons(nodes).map((d, i) => (
        <path
          className="rv-voronoi__cell"
          d={`M${d.join('L')}Z`}
          onClick={() => onClick(d.data)}
          onMouseOver={() => onHover(d.data)}
          onMouseOut={() => onBlur(d.data)}
          fill="none"
          style={{
            pointerEvents: 'all',
            ...polygonStyle
          }}
          key={i} />
      ))}
    </g>
  );
}

Voronoi.defaultProps = {
  className: '',
  onBlur: NOOP,
  onClick: NOOP,
  onHover: NOOP,
  x: d => d.x,
  y: d => d.y,
  requiresSVG: true
};

Voronoi.propTypes = {
  className: PropTypes.string,
  extent: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ).isRequired,
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  x: PropTypes.func,
  y: PropTypes.func,
  requiresSVG: PropTypes.bool
};

export default Voronoi;
