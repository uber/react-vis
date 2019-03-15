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

import React, {Component} from 'react';

import {XYPlot, XAxis, YAxis, HeatmapSeries, Hint} from 'index';

export default class HeatmapChart extends Component {
  state = {
    value: false
  };

  render() {
    const {value} = this.state;
    return (
      <XYPlot width={300} height={300}>
        <XAxis />
        <YAxis />
        <HeatmapSeries
          className="heatmap-series-example"
          onValueMouseOver={v => this.setState({value: v})}
          onSeriesMouseOut={v => this.setState({value: false})}
          data={[
            {x: 1, y: 0, color: 10},
            {x: 1, y: 5, color: 10},
            {x: 1, y: 10, color: 6},
            {x: 1, y: 15, color: 7},
            {x: 2, y: 0, color: 12},
            {x: 2, y: 5, color: 2},
            {x: 2, y: 10, color: 1},
            {x: 2, y: 15, color: 12},
            {x: 3, y: 0, color: 9},
            {x: 3, y: 5, color: 2},
            {x: 3, y: 10, color: 6},
            {x: 3, y: 15, color: 12}
          ]}
        />
        {value !== false && <Hint value={value} />}
      </XYPlot>
    );
  }
}
