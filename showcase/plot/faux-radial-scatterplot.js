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

import {XYPlot, XAxis, YAxis, MarkSeries, CircularGridLines} from 'index';

const data = [
  {r: 1, theta: Math.PI / 3, size: 30},
  {r: 1.7, theta: (2 * Math.PI) / 3, size: 10},
  {r: 2, theta: Math.PI, size: 1},
  {r: 3, theta: (3 * Math.PI) / 2, size: 12},
  {r: 2.5, theta: Math.PI / 4, size: 4},
  {r: 0, theta: Math.PI / 4, size: 1}
];

const margin = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10
};

const WIDTH = 300;
const HEIGHT = 300;

export default function Example(props) {
  return (
    <XYPlot
      margin={margin}
      xDomain={[-3, 3]}
      yDomain={[-3, 3]}
      width={WIDTH}
      height={HEIGHT}
    >
      <CircularGridLines />
      <XAxis top={(HEIGHT - margin.top) / 2} />
      <YAxis left={(WIDTH - margin.left - margin.right) / 2} />
      <MarkSeries
        strokeWidth={2}
        sizeRange={[5, 15]}
        data={data.map(row => ({
          ...row,
          x: Math.cos(row.theta) * row.r,
          y: Math.sin(row.theta) * row.r
        }))}
      />
    </XYPlot>
  );
}
