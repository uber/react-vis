'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _treemap = require('../lib/treemap/treemap');

var _treemap2 = _interopRequireDefault(_treemap);

var _table = require('../lib/table/table');

var _table2 = _interopRequireDefault(_table);

var _lineSeries = require('../lib/plot/series/line-series');

var _lineSeries2 = _interopRequireDefault(_lineSeries);

var _areaSeries = require('../lib/plot/series/area-series');

var _areaSeries2 = _interopRequireDefault(_areaSeries);

var _markSeries = require('../lib/plot/series/mark-series');

var _markSeries2 = _interopRequireDefault(_markSeries);

var _heatmapSeries = require('../lib/plot/series/heatmap-series');

var _heatmapSeries2 = _interopRequireDefault(_heatmapSeries);

var _verticalBarSeries = require('../lib/plot/series/vertical-bar-series');

var _verticalBarSeries2 = _interopRequireDefault(_verticalBarSeries);

var _horizontalBarSeries = require('../lib/plot/series/horizontal-bar-series');

var _horizontalBarSeries2 = _interopRequireDefault(_horizontalBarSeries);

var _xAxis = require('../lib/plot/x-axis');

var _xAxis2 = _interopRequireDefault(_xAxis);

var _yAxis = require('../lib/plot/y-axis');

var _yAxis2 = _interopRequireDefault(_yAxis);

var _verticalGridLines = require('../lib/plot/vertical-grid-lines');

var _verticalGridLines2 = _interopRequireDefault(_verticalGridLines);

var _horizontalGridLines = require('../lib/plot/horizontal-grid-lines');

var _horizontalGridLines2 = _interopRequireDefault(_horizontalGridLines);

var _xyPlot = require('../lib/plot/xy-plot');

var _xyPlot2 = _interopRequireDefault(_xyPlot);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function testRenderWithProps(Component, props) {
  return (0, _tape2.default)('Rendering ' + Component.displayName, function (assert) {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(Component, props));
    var wrapperProps = wrapper.props();
    assert.ok(wrapper.find(Component).length, Component.displayName + ' is rendered');
    Object.keys(props).forEach(function (propName) {
      assert.ok(wrapperProps[propName] === props[propName], propName + ' is set');
    });
    assert.end();
  });
}

function NOOP() {}

var TREEMAP_PROPS = { height: 100, width: 100, data: {} };

var TABLE_PROPS = {
  height: 100,
  width: 100,
  header: ['a', 'b', 'c'],
  data: [[1, 2, 3], [4, 5, 6]]
};

var XYPLOT_SERIES_PROPS = {
  xDomain: [0, 1],
  xRange: [0, 1],
  xType: 'linear',
  xDistance: 1,
  yDomain: [0, 1],
  yRange: [0, 1],
  yDistance: 1,
  yType: 'linear',
  data: [{ x: 1, y: 1 }, { x: 2, y: 2 }],
  _allData: [[{ x: 1, y: 1 }, { x: 2, y: 2 }]],
  onSeriesMouseOver: NOOP,
  onSeriesMouseOut: NOOP,
  onSeriesClick: NOOP,
  onValueMouseOver: NOOP,
  onValueMouseOut: NOOP,
  onValueClick: NOOP
};

var XYPLOT_XAXIS_PROPS = {
  xRange: [0, 1],
  xDomain: [0, 1],
  xType: 'linear'
};

var XYPLOT_YAXIS_PROPS = {
  yRange: [0, 1],
  yDomain: [0, 1],
  yType: 'linear'
};

var XYPLOT_PROPS = { width: 10, height: 10 };

testRenderWithProps(_treemap2.default, TREEMAP_PROPS);
testRenderWithProps(_table2.default, TABLE_PROPS);
testRenderWithProps(_lineSeries2.default, XYPLOT_SERIES_PROPS);
testRenderWithProps(_areaSeries2.default, XYPLOT_SERIES_PROPS);
testRenderWithProps(_markSeries2.default, XYPLOT_SERIES_PROPS);
testRenderWithProps(_verticalBarSeries2.default, XYPLOT_SERIES_PROPS);
testRenderWithProps(_horizontalBarSeries2.default, XYPLOT_SERIES_PROPS);
testRenderWithProps(_heatmapSeries2.default, XYPLOT_SERIES_PROPS);
testRenderWithProps(_xAxis2.default, XYPLOT_XAXIS_PROPS);
testRenderWithProps(_yAxis2.default, XYPLOT_YAXIS_PROPS);
testRenderWithProps(_verticalGridLines2.default, XYPLOT_XAXIS_PROPS);
testRenderWithProps(_horizontalGridLines2.default, XYPLOT_YAXIS_PROPS);
testRenderWithProps(_xyPlot2.default, XYPLOT_PROPS);