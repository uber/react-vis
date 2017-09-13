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
  AreaSeries,
  Crosshair,
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineMarkSeries
} from 'index';

const DATA = [
  [
    {x: 1, y: 10},
    {x: 2, y: 10},
    {x: 3, y: 13},
    {x: 4, y: 7},
    {x: 5, y: null}
  ],
  [
    {x: 1, y: 30},
    {x: 2, y: 0},
    {x: 5, y: null},
    {x: 4, y: 15},
    {x: 5, y: null}
  ]
];

export default class NullDataExample extends React.Component {
  state = {
    crosshairValues: []
  };

  onMouseLeave = () => this.setState({crosshairValues: []});
  onNearestX = (value, {index}) =>
    this.setState({crosshairValues: DATA.map(d => d[index].y !== null && d[index])});

  render() {
    return (
      <XYPlot
        width={300}
        height={300}
        onMouseLeave={this.onMouseLeave}>
        <XAxis/>
        <YAxis/>
        <HorizontalGridLines />
        <VerticalGridLines />
        <AreaSeries nullAccessor={(d) => d.y !== null} onNearestX={this.onNearestX} data={DATA[0]} />
        <LineMarkSeries nullAccessor={(d) => d.y !== null} data={DATA[1]} />
        <Crosshair
          values={this.state.crosshairValues}/>
      </XYPlot>
    );
  }
}
