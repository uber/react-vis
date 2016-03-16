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
import 'babel-polyfill';

import React from 'react';

import {
  isSeriesChild,
  getSeriesPropsFromChildren} from '../lib/utils/series-utils';

import {LineSeries, XAxis} from '../';

test('series-utils/isSeriesChild', function t(assert) {
  const series = React.createElement(LineSeries, {data: []});
  assert.ok(isSeriesChild(series), 'Should return true for series');
  const axis = React.createElement(XAxis, {
    xRange: [0, 1],
    xDomain: [0, 1],
    xType: 'linear'
  });
  assert.notOk(isSeriesChild(axis), 'Should return false for non-series');
  assert.end();
});

function arePropsValid(seriesProps) {
  return typeof seriesProps._colorValue !== 'undefined' &&
    typeof seriesProps._opacityValue !== 'undefined' &&
    typeof seriesProps.ref === 'string' &&
    typeof seriesProps.sameTypeIndex === 'number' &&
    typeof seriesProps.sameTypeTotal === 'number' &&
    typeof seriesProps.seriesIndex === 'number';
}

test('series-utils/collectSeriesTypesInfo', function t(assert) {
  const result = getSeriesPropsFromChildren([
    React.createElement(LineSeries, {data: []}),
    React.createElement(LineSeries, {data: []})
  ]);
  assert.ok(result.length === 2, 'Returns array of proper size');
  result.forEach((props, i) => {
    assert.ok(arePropsValid(props), `Props #${i} are valid`);
  });
  assert.end();
});
