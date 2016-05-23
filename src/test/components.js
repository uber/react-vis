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

import Treemap from '../lib/treemap/treemap';
import Table from '../lib/table/table';
import LineSeries from '../lib/plot/series/line-series';
import AreaSeries from '../lib/plot/series/area-series';
import MarkSeries from '../lib/plot/series/mark-series';
import HeatmapSeries from '../lib/plot/series/heatmap-series';
import VerticalBarSeries from '../lib/plot/series/vertical-bar-series';
import HorizontalBarSeries from '../lib/plot/series/horizontal-bar-series';
import XAxisBottom from '../lib/plot/x-axis';
import YAxisLeft from '../lib/plot/y-axis';
import VerticalGrid from '../lib/plot/vertical-grid-lines';
import HorizontalGrid from '../lib/plot/horizontal-grid-lines';
import XYPlot from '../lib/plot/xy-plot';

function testRenderWithProps(Component, props) {
  return test(`Rendering ${Component.displayName}`, (assert) => {
    const wrapper = mount(<Component {...props} />);
    assert.ok(
      wrapper.find(Component).length,
      `${Component.displayName} is rendered`
    );
    assert.end();
  });
}

const TREEMAP_PROPS = {height: 100, data: {}};

const TABLE_PROPS = {
  height: 100,
  width: 100,
  header: ['a', 'b', 'c'],
  data: [[1, 2, 3], [4, 5, 6]]
};

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
  ]]
};

const XYPLOT_XAXIS_PROPS = {
  xRange: [0, 1],
  xDomain: [0, 1],
  xType: 'linear'
};

const XYPLOT_YAXIS_PROPS = {
  yRange: [0, 1],
  yDomain: [0, 1],
  yType: 'linear'
};

const XYPLOT_PROPS = {width: 10, height: 10};

testRenderWithProps(Treemap, TREEMAP_PROPS);
testRenderWithProps(Table, TABLE_PROPS);
testRenderWithProps(LineSeries, XYPLOT_SERIES_PROPS);
testRenderWithProps(AreaSeries, XYPLOT_SERIES_PROPS);
testRenderWithProps(MarkSeries, XYPLOT_SERIES_PROPS);
testRenderWithProps(VerticalBarSeries, XYPLOT_SERIES_PROPS);
testRenderWithProps(HorizontalBarSeries, XYPLOT_SERIES_PROPS);
testRenderWithProps(HeatmapSeries, XYPLOT_SERIES_PROPS);
testRenderWithProps(XAxisBottom, XYPLOT_XAXIS_PROPS);
testRenderWithProps(YAxisLeft, XYPLOT_YAXIS_PROPS);
testRenderWithProps(VerticalGrid, XYPLOT_XAXIS_PROPS);
testRenderWithProps(HorizontalGrid, XYPLOT_YAXIS_PROPS);
testRenderWithProps(XYPlot, XYPLOT_PROPS);
