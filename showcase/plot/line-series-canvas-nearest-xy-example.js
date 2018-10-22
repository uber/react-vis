// Copyright (c) 2016-2018 Uber Technologies, Inc.
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
import {XYPlot, LineSeriesCanvas, MarkSeriesCanvas} from 'index';
const k = 100;
const data = Array(k)
  .fill(0)
  .map((n, x) => ({x, y: x % 2 ? 180 : -180}));

export default class LineSeriesCanvasNearestXYExample extends React.Component {
  state = {
    nearestXY: data[0]
  };

  render() {
    const {nearestXY} = this.state;
    return (
      <XYPlot
        width={500}
        height={300}
        domainX={[0, 2 * k]}
        domainY={[-200, 200]}
      >
        {
          <LineSeriesCanvas
            onNearestXY={point => this.setState({nearestXY: point})}
            data={data}
          />
        }
        {
          <MarkSeriesCanvas
            size={5}
            fill={'yellow'}
            stroke={'red'}
            style={{pointerEvents: 'none'}}
            data={[nearestXY]}
          />
        }
      </XYPlot>
    );
  }
}
