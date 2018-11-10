// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  CustomSVGSeries
} from 'index';

export default function CustomSVGRootLevelComponent(props) {
  return (
    <XYPlot width={300} height={300}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <CustomSVGSeries
        className="custom-marking"
        customComponent={(row, positionInPixels) => {
          return (
            <g className="inner-inner-component">
              <circle cx="0" cy="0" r={row.size || 10} fill="green" />
              <text x={0} y={0}>
                <tspan x="0" y="0">{`x: ${positionInPixels.x}`}</tspan>
                <tspan x="0" y="1em">{`y: ${positionInPixels.y}`}</tspan>
              </text>
            </g>
          );
        }}
        data={[
          {x: 1, y: 10, size: 3},
          {x: 1.7, y: 12, size: 20, style: {stroke: 'red', fill: 'orange'}},
          {x: 2, y: 5},
          {x: 3, y: 15},
          {x: 2.5, y: 7}
        ]}
      />
    </XYPlot>
  );
}
