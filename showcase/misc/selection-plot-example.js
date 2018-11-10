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
  Highlight
} from 'index';

import {generateSeededRandom} from '../showcase-utils';
const seededRandom = generateSeededRandom(36);

// randomly generated data
const data = [...new Array(10)].map(row => ({
  x: seededRandom() * 3,
  y: seededRandom() * 11 + 4,
  size: seededRandom() * 30 + 1
}));

export default class SelectionPlotExample extends React.Component {
  state = {
    filter: null
  };
  render() {
    const {filter} = this.state;
    const highlightPoint = d => {
      if (!filter) {
        return false;
      }
      return d.y <= filter.top && d.y >= filter.bottom;
    };

    const numSelectedPoints = filter ? data.filter(highlightPoint).length : 0;
    return (
      <div>
        <XYPlot width={300} height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />

          <MarkSeries
            className="mark-series-example"
            sizeRange={[5, 15]}
            colorType="literal"
            getColor={d => (highlightPoint(d) ? '#EF5D28' : '#12939A')}
            data={data}
          />
          <Highlight
            enableX={false}
            className="selection-example"
            onBrush={area => this.setState({filter: area})}
            onBrushEnd={area => this.setState({filter: area})}
          />
        </XYPlot>
        <p>{`There are ${numSelectedPoints} selected points`}</p>
      </div>
    );
  }
}
