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
  HorizontalGridLines,
  makeWidthFlexible,
  LineSeries,
  VerticalBarSeries,
  DiscreteColorLegend,
  Crosshair
} from 'react-vis';
import Highlight from './highlight';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

const totalValues = Math.random() * 50;

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

export default class Example extends React.Component {

  state = {
    lastDrawLocation: null,
    series: [
      {
        title: 'Apples',
        disabled: false,
        data: getRandomSeriesData(totalValues)
      },
      {
        title: 'Bananas',
        disabled: false,
        data: getRandomSeriesData(totalValues)
      }
    ]
  }

  /**
   * Callback for when the user mouses up after drawing a given area on a chart
   * @param area - An object containing t, l, b, r corresponding to the input domain area the user drew
   * @private
   */
  _onDrawEnd = (area) => {
    this.setState({
      lastDrawLocation: area
    });
  }

  /**
   * Reset the draw location, which will in turn reset the domain
   * @private
   */
  _resetZoom = () => {
    this.setState({lastDrawLocation: null});
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

        <div className="chart">
          <FlexibleXYPlot
            animation
            xDomain={lastDrawLocation && [lastDrawLocation.l, lastDrawLocation.r]}
            height={300}>

            <HorizontalGridLines />

            <YAxis />
            <XAxis />

            {series.map(entry => (
              <LineSeries
                data={entry.data}
              />
            ))}

            <Highlight onDrawEnd={this._onDrawEnd} />

          </FlexibleXYPlot>
        </div>

        <button className="button" onClick={this._resetZoom}>
          Reset Zoom
        </button>

        <div>
          <h4>
            Last Draw Area
          </h4>
          <p>
            {lastDrawLocation ? JSON.stringify(lastDrawLocation, null, 2) : 'N/A'}
          </p>
        </div>
      </div>
    );
  }
}
