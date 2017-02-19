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

import AreaSeries from 'plot/series/area-series';
import HeatmapSeries from 'plot/series/heatmap-series';
import HorizontalBarSeries from 'plot/series/horizontal-bar-series';
import HorizontalGrid from 'plot/horizontal-grid-lines';
import LineSeries from 'plot/series/line-series';
import MarkSeries from 'plot/series/mark-series';
import VerticalBarSeries from 'plot/series/vertical-bar-series';
import VerticalGrid from 'plot/vertical-grid-lines';
import XAxisBottom from 'plot/axis/x-axis';
import XYPlot from 'plot/xy-plot';
import YAxisLeft from 'plot/axis/y-axis';

import {testRenderWithProps} from './test-utils';
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
testRenderWithProps(VerticalBarSeries, XYPLOT_SERIES_PROPS);
testRenderWithProps(VerticalGrid, XYPLOT_XAXIS_PROPS);
testRenderWithProps(XAxisBottom, XYPLOT_XAXIS_PROPS);
testRenderWithProps(XYPlot, XYPLOT_PROPS);
testRenderWithProps(YAxisLeft, XYPLOT_YAXIS_PROPS);
