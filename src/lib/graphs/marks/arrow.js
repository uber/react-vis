import React from 'react';

function Arrow({
  id,
  refX = 0.1,
  refY = 2,
  d = 'M0,0 V4 L4,2 Z',
  width: markerWidth = 5,
  height: markerHeight = 5,
  color: fill = 'black',
  orient = 'auto',
  ...restProps
}) {
  const props = {
    id, refX, refY, markerWidth, markerHeight, orient
  };
  const pathProps = {
    fill, d, ...restProps
  };
  return (
    <marker {...props}>
      <path {...pathProps}/>
    </marker>
  );
}

export default Arrow;
