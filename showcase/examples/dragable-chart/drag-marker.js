import React from 'react';
import PropTypes from 'prop-types';

function DragMarker({innerHeight, marginTop, marginLeft, x, x2}) {
  const width = Math.abs(x2 - x);
  const start = x2 > x ? x : x2;
  return (
    <rect
      className="drag-marker"
      pointerEvents="none"
      fill="black"
      opacity="0.2"
      x={start}
      y={marginTop}
      width={width}
      height={innerHeight}
    />
  );
}

DragMarker.requiresSVG = true;
DragMarker.propTypes = {
  x: PropTypes.number,
  x2: PropTypes.number
};

export default DragMarker;
