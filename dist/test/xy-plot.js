'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _verticalBarSeries = require('../lib/plot/series/vertical-bar-series');

var _verticalBarSeries2 = _interopRequireDefault(_verticalBarSeries);

var _xAxis = require('../lib/plot/x-axis');

var _xAxis2 = _interopRequireDefault(_xAxis);

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

(0, _tape2.default)('Render a stacked bar chart', function (assert) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _xyPlot2.default,
    { width: 300, height: 300, stackBy: 'y' },
    _react2.default.createElement(_verticalBarSeries2.default, {
      data: [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 2 }]
    }),
    _react2.default.createElement(_verticalBarSeries2.default, {
      data: [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 0 }] })
  ));

  var renderedVerticalBarsWrapper = wrapper.find(_verticalBarSeries2.default);

  assert.deepEqual(renderedVerticalBarsWrapper.at(0).prop('data'), [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 2 }], 'First bar series data is the same');

  assert.deepEqual(renderedVerticalBarsWrapper.at(1).prop('data'), [{ x: 1, y: 2, y0: 0 }, { x: 2, y: 2, y0: 1 }, { x: 3, y: 2, y0: 2 }], 'Second bar series data contains y0 values');

  assert.end();
});

(0, _tape2.default)('Render a stacked bar chart with other children', function (assert) {
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _xyPlot2.default,
    { width: 300, height: 300, stackBy: 'y' },
    _react2.default.createElement(_xAxis2.default, null),
    _react2.default.createElement(_verticalBarSeries2.default, {
      data: [{ x: 1, y: 0 }]
    }),
    _react2.default.createElement(_verticalBarSeries2.default, {
      data: [{ x: 1, y: 2 }] }),
    _react2.default.createElement('div', null)
  ));

  var renderedVerticalBarsWrapper = wrapper.find(_verticalBarSeries2.default);

  assert.deepEqual(renderedVerticalBarsWrapper.at(0).prop('data'), [{ x: 1, y: 0 }], 'First bar series data is the same');

  assert.deepEqual(renderedVerticalBarsWrapper.at(1).prop('data'), [{ x: 1, y: 2, y0: 0 }], 'Second bar series data contains y0 values');

  assert.end();
});