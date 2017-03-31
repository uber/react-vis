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

import test from 'tape';
import React from 'react';
import {shallow} from 'enzyme';

import VerticalBarSeries from 'plot/series/vertical-bar-series';
import XAxis from 'plot/axis/x-axis';
import XYPlot from 'plot/xy-plot';

const XYPLOT_PROPS = {width: 10, height: 10};
import {testRenderWithProps} from '../test-utils';

testRenderWithProps(XYPlot, XYPLOT_PROPS);

test('Render a stacked bar chart', t => {
  const wrapper = shallow(
    <XYPlot width={300} height={300} stackBy="y">
      <VerticalBarSeries
        data={[
          {x: 1, y: 0},
          {x: 2, y: 1},
          {x: 3, y: 2}
        ]}
      />
      <VerticalBarSeries
        data={[
          {x: 1, y: 2},
          {x: 2, y: 1},
          {x: 3, y: 0}
        ]}/>
    </XYPlot>
  );

  const renderedVerticalBarsWrapper =
    wrapper.find(VerticalBarSeries);

  t.deepEqual(
    renderedVerticalBarsWrapper.at(0).prop('data'),
    [
      {x: 1, y: 0},
      {x: 2, y: 1},
      {x: 3, y: 2}
    ],
    'First bar series data is the same'
  );

  t.deepEqual(
    renderedVerticalBarsWrapper.at(1).prop('data'),
    [
      {x: 1, y: 2, y0: 0},
      {x: 2, y: 2, y0: 1},
      {x: 3, y: 2, y0: 2}
    ],
    'Second bar series data contains y0 values'
  );

  t.end();
});

test('Render a stacked bar chart with other children', t => {
  const wrapper = shallow(
    <XYPlot width={300} height={300} stackBy="y">
      <XAxis />
      <VerticalBarSeries
        data={[
          {x: 1, y: 0}
        ]}
      />
      <VerticalBarSeries
        data={[
          {x: 1, y: 2}
        ]}/>
      {
        // Empty div here is intentional, to test series children handling
      }
      <div />
    </XYPlot>
  );

  const renderedVerticalBarsWrapper = wrapper.find(VerticalBarSeries);

  t.deepEqual(
    renderedVerticalBarsWrapper.at(0).prop('data'),
    [
      {x: 1, y: 0}
    ],
    'First bar series data is the same'
  );

  t.deepEqual(
    renderedVerticalBarsWrapper.at(1).prop('data'),
    [
      {x: 1, y: 2, y0: 0}
    ],
    'Second bar series data contains y0 values'
  );

  t.end();
});
