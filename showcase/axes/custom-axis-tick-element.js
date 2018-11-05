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
  state = {
    data: [
      {x: 0, y: 100, label: <circle cx={0} cy={10} r={5} fill="darksalmon" />},
      {x: 1, y: 200, label: <rect x={-5} y={5} width={10} height={10} fill="slateblue" />},
      {x: 2, y: 500, label: <tspan>Label</tspan>},
      {x: 3, y: 900, label: <path d="M0 5 L5 15 L-5 15 Z" fill="sandybrown" />},
      {x: 4, y: 1000, label: 'Label'}
    ]
  };

  formatX = (v, i, scale, tickTotal) => {
    if (i < this.state.data.length) {
      return this.state.data[i].label;
    }
    return null;
  }

  render() {
    return (
      <XYPlot
        width={300}
        height={300}
        xDomain={[0, 4]}
        yDomain={[0, 1000]}
        margin={{top: 10, right: 10, left: 60, bottom: 40}}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickTotal={this.state.data.length} tickFormat={this.formatX} />
        <YAxis />
        <LineSeries data={this.state.data} />
      </XYPlot>
    );
  }
}
