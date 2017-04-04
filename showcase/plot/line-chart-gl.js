// Copyright (c) 2016 Uber Technologies, Inc.
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
  LineMarkSeriesGL,
  LineMarkSeries
} from 'index';

function getRandomData() {
  return (new Array(1000)).fill(0).map((row, i) => ({
    x: i,
    y: Math.random() * 20,
    color: Math.random() * 10
  }));
}

const randomData = getRandomData();

const colorRanges = {
  typeA: ['#59E4EC', '#0D676C'],
  typeB: ['#EFC1E3', '#B52F93']
};

export default class Example extends React.Component {
  state = {
    glMode: true,
    data: randomData,
    colorType: 'typeA',
    strokeWidth: 1
  }

  render() {
    const {glMode, data, colorType, strokeWidth} = this.state;
    const lineSeriesProps = {
      animation: true,
      className: 'mark-series-example',
      sizeRange: [5, 15],
      color: colorType === 'typeA' ? '#0D676C' : '#B52F93',
      colorRange: colorRanges[colorType],
      opacityType: 'literal',
      strokeWidth,
      data
    };

    return (
      <div className="scatterplot-gl-wrapper">
        <div className="scatterplot-gl-example-controls">
          <button onClick={() => this.setState({glMode: !glMode})}>
            {glMode ? 'SWITCH TO SVG' : 'SWITCH TO GL'}
          </button>
          <button onClick={() => this.setState({data: getRandomData()})}>
            {'UPDATE DATA'}
          </button>
          <button onClick={() => this.setState({
            colorType: colorType === 'typeA' ? 'typeB' : 'typeA'
          })}>
            {'UPDATE COLOR'}
          </button>
          <button onClick={() => this.setState({
            strokeWidth: strokeWidth === 1 ? 2 : 1
          })}>
            {'UPDATE STROKEWIDTH'}
          </button>
        </div>
        <XYPlot
          width={600}
          height={300}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          {glMode &&
            <LineMarkSeriesGL {...lineSeriesProps} seriesId="my-example-line-chart"/>}
          {!glMode &&
            <LineMarkSeries {...lineSeriesProps}/>}
        </XYPlot>
      </div>
    );
  }
}
