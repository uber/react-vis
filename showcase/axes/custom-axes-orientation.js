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
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries
} from 'index';

export default function Example(props) {
  return (
    <XYPlot
      margin={{top: 40, right: 40, left: 10, bottom: 10}}
      width={300}
      height={300}
    >
      <HorizontalGridLines />
      <VerticalGridLines />
      <XAxis orientation="top" title="X Axis" />
      <YAxis orientation="right" title="Y Axis" />
      <LineSeries
        data={[
          {x: 1, y: 3, z: 10},
          {x: 2, y: 4, z: 10},
          {x: 3, y: 8, z: 10},
          {x: 4, y: 11, z: 10}
        ]}
      />
      <LineSeries data={null} />
      <LineSeries
        data={[
          {x: 1, y: 3, z: 10},
          {x: 2, y: 9, z: 10},
          {x: 3, y: 2, z: 10},
          {x: 4, y: 11, z: 10}
        ]}
      />
    </XYPlot>
  );
}
