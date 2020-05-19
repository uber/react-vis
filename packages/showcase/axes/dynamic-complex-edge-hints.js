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
  LineSeries,
  MarkSeries,
  Hint
} from 'index';

const {LEFT, TOP, BOTTOM_EDGE, LEFT_EDGE, RIGHT_EDGE, TOP_EDGE} = Hint.ALIGN;

const CHART_MARGINS = {left: 30, right: 10, top: 10, bottom: 25};
const XMIN = 1;
const XMAX = 4;
const YMIN = 5;
const YMAX = 15;
const DATA = [{x: 1, y: 5}, {x: 2, y: 8}, {x: 3, y: 12}, {x: 4, y: 15}];
const POLE = [
  [{x: XMIN, y: DATA[0].y}, {x: XMAX, y: DATA[0].y}],
  [{x: DATA[1].x, y: DATA[1].y}, {x: DATA[1].x, y: YMAX}],
  [{x: DATA[2].x, y: YMIN}, {x: DATA[2].x, y: DATA[2].y}],
  [{x: XMIN, y: DATA[3].y}, {x: DATA[3].x, y: DATA[3].y}]
];
const DATA_HINT_ALIGN = [
  {
    horizontal: RIGHT_EDGE,
    vertical: TOP
  },
  {
    horizontal: LEFT,
    vertical: TOP_EDGE
  },
  {
    horizontal: LEFT,
    vertical: BOTTOM_EDGE
  },
  {
    horizontal: LEFT_EDGE,
    vertical: TOP
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
      <div className="complex-hint">
        <XYPlot width={300} height={300} margin={CHART_MARGINS}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <MarkSeries onNearestX={this._rememberValue} data={DATA} />
          {value ? (
            <LineSeries data={POLE[value.x - 1]} stroke="black" />
          ) : null}
          {value ? (
            <Hint value={value} align={DATA_HINT_ALIGN[value.x - 1]}>
              <div
                className={`hint--text-container ${
                  DATA_HINT_ALIGN[value.x - 1].horizontal
                }-${DATA_HINT_ALIGN[value.x - 1].vertical}`}
              >
                <div className="hint--text">{`(${value.x}, ${value.y})`}</div>
              </div>
              <div
                className={`hint--pole ${
                  DATA_HINT_ALIGN[value.x - 1].horizontal
                }-${DATA_HINT_ALIGN[value.x - 1].vertical}`}
              />
            </Hint>
          ) : null}
        </XYPlot>
      </div>
    );
  }
}
