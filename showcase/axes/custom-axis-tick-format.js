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
  LineSeries
} from 'index';

export default class Example extends React.Component {
  static _xTickFormatValue(v, i, scale, tickTotal) {
    // format axis tick with SI prefix (e.g. ms, µs)
    // see https://github.com/d3/d3-scale#continuous_tickFormat
    // and https://github.com/d3/d3-format#locale_format
    return `${scale.tickFormat(tickTotal, 's')(v)}s`;
  }

  static _yTickFormatValue(v, i, scale, tickTotal) {
    // format axis tick with SI prefix (e.g. kWh, MWh)
    return `${scale.tickFormat(tickTotal, 's')(v)}Wh`;
  }

  render() {
    const data = [
      {x: 0.042, y: 100},
      {x: 0.051, y: 1200},
      {x: 0.063, y: 1600},
      {x: 0.07, y: 1300},
      {x: 0.073, y: 1220}
    ];
    const xMin = Math.min(...data.map(e => e.x));
    const xMax = Math.max(...data.map(e => e.x));
    const yMin = 0;
    const yMax = Math.max(...data.map(e => e.y));

    return (
      <XYPlot
        width={300}
        height={300}
        xType="linear"
        xDomain={[xMin, xMax]}
        yType="linear"
        yDomain={[yMin, yMax]}
        margin={{top: 10, right: 10, left: 60, bottom: 40}}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickFormat={Example._xTickFormatValue} />
        <YAxis tickFormat={Example._yTickFormatValue} />
        <LineSeries data={data} />
      </XYPlot>
    );
  }
}
