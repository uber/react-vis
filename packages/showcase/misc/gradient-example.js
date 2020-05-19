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
  AreaSeries,
  GradientDefs,
  Borders
} from 'index';

export default function GradientExample(props) {
  return (
    <XYPlot xDomain={[1.2, 3]} yDomain={[11, 26]} width={300} height={300}>
      <GradientDefs>
        <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="red" stopOpacity={0.4} />
          <stop offset="100%" stopColor="blue" stopOpacity={0.3} />
        </linearGradient>
      </GradientDefs>
      <VerticalGridLines />
      <HorizontalGridLines />

      <AreaSeries
        color={'url(#CoolGradient)'}
        data={[
          {x: 1, y: 10, y0: 1},
          {x: 2, y: 25, y0: 5},
          {x: 3, y: 15, y0: 3}
        ]}
      />
      <Borders
        style={{
          bottom: {fill: '#fff'},
          left: {fill: 'url(#CoolGradient)', opacity: 0.3},
          right: {fill: '#fff'},
          top: {fill: '#fff'}
        }}
      />
      <XAxis />
      <YAxis />
      <AreaSeries
        data={[
          {x: 1, y: 5, y0: 6},
          {x: 2, y: 20, y0: 11},
          {x: 3, y: 10, y0: 9}
        ]}
      />
    </XYPlot>
  );
}
