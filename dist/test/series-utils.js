'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

require('babel-polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _seriesUtils = require('../lib/utils/series-utils');

var _ = require('../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _tape2.default)('series-utils/isSeriesChild', function t(assert) {
  var series = _react2.default.createElement(_.LineSeries, { data: [] });
  assert.ok((0, _seriesUtils.isSeriesChild)(series), 'Should return true for series');
  var axis = _react2.default.createElement(_.XAxis, {
    xRange: [0, 1],
    xDomain: [0, 1],
    xType: 'linear'
  });
  assert.notOk((0, _seriesUtils.isSeriesChild)(axis), 'Should return false for non-series');
  assert.end();
}); // Copyright (c) 2016 Uber Technologies, Inc.
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

function arePropsValid(seriesProps) {
  return typeof seriesProps._colorValue !== 'undefined' && typeof seriesProps._opacityValue !== 'undefined' && typeof seriesProps.ref === 'string' && typeof seriesProps.sameTypeIndex === 'number' && typeof seriesProps.sameTypeTotal === 'number' && typeof seriesProps.seriesIndex === 'number';
}

(0, _tape2.default)('series-utils/collectSeriesTypesInfo', function t(assert) {
  var result = (0, _seriesUtils.getSeriesPropsFromChildren)([_react2.default.createElement(_.LineSeries, { data: [] }), _react2.default.createElement(_.LineSeries, { data: [] })]);
  assert.ok(result.length === 2, 'Returns array of proper size');
  result.forEach(function (props, i) {
    assert.ok(arePropsValid(props), 'Props #' + i + ' are valid');
  });
  assert.end();
});