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
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries
} from 'index';

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null
    };
    this._onSeriesMouseOvers = [
      this._onSeriesMouseOver.bind(this, 0),
      this._onSeriesMouseOver.bind(this, 1)
    ];
  }

  _getSeriesColor(index) {
    const {selectedIndex} = this.state;
    if (selectedIndex !== null && selectedIndex !== index) {
      return '#ddd';
    }
    return null;
  }

  _onChartMouseLeave = () => {
    this.setState({selectedIndex: null});
  };

  _onSeriesMouseOver(selectedIndex) {
    this.setState({selectedIndex});
  }

  render() {
    return (
      <div>
        <XYPlot onMouseLeave={this._onChartMouseLeave} width={300} height={150}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries
            color={this._getSeriesColor(0)}
            onSeriesMouseOver={this._onSeriesMouseOvers[0]}
            data={[{x: 1, y: 15}, {x: 2, y: 8}, {x: 3, y: 1}]}
          />
          <LineSeries
            color={this._getSeriesColor(1)}
            onSeriesMouseOver={this._onSeriesMouseOvers[1]}
            data={[{x: 1, y: 10}, {x: 2, y: 5}, {x: 3, y: 15}]}
          />
        </XYPlot>
        <XYPlot onMouseLeave={this._onChartMouseLeave} width={300} height={150}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries
            color={this._getSeriesColor(0)}
            onSeriesMouseOver={this._onSeriesMouseOvers[0]}
            data={[{x: 1, y: 4}, {x: 2, y: 11}, {x: 3, y: 9}]}
          />
          <LineSeries
            color={this._getSeriesColor(1)}
            onSeriesMouseOver={this._onSeriesMouseOvers[1]}
            data={[{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 11}]}
          />
        </XYPlot>
      </div>
    );
  }
}
