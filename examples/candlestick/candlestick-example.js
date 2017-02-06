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
  LineSeries,
  makeWidthFlexible
} from 'react-vis';

import Candlestick from './candlestick';

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

/**
 * Generate random random for candle stick chart
 * @param {number} total - Total number of values.
 * @returns {Array} Array of data.
 */
function buildRandomBinnedData(total) {
  const result = Array(total).fill(0).map((x, i) => {
    const values = [Math.random(), Math.random(), Math.random(), Math.random()]
    .sort()
    .map(d => Math.floor(d * 100));
    const y = (values[2] + values[1]) / 2;
    return {
      x: i,
      y,
      yHigh: values[3],
      yOpen: values[2],
      yClose: values[1],
      yLow: values[0],
      color: y < 25 ? '#EF5D28' : '#12939A',
      opacity: y > 75 ? 0.7 : 1
    };
  });
  return result;
}

export default class Example extends React.Component {
  state = {
    data: buildRandomBinnedData(30)
  }

  render() {
    const {data} = this.state;
    return (
      <div className="candlestick-example">
        <div className="chart">
          <FlexibleXYPlot
            animation
            yDomain={[0, 100]}
            height={300}>
            <XAxis />
            <YAxis />
            <LineSeries
              color="#12939A"
              data={data} />
            <LineSeries
              color="#FF9833"
              className="dashed-example-line"
              data={[{x: 0, y: 25}, {x: 30, y: 25}]} />
            <LineSeries
              color="#1A3177"
              className="dashed-example-line"
              opacity={0.3}
              data={[{x: 0, y: 75}, {x: 30, y: 75}]} />
            <Candlestick
              colorType="literal"
              opacityType="literal"
              stroke="#79C7E3"
              data={data} />
          </FlexibleXYPlot>
        </div>
      </div>
    );
  }
}
// <XAxis />
// <YAxis />
