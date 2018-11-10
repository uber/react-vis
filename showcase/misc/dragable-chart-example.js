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

import {XYPlot, XAxis, YAxis, VerticalRectSeries, Highlight} from 'index';

const DATA = [
  {x0: 0, x: 1, y: 1},
  {x0: 1, x: 2, y: 2},
  {x0: 2, x: 3, y: 10},
  {x0: 3, x: 4, y: 6},
  {x0: 4, x: 5, y: 5},
  {x0: 5, x: 6, y: 3},
  {x0: 6, x: 7, y: 1}
];

class DragableChartExample extends React.Component {
  state = {
    selectionStart: null,
    selectionEnd: null
  };

  render() {
    const {selectionStart, selectionEnd} = this.state;
    const updateDragState = area =>
      this.setState({
        selectionStart: area && area.left,
        selectionEnd: area && area.right
      });

    return (
      <div>
        <XYPlot width={500} height={300}>
          <XAxis />
          <YAxis />
          <VerticalRectSeries
            data={DATA}
            stroke="white"
            colorType="literal"
            getColor={d => {
              if (selectionStart === null || selectionEnd === null) {
                return '#1E96BE';
              }
              const inX = d.x >= selectionStart && d.x <= selectionEnd;
              const inX0 = d.x0 >= selectionStart && d.x0 <= selectionEnd;
              const inStart = selectionStart >= d.x0 && selectionStart <= d.x;
              const inEnd = selectionEnd >= d.x0 && selectionEnd <= d.x;

              return inStart || inEnd || inX || inX0 ? '#12939A' : '#1E96BE';
            }}
          />

          <Highlight
            color="#829AE3"
            drag
            enableY={false}
            onDrag={updateDragState}
            onDragEnd={updateDragState}
          />
        </XYPlot>

        <div>
          <b>selectionStart:</b> {`${Math.floor(selectionStart * 100) / 100},`}
          <b>selectionEnd:</b> {`${Math.floor(selectionEnd * 100) / 100},`}
        </div>
      </div>
    );
  }
}

export default DragableChartExample;
