// Copyright (c) 2017 Uber Technologies, Inc.
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
  Voronoi,
  LineSeries,
  VerticalGridLines,
  Highlight
} from 'index';

function getRandomSeriesData(xMax, yMax) {
  return Array(xMax)
  .fill()
  .map((e, x) => ({x, y: Math.floor(Math.random() * yMax) + 1}));
}

const PLOT_DOMAIN = {
  x: [0, 100],
  y: [0, 10]
};
const seriesData = getRandomSeriesData(PLOT_DOMAIN.x[1], PLOT_DOMAIN.y[1]);

class DragableChartExample extends React.Component {
  state = {
    isDrawing: false,
    selectionStart: null,
    selectionEnd: null,
    hoveredX: null
  };

  render() {
    return (
      <div>
        <XYPlot
          onMouseLeave={this.onMouseLeave}
          width={500}
          height={500}
          margin={{
            top: 50,
            left: 50,
            right: 10
          }}
          xDomain={PLOT_DOMAIN.x}
          yDomain={PLOT_DOMAIN.y}
        >
          <XAxis />
          <YAxis />
          <LineSeries curve={'curveMonotoneX'} data={seriesData} />
          {this.state.hoveredX !== null && <VerticalGridLines tickValues={[this.state.hoveredX]} />}

          <Voronoi nodes={seriesData} />

          <Highlight />
        </XYPlot>

        <div style={{marginLeft: '50px'}}>
          <p><strong>selectionStart:</strong> {this.state.selectionStart}</p>
          <p><strong>selectionEnd:</strong> {this.state.selectionEnd}</p>
          <p><strong>isDrawing:</strong> {this.state.isDrawing.toString()}</p>
        </div>
      </div>
    );
  }
}

export default DragableChartExample;
