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
  RThetaPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  CircularGridLines,
  MarkSeries,
  Hint
} from 'index';

export default class Example extends React.Component {
  state = {
    tau: 0,
    value: false
  }

  // componentDidMount() {
  //   window.setInterval(
  //     () => this.setState({tau: this.state.tau + Math.PI / 60}),
  //     100
  //   );
  // }

  render() {
    const {tau, value} = this.state;

    return (
      <div>
        <RThetaPlot
          rDomain={[0, 3]}
          width={300}
          height={300}>
          <CircularGridLines />
          <XAxis />
          <YAxis />
          <VerticalGridLines />
          <HorizontalGridLines />
          <MarkSeries
            animation
            className="mark-series-example"
            sizeRange={[5, 15]}
            onValueMouseOver={val => this.setState({value: val})}
            onValueMouseOut={val => {
              this.setState({value: null});
            }}
            data={[
              {radius: 0, theta: Math.PI / 3 + tau, size: 30},
              {radius: 1, theta: Math.PI / 3 + tau, size: 30},
              {radius: 1.7, theta: Math.PI / 2 + tau, size: 10},
              {radius: 2, theta: 3 * Math.PI / 2 + tau, size: 1},
              {radius: 3, theta: Math.PI / 4 + tau, size: 12},
              {radius: 2.5, theta: 4 * Math.PI / 5 + tau, size: 4}
            ]}/>

          {value ?
            <Hint value={value}/> :
            null
          }
        </RThetaPlot>
      </div>
    );
  }
}
