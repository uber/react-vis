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
import {XYPlot, LineSeriesCanvas, MarkSeriesCanvas} from 'index';

export default class Example extends React.Component {

  constructor() {
    super();
    this.state = {
      nearestXY: null
    };
  }

  render() {
    const k = 100;
    return (
      <XYPlot
        width={500}
        height={300}
      >
        {<MarkSeriesCanvas
          size={5}
          fill={'yellow'}
          stroke={'red'}
          style={{pointerEvents: 'none'}}
          data={[this.state.nearestXY]}
        />}
        {<LineSeriesCanvas
          onNearestXY={(nearestXY, {event}) => this.setState({nearestXY})}
          data={Array(k).fill(0).map((n, idx) => ({x: idx, y: idx % 2 ? idx + 20 : idx - 20}))}
        />}
      </XYPlot>
    );
  }
}
