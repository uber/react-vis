import React from 'react';
import PropTypes from 'prop-types';
import {voronoi} from 'd3-voronoi';
import {valueEventPropTypes, valueEventHandlers} from 'utils/interactivity-utils';

function Voronoi(props) {
  // Create a voronoi with each node center points
  const {
    className,
    extent,
    nodes,
    polygonStyle,
    style,
    x,
    y
  } = props;

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
          fill="none"
          key={i}
          {...valueEventHandlers(props, d.data)}
          style={{
            pointerEvents: 'all',
            ...polygonStyle
          }}
        />
      ))}
    </g>
  );
}

Voronoi.requiresSVG = true;

Voronoi.defaultProps = {
  className: '',
  x: d => d.x,
  y: d => d.y
};

Voronoi.propTypes = {
  ...valueEventPropTypes,
  className: PropTypes.string,
  extent: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.number)
  ).isRequired,
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  x: PropTypes.func,
  y: PropTypes.func
};

export default Voronoi;
