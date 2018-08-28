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
  MarkSeries,
  Highlight,
  PolygonSeries
} from 'index';

const data = [
  {x: 1, y: 10, size: 30},
  {x: 1.7, y: 12, size: 10},
  {x: 2, y: 5, size: 1},
  {x: 3, y: 15, size: 12},
  {x: 2.5, y: 7, size: 4},
  {x: 3.1, y: 4, size: 8},
  {x: 0.9, y: 4.3, size: 2},
  {x: 2.9, y: 11, size: 12}
];

export default class SelectionPlotExample extends React.Component {
  state = {
    filter: null
  }
  render() {
    const {filter} = this.state;

    return (
      <XYPlot
        width={300}
        height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />

        <MarkSeries
          className="mark-series-example"
          strokeWidth={2}
          opacity="0.8"
          sizeRange={[5, 15]}
          colorType="literal"
          getColor={d => {
            if (!filter) {
              return '#12939A';
            }
            const leftRight = d.x <= filter.right && d.x >= filter.left;
            const upDown = d.y <= filter.top && d.y >= filter.bottom;
            return leftRight && upDown ? '#EF5D28' : '#12939A';
          }}
          data={data}/>
        <Highlight
          onBrushEnd={area => this.setState({filter: area})}
          />
      </XYPlot>
    );
  }
}
