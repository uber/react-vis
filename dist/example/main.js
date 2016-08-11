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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9leGFtcGxlL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFvQkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUVBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sV0FDSjtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLEdBREY7QUFFRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBREY7QUFFRTtBQUFBO0FBQUE7QUFDRTtBQURGLEtBRkY7QUFLRTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBTEY7QUFNRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BREY7QUFFRTtBQUZGLEtBTkY7QUFVRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BREY7QUFFRTtBQUZGLEtBVkY7QUFjRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BREY7QUFFRTtBQUZGLEtBZEY7QUFrQkU7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQURGO0FBRUU7QUFGRixLQWxCRjtBQXNCRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BREY7QUFFRTtBQUZGLEtBdEJGO0FBMEJFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FERjtBQUVFO0FBRkYsS0ExQkY7QUE4QkU7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQURGO0FBRUU7QUFGRixLQTlCRjtBQWtDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBbENGO0FBbUNFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FERjtBQUVFO0FBRkYsS0FuQ0Y7QUF1Q0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQURGO0FBRUU7QUFGRixLQXZDRjtBQTJDRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BREY7QUFFRTtBQUZGLEtBM0NGO0FBK0NFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FERjtBQUVFO0FBRkYsS0EvQ0Y7QUFtREU7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQW5ERjtBQW9ERTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BREY7QUFFRTtBQUZGLEtBcERGO0FBd0RFO0FBQUE7QUFBQTtBQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FERjtBQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FGRjtBQUdFO0FBSEYsS0F4REY7QUE2REU7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQURGO0FBRUU7QUFGRixLQTdERjtBQWlFRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BREY7QUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BRkY7QUFHRTtBQUhGLEtBakVGO0FBc0VFO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0F0RUY7QUF1RUU7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQURGO0FBRUU7QUFGRixLQXZFRjtBQTJFRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BREY7QUFFRTtBQUZGLEtBM0VGO0FBZ0ZFO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FoRkY7QUFpRkU7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQURGO0FBRUU7QUFGRixLQWpGRjtBQXNGRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BREY7QUFFRTtBQUZGLEtBdEZGO0FBMkZFO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0EzRkY7QUE0RkU7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQURGO0FBRUU7QUFGRixLQTVGRjtBQWdHRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BREY7QUFFRTtBQUZGLEtBaEdGO0FBcUdFO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FyR0Y7QUFzR0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQURGO0FBRUU7QUFGRixLQXRHRjtBQTBHRTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BREY7QUFFRTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BRkY7QUFHRTtBQUhGO0FBMUdGO0FBRkYsQ0FERjs7OztBQXdIQSxJQUFNLEtBQUssbUJBQVMsYUFBVCxDQUF1QixLQUF2QixDQUFYO0FBQ0EsSUFBTSxTQUFTLHlDQUF3QixtQkFBUyxNQUFqQyxHQUEwQyxnQkFBTSxNQUEvRDtBQUNBLG1CQUFTLElBQVQsQ0FBYyxXQUFkLENBQTBCLEVBQTFCO0FBQ0EsT0FBTyxRQUFQLEVBQWlCLEVBQWpCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTYgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgZG9jdW1lbnQgZnJvbSAnZ2xvYmFsL2RvY3VtZW50JztcblxuaW1wb3J0IENvbXBsZXhDaGFydCBmcm9tICcuL3Bsb3QvY29tcGxleC1jaGFydCc7XG5pbXBvcnQgTGluZUNoYXJ0IGZyb20gJy4vcGxvdC9saW5lLWNoYXJ0JztcbmltcG9ydCBMaW5lTWFya0NoYXJ0IGZyb20gJy4vcGxvdC9saW5lbWFyay1jaGFydCc7XG5pbXBvcnQgQmFyQ2hhcnQgZnJvbSAnLi9wbG90L2Jhci1jaGFydCc7XG5pbXBvcnQgU3RhY2tlZEJhckNoYXJ0IGZyb20gJy4vcGxvdC9zdGFja2VkLWJhci1jaGFydCc7XG5pbXBvcnQgQXJlYUNoYXJ0IGZyb20gJy4vcGxvdC9hcmVhLWNoYXJ0JztcbmltcG9ydCBTY2F0dGVwbG90Q2hhcnQgZnJvbSAnLi9wbG90L3NjYXR0ZXJwbG90JztcbmltcG9ydCBIZWF0bWFwQ2hhcnQgZnJvbSAnLi9wbG90L2hlYXRtYXAtY2hhcnQnO1xuaW1wb3J0IFdpZHRoSGVpZ2h0TWFyZ2luQ2hhcnQgZnJvbSAnLi9wbG90L3dpZHRoLWhlaWdodC1tYXJnaW4nO1xuaW1wb3J0IEN1c3RvbVNjYWxlcyBmcm9tICcuL3Bsb3QvY3VzdG9tLXNjYWxlcyc7XG5pbXBvcnQgQ3VzdG9tQXhpc0NoYXJ0IGZyb20gJy4vcGxvdC9jdXN0b20tYXhpcyc7XG5pbXBvcnQgR3JpZExpbmVzQ2hhcnQgZnJvbSAnLi9wbG90L2dyaWQnO1xuaW1wb3J0IFN0YXRpY0hpbnRzIGZyb20gJy4vcGxvdC9zdGF0aWMtaGludHMnO1xuaW1wb3J0IER5bmFtaWNIaW50cyBmcm9tICcuL3Bsb3QvZHluYW1pYy1oaW50cyc7XG5pbXBvcnQgU3RhdGljQ3Jvc3NoYWlyIGZyb20gJy4vcGxvdC9zdGF0aWMtY3Jvc3NoYWlyJztcbmltcG9ydCBEeW5hbWljQ3Jvc3NoYWlyIGZyb20gJy4vcGxvdC9keW5hbWljLWNyb3NzaGFpcic7XG5pbXBvcnQgU3luY2VkQ2hhcnRzIGZyb20gJy4vcGxvdC9zeW5jZWQtY2hhcnRzJztcbmltcG9ydCBUaW1lQ2hhcnQgZnJvbSAnLi9wbG90L3RpbWUtY2hhcnQnO1xuXG5pbXBvcnQgU2ltcGxlVHJlZW1hcCBmcm9tICcuL3RyZWVtYXAvc2ltcGxlLXRyZWVtYXAnO1xuaW1wb3J0IFRyZWVtYXBFeGFtcGxlIGZyb20gJy4vdHJlZW1hcC9keW5hbWljLXRyZWVtYXAnO1xuXG5pbXBvcnQgU3RhdGljVGFibGUgZnJvbSAnLi90YWJsZS9zdGF0aWMtdGFibGUnO1xuaW1wb3J0IER5bmFtaWNUYWJsZSBmcm9tICcuL3RhYmxlL2R5bmFtaWMtdGFibGUnO1xuXG5pbXBvcnQgU2ltcGxlUmFkaWFsQ2hhcnQgZnJvbSAnLi9yYWRpYWwtY2hhcnQvc2ltcGxlLXJhZGlhbC1jaGFydCc7XG5cbmltcG9ydCBDdXN0b21SYWRpdXNSYWRpYWxDaGFydCBmcm9tICcuL3JhZGlhbC1jaGFydC9jdXN0b20tcmFkaXVzLXJhZGlhbC1jaGFydCc7XG5cbmltcG9ydCB7aXNSZWFjdERPTVN1cHBvcnRlZH0gZnJvbSAnLi4vbGliL3V0aWxzL3JlYWN0LXV0aWxzJztcblxuY29uc3QgZXhhbXBsZXMgPSAoXG4gIDxtYWluPlxuICAgIDxoZWFkZXI+cmVhY3QtdmlzPC9oZWFkZXI+XG4gICAgPGFydGljbGU+XG4gICAgICA8aDE+Q2hhcnQ8L2gxPlxuICAgICAgPHNlY3Rpb24+XG4gICAgICAgIDxDb21wbGV4Q2hhcnQgLz5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDxoMj5TZXJpZXMgVHlwZXM8L2gyPlxuICAgICAgPHNlY3Rpb24+XG4gICAgICAgIDxoMz5MaW5lIFNlcmllczwvaDM+XG4gICAgICAgIDxMaW5lQ2hhcnQgLz5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8aDM+TGluZU1hcmsgU2VyaWVzPC9oMz5cbiAgICAgICAgPExpbmVNYXJrQ2hhcnQgLz5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8aDM+TWFyayBTZXJpZXM8L2gzPlxuICAgICAgICA8U2NhdHRlcGxvdENoYXJ0IC8+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgICA8c2VjdGlvbj5cbiAgICAgICAgPGgzPkFyZWEgU2VyaWVzPC9oMz5cbiAgICAgICAgPEFyZWFDaGFydCAvPlxuICAgICAgPC9zZWN0aW9uPlxuICAgICAgPHNlY3Rpb24+XG4gICAgICAgIDxoMz5CYXIgU2VyaWVzPC9oMz5cbiAgICAgICAgPEJhckNoYXJ0IC8+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgICA8c2VjdGlvbj5cbiAgICAgICAgPGgzPlN0YWNrZWQgQmFyIFNlcmllczwvaDM+XG4gICAgICAgIDxTdGFja2VkQmFyQ2hhcnQgLz5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8aDM+SGVhdG1hcCBTZXJpZXM8L2gzPlxuICAgICAgICA8SGVhdG1hcENoYXJ0IC8+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgICA8aDI+QmFzaWMgQ29tcG9uZW50czwvaDI+XG4gICAgICA8c2VjdGlvbj5cbiAgICAgICAgPGgzPkN1c3RvbSBTaXplIGFuZCBNYXJnaW48L2gzPlxuICAgICAgICA8V2lkdGhIZWlnaHRNYXJnaW5DaGFydCAvPlxuICAgICAgPC9zZWN0aW9uPlxuICAgICAgPHNlY3Rpb24+XG4gICAgICAgIDxoMz5DdXN0b20gc2NhbGVzPC9oMz5cbiAgICAgICAgPEN1c3RvbVNjYWxlcyAvPlxuICAgICAgPC9zZWN0aW9uPlxuICAgICAgPHNlY3Rpb24+XG4gICAgICAgIDxoMz5DdXN0b20gQXhpczwvaDM+XG4gICAgICAgIDxDdXN0b21BeGlzQ2hhcnQgLz5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8aDM+Q3VzdG9tIEdyaWRMaW5lczwvaDM+XG4gICAgICAgIDxHcmlkTGluZXNDaGFydCAvPlxuICAgICAgPC9zZWN0aW9uPlxuICAgICAgPGgyPlRvb2x0aXBzPC9oMj5cbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8aDM+U3RhdGljIEhpbnRzPC9oMz5cbiAgICAgICAgPFN0YXRpY0hpbnRzIC8+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgICA8c2VjdGlvbj5cbiAgICAgICAgPGgzPkR5bmFtaWMgSGludHM8L2gzPlxuICAgICAgICA8cD5Nb3ZlIG1vdXNlIG92ZXIgdGhlIHBvaW50IHRvIHNlZSB0aGUgaGludC48L3A+XG4gICAgICAgIDxEeW5hbWljSGludHMgLz5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8aDM+U3RhdGljIENyb3NzaGFpcjwvaDM+XG4gICAgICAgIDxTdGF0aWNDcm9zc2hhaXIgLz5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8aDM+RHluYW1pYyBDcm9zc2hhaXI8L2gzPlxuICAgICAgICA8cD5Nb3ZlIHlvdXIgbW91c2Ugb3ZlciB0aGUgY2hhcnQgdG8gc2VlIHRoZSBwb2ludC48L3A+XG4gICAgICAgIDxEeW5hbWljQ3Jvc3NoYWlyIC8+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgICA8aDI+TWlzY2VsbGFuZW91czwvaDI+XG4gICAgICA8c2VjdGlvbj5cbiAgICAgICAgPGgzPlN5bmNlZCBDaGFydHM8L2gzPlxuICAgICAgICA8U3luY2VkQ2hhcnRzIC8+XG4gICAgICA8L3NlY3Rpb24+XG4gICAgICA8c2VjdGlvbj5cbiAgICAgICAgPGgzPlRpbWUgQ2hhcnQ8L2gzPlxuICAgICAgICA8VGltZUNoYXJ0IC8+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxoMT5SYWRpYWwgQ2hhcnQ8L2gxPlxuICAgICAgPHNlY3Rpb24+XG4gICAgICAgIDxoMz5TaW1wbGUgUmFkaWFsIENoYXJ0PC9oMz5cbiAgICAgICAgPFNpbXBsZVJhZGlhbENoYXJ0IC8+XG4gICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8aDM+Q3VzdG9tIFJhZGl1czwvaDM+XG4gICAgICAgIDxDdXN0b21SYWRpdXNSYWRpYWxDaGFydCAvPlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8aDE+VHJlZW1hcDwvaDE+XG4gICAgICA8c2VjdGlvbj5cbiAgICAgICAgPGgzPlNpbXBsZSBUcmVlbWFwPC9oMz5cbiAgICAgICAgPFNpbXBsZVRyZWVtYXAgLz5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8aDM+QW5pbWF0ZWQgVHJlZW1hcDwvaDM+XG4gICAgICAgIDxUcmVlbWFwRXhhbXBsZSAvPlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICA8aDE+VGFibGU8L2gxPlxuICAgICAgPHNlY3Rpb24+XG4gICAgICAgIDxoMz5TdGF0aWMgVGFibGU8L2gzPlxuICAgICAgICA8U3RhdGljVGFibGUgLz5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDxzZWN0aW9uPlxuICAgICAgICA8aDM+RHluYW1pYyBUYWJsZTwvaDM+XG4gICAgICAgIDxwPlVwZGF0ZXMgZWFjaCA1IHNlY29uZHM8L3A+XG4gICAgICAgIDxEeW5hbWljVGFibGUgLz5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICA8L2FydGljbGU+XG4gIDwvbWFpbj5cbik7XG5cbi8vIENhbm5vdCByZW5kZXIgdG8gYm9keSBhbnltb3JlOiByZWFjdCBpcyB0aHJvd2luZyB3YXJuaW5ncy5cbi8vIEFkZGluZyBuZXcgZWxlbWVudCBpbnN0ZWFkLlxuY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbmNvbnN0IHJlbmRlciA9IGlzUmVhY3RET01TdXBwb3J0ZWQoKSA/IFJlYWN0RE9NLnJlbmRlciA6IFJlYWN0LnJlbmRlcjtcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpO1xucmVuZGVyKGV4YW1wbGVzLCBlbCk7XG4iXX0=