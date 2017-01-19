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

import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';

import AreaSeries from 'plot/series/area-series';
import HeatmapSeries from 'plot/series/heatmap-series';
import HorizontalBarSeries from 'plot/series/horizontal-bar-series';
import HorizontalGrid from 'plot/horizontal-grid-lines';
import LineSeries from 'plot/series/line-series';
import MarkSeries from 'plot/series/mark-series';
import Treemap from 'treemap';
import Table from 'table';
import VerticalBarSeries from 'plot/series/vertical-bar-series';
import VerticalGrid from 'plot/vertical-grid-lines';
import XAxisBottom from 'plot/axis/x-axis';
import XYPlot from 'plot/xy-plot';
import YAxisLeft from 'plot/axis/y-axis';

const testRenderWithProps = (Component, props) =>
  test(`Rendering ${Component.displayName}`, assert => {
    const wrapper = mount(<Component {...props} />);
    const wrapperProps = wrapper.props();
    assert.ok(
      wrapper.find(Component).length,
      `${Component.displayName} is rendered`
    );
    Object.keys(props).forEach(propName => {
      assert.ok(
        wrapperProps[propName] === props[propName],
        `${propName} is set`);
    });
    assert.end();
  });

const TREEMAP_PROPS = {height: 100, width: 100, data: {}};
const TREEMAP_PROPS_WITH_DATA = {height: 100, width: 100, data: {
  name: 'animate',
  children: [
    {name: 'Easing', color: '#12939A', size: 17010},
    {name: 'FunctionSequence', color: '#12939A', size: 5842},
    {
      name: 'interpolate',
      children: [
        {name: 'ArrayInterpolator', color: '#12939A', size: 1983},
        {name: 'ColorInterpolator', color: '#12939A', size: 2047},
        {name: 'DateInterpolator', color: '#12939A', size: 1375},
        {name: 'Interpolator', color: '#12939A', size: 8746},
        {name: 'MatrixInterpolator', color: '#12939A', size: 2202},
        {name: 'NumberInterpolator', color: '#12939A', size: 1382},
        {name: 'ObjectInterpolator', color: '#12939A', size: 1629},
        {name: 'PointInterpolator', color: '#12939A', size: 1675},
        {name: 'RectangleInterpolator', color: '#12939A', size: 2042}
      ]
    },
    {name: 'ISchedulable', color: '#12939A', size: 1041},
    {name: 'Parallel', color: '#12939A', size: 5176},
    {name: 'Pause', color: '#12939A', size: 449},
    {name: 'Scheduler', color: '#12939A', size: 5593},
    {name: 'Sequence', color: '#12939A', size: 5534},
    {name: 'Transition', color: '#12939A', size: 9201},
    {name: 'Transitioner', color: '#12939A', size: 19975},
    {name: 'TransitionEvent', color: '#12939A', size: 1116},
    {name: 'Neonate', color: '#12939A', size: 6006}
  ]}
};
const TABLE_PROPS = {
  height: 100,
  width: 100,
  header: ['a', 'b', 'c'],
  data: [[1, 2, 3], [4, 5, 6]]
};

const NOOP = f => f;

const XYPLOT_SERIES_PROPS = {
  xDomain: [0, 1],
  xRange: [0, 1],
  xType: 'linear',
  xDistance: 1,
  yDomain: [0, 1],
  yRange: [0, 1],
  yDistance: 1,
  yType: 'linear',
  data: [
    {x: 1, y: 1},
    {x: 2, y: 2}
  ],
  _allData: [[
    {x: 1, y: 1},
    {x: 2, y: 2}
  ]],
  onSeriesMouseOver: NOOP,
  onSeriesMouseOut: NOOP,
  onSeriesClick: NOOP,
  onValueMouseOver: NOOP,
  onValueMouseOut: NOOP,
  onValueClick: NOOP
};

const XYPLOT_XAXIS_PROPS = {
  xRange: [0, 1],
  xDomain: [0, 1],
  xType: 'linear',
  width: 100,
  height: 100,
  top: 0,
  left: 0
};

const XYPLOT_YAXIS_PROPS = {
  yRange: [0, 1],
  yDomain: [0, 1],
  yType: 'linear',
  width: 100,
  height: 100,
  top: 0,
  left: 0
};

const XYPLOT_PROPS = {width: 10, height: 10};

testRenderWithProps(AreaSeries, XYPLOT_SERIES_PROPS);
testRenderWithProps(HeatmapSeries, XYPLOT_SERIES_PROPS);
testRenderWithProps(HorizontalBarSeries, XYPLOT_SERIES_PROPS);
testRenderWithProps(HorizontalGrid, XYPLOT_YAXIS_PROPS);
testRenderWithProps(LineSeries, XYPLOT_SERIES_PROPS);
testRenderWithProps(MarkSeries, XYPLOT_SERIES_PROPS);
testRenderWithProps(Treemap, TREEMAP_PROPS);
testRenderWithProps(Treemap, TREEMAP_PROPS_WITH_DATA);
testRenderWithProps(Table, TABLE_PROPS);
testRenderWithProps(VerticalBarSeries, XYPLOT_SERIES_PROPS);
testRenderWithProps(VerticalGrid, XYPLOT_XAXIS_PROPS);
testRenderWithProps(XAxisBottom, XYPLOT_XAXIS_PROPS);
testRenderWithProps(XYPlot, XYPLOT_PROPS);
testRenderWithProps(YAxisLeft, XYPLOT_YAXIS_PROPS);
