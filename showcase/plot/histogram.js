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
  VerticalRectSeries
} from 'index';

const timestamp = new Date('May 23 2017').getTime();
const ONE_DAY = 86400000;

const DATA = [
  {x0: ONE_DAY * 2, x: ONE_DAY * 3, y: 1},
  {x0: ONE_DAY * 7, x: ONE_DAY * 8, y: 1},
  {x0: ONE_DAY * 8, x: ONE_DAY * 9, y: 1},
  {x0: ONE_DAY * 9, x: ONE_DAY * 10, y: 2},
  {x0: ONE_DAY * 10, x: ONE_DAY * 11, y: 2.2},
  {x0: ONE_DAY * 19, x: ONE_DAY * 20, y: 1},
  {x0: ONE_DAY * 20, x: ONE_DAY * 21, y: 2.5},
  {x0: ONE_DAY * 21, x: ONE_DAY * 24, y: 1}
].map(el => ({x0: el.x0 + timestamp, x: el.x + timestamp, y: el.y}));

export default function Example(props) {
  return (
    <XYPlot
      xDomain={[timestamp - 2 * ONE_DAY, timestamp + 30 * ONE_DAY]}
      yDomain={[0.1, 2.1]}
      xType="time"
      width={300}
      height={300}
    >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis />
      <YAxis />
      <VerticalRectSeries data={DATA} style={{stroke: '#fff'}} />
    </XYPlot>
  );
}
