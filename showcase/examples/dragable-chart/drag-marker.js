import React from 'react';
import PropTypes from 'prop-types';

function DragMarker({innerHeight, marginTop, marginLeft, selectionStart, selectionEnd}) {
  const width = Math.abs(selectionEnd - selectionStart);
  const x = selectionStart < selectionEnd ? selectionStart : selectionEnd;
  return (
    <rect
      className="drag-marker"
      pointerEvents="none"
      fill="black"
      opacity="0.2"
      x={x}
      y={marginTop}
      width={width}
      height={innerHeight}
    />
  );
}

DragMarker.requiresSVG = true;
DragMarker.propTypes = {
  selectionStart: PropTypes.number,
  selectionEnd: PropTypes.number
};

export default DragMarker;
