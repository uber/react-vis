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
  XYPlot,
  ArcSeries,
  XAxis,
  YAxis
} from 'index';

import {EXTENDED_DISCRETE_COLOR_RANGE as COLORS} from 'theme';

const PI = Math.PI;

function updateData() {
  const divider = Math.floor(Math.random() * 8 + 3);
  const newData = [...new Array(5)].map((row, index) => {
    return {
      color: index,
      radius0: Math.random() > 0.8 ? Math.random() + 1 : 0,
      radius: Math.random() * 3 + 1,
      angle: (index + 1) * PI / divider,
      angle0: index * PI / divider
    };
  });
  return newData.concat([{angle0: 0, angle: PI * 2 * Math.random(), radius: 1.1, radius0: 0.8}]);
}

function updateLittleData() {
  const portion = Math.random();
  return [
    {angle0: 0, angle: portion * PI * 2, radius0: 0, radius: 10, color: COLORS[13]},
    {angle0: portion * PI * 2, angle: 2 * PI, radius0: 0, radius: 10, color: COLORS[12]}
  ];
}

export default class Example extends React.Component {
  state = {
    data: updateData(),
    littleData: updateLittleData(),
    value: false
  }
  render() {
    return (
      <div>
        <button onClick={() => this.setState({
          data: updateData(),
          littleData: updateLittleData()
        })}> UPDATE </button>
        <XYPlot
          xDomain={[-5, 5]}
          yDomain={[-5, 5]}
          width={300}
          height={300}>
          <XAxis />
          <YAxis />
          <ArcSeries
            animation
            radiusDomain={[0, 4]}
            data={this.state.data.map(row => {
              if (this.state.value && this.state.value.color === row.color) {
                return {...row, style: {stroke: 'black', strokeWidth: '5px'}};
              }
              return row;
            })}
            colorRange={COLORS}
            onValueMouseOver={row => this.setState({value: row})}
            onSeriesMouseOut={() => this.setState({value: false})}
            colorType={'category'}/>
          <ArcSeries
            animation
            radiusType={'literal'}
            center={{x: -2, y: 2}}
            data={this.state.littleData}
            colorType={'literal'}/>

        </XYPlot>
      </div>
    );
  }
}
