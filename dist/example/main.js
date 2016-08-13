'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _complexChart = require('./plot/complex-chart');

var _complexChart2 = _interopRequireDefault(_complexChart);

var _lineChart = require('./plot/line-chart');

var _lineChart2 = _interopRequireDefault(_lineChart);

var _linemarkChart = require('./plot/linemark-chart');

var _linemarkChart2 = _interopRequireDefault(_linemarkChart);

var _barChart = require('./plot/bar-chart');

var _barChart2 = _interopRequireDefault(_barChart);

var _stackedBarChart = require('./plot/stacked-bar-chart');

var _stackedBarChart2 = _interopRequireDefault(_stackedBarChart);

var _areaChart = require('./plot/area-chart');

var _areaChart2 = _interopRequireDefault(_areaChart);

var _scatterplot = require('./plot/scatterplot');

var _scatterplot2 = _interopRequireDefault(_scatterplot);

var _heatmapChart = require('./plot/heatmap-chart');

var _heatmapChart2 = _interopRequireDefault(_heatmapChart);

var _widthHeightMargin = require('./plot/width-height-margin');

var _widthHeightMargin2 = _interopRequireDefault(_widthHeightMargin);

var _customScales = require('./plot/custom-scales');

var _customScales2 = _interopRequireDefault(_customScales);

var _customAxis = require('./plot/custom-axis');

var _customAxis2 = _interopRequireDefault(_customAxis);

var _grid = require('./plot/grid');

var _grid2 = _interopRequireDefault(_grid);

var _staticHints = require('./plot/static-hints');

var _staticHints2 = _interopRequireDefault(_staticHints);

var _dynamicHints = require('./plot/dynamic-hints');

var _dynamicHints2 = _interopRequireDefault(_dynamicHints);

var _staticCrosshair = require('./plot/static-crosshair');

var _staticCrosshair2 = _interopRequireDefault(_staticCrosshair);

var _dynamicCrosshair = require('./plot/dynamic-crosshair');

var _dynamicCrosshair2 = _interopRequireDefault(_dynamicCrosshair);

var _syncedCharts = require('./plot/synced-charts');

var _syncedCharts2 = _interopRequireDefault(_syncedCharts);

var _timeChart = require('./plot/time-chart');

var _timeChart2 = _interopRequireDefault(_timeChart);

var _simpleTreemap = require('./treemap/simple-treemap');

var _simpleTreemap2 = _interopRequireDefault(_simpleTreemap);

var _dynamicTreemap = require('./treemap/dynamic-treemap');

var _dynamicTreemap2 = _interopRequireDefault(_dynamicTreemap);

var _staticTable = require('./table/static-table');

var _staticTable2 = _interopRequireDefault(_staticTable);

var _dynamicTable = require('./table/dynamic-table');

var _dynamicTable2 = _interopRequireDefault(_dynamicTable);

var _simpleRadialChart = require('./radial-chart/simple-radial-chart');

var _simpleRadialChart2 = _interopRequireDefault(_simpleRadialChart);

var _customRadiusRadialChart = require('./radial-chart/custom-radius-radial-chart');

var _customRadiusRadialChart2 = _interopRequireDefault(_customRadiusRadialChart);

var _reactUtils = require('../lib/utils/react-utils');

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

var examples = _react2.default.createElement(
  'main',
  null,
  _react2.default.createElement(
    'header',
    null,
    'react-vis'
  ),
  _react2.default.createElement(
    'article',
    null,
    _react2.default.createElement(
      'h1',
      null,
      'Chart'
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(_complexChart2.default, null)
    ),
    _react2.default.createElement(
      'h2',
      null,
      'Series Types'
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Line Series'
      ),
      _react2.default.createElement(_lineChart2.default, null)
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'LineMark Series'
      ),
      _react2.default.createElement(_linemarkChart2.default, null)
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Mark Series'
      ),
      _react2.default.createElement(_scatterplot2.default, null)
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Area Series'
      ),
      _react2.default.createElement(_areaChart2.default, null)
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Bar Series'
      ),
      _react2.default.createElement(_barChart2.default, null)
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Stacked Bar Series'
      ),
      _react2.default.createElement(_stackedBarChart2.default, null)
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Heatmap Series'
      ),
      _react2.default.createElement(_heatmapChart2.default, null)
    ),
    _react2.default.createElement(
      'h2',
      null,
      'Basic Components'
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Custom Size and Margin'
      ),
      _react2.default.createElement(_widthHeightMargin2.default, null)
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Custom scales'
      ),
      _react2.default.createElement(_customScales2.default, null)
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Custom Axis'
      ),
      _react2.default.createElement(_customAxis2.default, null)
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Custom GridLines'
      ),
      _react2.default.createElement(_grid2.default, null)
    ),
    _react2.default.createElement(
      'h2',
      null,
      'Tooltips'
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Static Hints'
      ),
      _react2.default.createElement(_staticHints2.default, null)
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Dynamic Hints'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Move mouse over the point to see the hint.'
      ),
      _react2.default.createElement(_dynamicHints2.default, null)
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Static Crosshair'
      ),
      _react2.default.createElement(_staticCrosshair2.default, null)
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Dynamic Crosshair'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Move your mouse over the chart to see the point.'
      ),
      _react2.default.createElement(_dynamicCrosshair2.default, null)
    ),
    _react2.default.createElement(
      'h2',
      null,
      'Miscellaneous'
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Synced Charts'
      ),
      _react2.default.createElement(_syncedCharts2.default, null)
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Time Chart'
      ),
      _react2.default.createElement(_timeChart2.default, null)
    ),
    _react2.default.createElement(
      'h1',
      null,
      'Radial Chart'
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Simple Radial Chart'
      ),
      _react2.default.createElement(_simpleRadialChart2.default, null)
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Custom Radius'
      ),
      _react2.default.createElement(_customRadiusRadialChart2.default, null)
    ),
    _react2.default.createElement(
      'h1',
      null,
      'Treemap'
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Simple Treemap'
      ),
      _react2.default.createElement(_simpleTreemap2.default, null)
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Animated Treemap'
      ),
      _react2.default.createElement(_dynamicTreemap2.default, null)
    ),
    _react2.default.createElement(
      'h1',
      null,
      'Table'
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Static Table'
      ),
      _react2.default.createElement(_staticTable2.default, null)
    ),
    _react2.default.createElement(
      'section',
      null,
      _react2.default.createElement(
        'h3',
        null,
        'Dynamic Table'
      ),
      _react2.default.createElement(
        'p',
        null,
        'Updates each 5 seconds'
      ),
      _react2.default.createElement(_dynamicTable2.default, null)
    )
  )
);

// Cannot render to body anymore: react is throwing warnings.
// Adding new element instead.
var el = _document2.default.createElement('div');
var render = (0, _reactUtils.isReactDOMSupported)() ? _reactDom2.default.render : _react2.default.render;
_document2.default.body.appendChild(el);
render(examples, el);