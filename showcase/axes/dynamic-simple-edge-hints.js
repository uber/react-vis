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
  MarkSeries,
  Hint
} from 'index';

const {LEFT, RIGHT, TOP, BOTTOM_EDGE, RIGHT_EDGE, TOP_EDGE} = Hint.ALIGN;
const CHART_MARGINS = {left: 50, right: 10, top: 10, bottom: 25};
const DATA = [{x: 1, y: 5}, {x: 2, y: 10}, {x: 3, y: 10}, {x: 4, y: 15}];
const DATA_HINT_ALIGN = [
  {
    horizontal: RIGHT_EDGE,
    vertical: TOP
  },
  {
    horizontal: RIGHT,
    vertical: BOTTOM_EDGE
  },
  {
    horizontal: LEFT,
    vertical: TOP_EDGE
  },
  {
    horizontal: LEFT,
    vertical: BOTTOM_EDGE
  }
];

export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }

  _rememberValue = value => {
    this.setState({value});
  };

  render() {
    const {value} = this.state;
    return (
      <XYPlot width={300} height={300} margin={CHART_MARGINS}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <MarkSeries onNearestX={this._rememberValue} data={DATA} />
        {value ? (
          <Hint value={value} align={DATA_HINT_ALIGN[value.x - 1]}>
            <div className="rv-hint__content">
              {`(${value.x}, ${value.y})`}
              <br />
              {`${DATA_HINT_ALIGN[value.x - 1].horizontal}-${
                DATA_HINT_ALIGN[value.x - 1].vertical
              }`}
            </div>
          </Hint>
        ) : null}
      </XYPlot>
    );
  }
}
