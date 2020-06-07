import React, {useState} from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  AreaSeries,
  GradientDefs,
  ContentClipPath
} from 'react-vis';

export default function ClipExample() {
  const [clip, setClip] = useState(true);

  return (
    <>
      <label style={{display: 'block'}}>
        <input
          type="checkbox"
          checked={clip}
          onChange={e => setClip(e.currentTarget.checked)}
        />
        Enable Clipping
      </label>
      <XYPlot xDomain={[1.2, 3]} yDomain={[11, 26]} width={300} height={300}>
        {clip && <ContentClipPath id="content" />}

        <VerticalGridLines />
        <HorizontalGridLines />

        <AreaSeries
          data={[
            {x: 1, y: 10, y0: 1},
            {x: 2, y: 25, y0: 5},
            {x: 3, y: 15, y0: 3}
          ]}
          style={{clipPath: 'url(#content)'}}
        />
        <XAxis />
        <YAxis />
        <AreaSeries
          data={[
            {x: 1, y: 5, y0: 6},
            {x: 2, y: 20, y0: 11},
            {x: 3, y: 10, y0: 9}
          ]}
          style={{clipPath: 'url(#content)'}}
        />
      </XYPlot>
    </>
  );
}
