import React from 'react';

export default function ContentClipPath(props) {
  const {id = 'content-area', innerWidth, innerHeight} = props;
  return (
    <defs>
      <clipPath id={id}>
        <rect x={0} y={0} width={innerWidth} height={innerHeight} />
      </clipPath>
    </defs>
  );
}

ContentClipPath.requiresSVG = true;
ContentClipPath.displayName = 'ContentClipPath';
