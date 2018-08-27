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
  XAxis,
  YAxis,
  HorizontalGridLines,
  FlexibleWidthXYPlot,
  LineSeries,
  DiscreteColorLegend
} from 'index';
import Highlight from './highlight';

const totalValues = 100;

/**
 * Get the array of x and y pairs.
 * The function tries to avoid too large changes of the chart.
 * @param {number} total Total number of values.
 * @returns {Array} Array of data.
 * @private
 */
function getRandomSeriesData(total) {
  const result = [];
  let lastY = Math.random() * 40 - 20;
  let y;
  const firstY = lastY;
  for (let i = 0; i < total; i++) {
    y = Math.random() * firstY - firstY / 2 + lastY;
    result.push({
      x: i,
      y
    });
    lastY = y;
  }
  return result;
}

export default class ZoomableChartExample extends React.Component {

  state = {
    lastDrawLocation: null,
    series: [
      {
        data: getRandomSeriesData(totalValues),
        disabled: false,
        title: 'Apples'
      },
      {
        data: getRandomSeriesData(totalValues),
        disabled: false,
        title: 'Bananas'
      }
    ]
  }

  render() {
    const {series, lastDrawLocation} = this.state;
    return (
      <div className="example-with-click-me">
        <div className="legend">
          <DiscreteColorLegend
            width={180}
            items={series}/>
        </div>

        <div className="chart no-select">
          <FlexibleWidthXYPlot
            animation
            xDomain={lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]}
            yDomain={lastDrawLocation && [lastDrawLocation.bottom, lastDrawLocation.top]}
            height={300}>

            <HorizontalGridLines />

            <YAxis />
            <XAxis />

            {series.map(entry => (
              <LineSeries
                key={entry.title}
                data={entry.data}
              />
            ))}

            <Highlight onBrushEnd={area => this.setState({lastDrawLocation: area})}
              onDrag={(area) => {
                this.setState({
                  lastDrawLocation: {
                    bottom: this.state.lastDrawLocation.bottom + (area.top - area.bottom),
                    left: this.state.lastDrawLocation.left - (area.right - area.left),
                    right: this.state.lastDrawLocation.right - (area.right - area.left),
                    top: this.state.lastDrawLocation.top + (area.top - area.bottom)
                  }
                });
              }} />

          </FlexibleWidthXYPlot>
        </div>

        <button className="showcase-button" onClick={() => {
          this.setState({lastDrawLocation: null});
        }}>
          Reset Zoom
        </button>

        <div>
          <h4>
            <b>Last Draw Area</b>
          </h4>
          {lastDrawLocation ? (
            <ul style={{listStyle: 'none'}}>
              <li><b>Top:</b> {lastDrawLocation.top}</li>
              <li><b>Right:</b> {lastDrawLocation.right}</li>
              <li><b>Bottom:</b> {lastDrawLocation.bottom}</li>
              <li><b>Left:</b> {lastDrawLocation.left}</li>
            </ul>
          ) : <span>N/A</span>}
        </div>
      </div>
    );
  }
}
