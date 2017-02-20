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

import {
  isSeriesChild,
  getSeriesPropsFromChildren,
  getSeriesChildren,
  getStackedData
} from 'utils/series-utils';
import LineSeries from 'plot/series/line-series';
import XAxis from 'plot/axis/x-axis';
import HorizontalBarSeries from 'plot/series/vertical-rect-series';

test('series-utils #isSeriesChild', t => {
  const series = React.createElement(LineSeries, {data: []});
  t.ok(isSeriesChild(series), 'Should return true for series');
  const axis = React.createElement(XAxis, {
    xRange: [0, 1],
    xDomain: [0, 1],
    xType: 'linear',
    width: 100,
    height: 100,
    top: 0,
    left: 0
  });
  t.notOk(isSeriesChild(axis), 'Should return false for non-series');
  t.end();
});

test('series-utils #getSeriesChildren', t => {
  const children = [
    (<span key="wild"> This squid is heavy </span>),
    (<input key="wacky" placeholder="i wish i hadnt bought it" />),
    (<LineSeries key="woah" data={[]} />)
  ];
  const $ = mount(
    <div width={300} height={300}>
      {children}
    </div>
  );
  const expectedChildren = [{...children[2], key: '.$woah'}];
  t.deepEqual(getSeriesChildren($.props().children), expectedChildren, 'should find the correct children');
  t.end();
});

const arePropsValid = seriesProps => {
  return typeof seriesProps._colorValue !== 'undefined' &&
    typeof seriesProps._opacityValue !== 'undefined' &&
    typeof seriesProps.ref === 'string' &&
    typeof seriesProps.sameTypeIndex === 'number' &&
    typeof seriesProps.sameTypeTotal === 'number' &&
    typeof seriesProps.seriesIndex === 'number';
};

test('series-utils #collectSeriesTypesInfo', t => {
  const result = getSeriesPropsFromChildren([
    React.createElement(LineSeries, {data: []}),
    React.createElement(LineSeries, {data: []})
  ]);
  t.ok(result.length === 2, 'Returns array of proper size');
  result.forEach((props, i) => t.ok(arePropsValid(props), `Props #${i} are valid`));
  t.end();
});

test('series-utils #getStackedData', t => {
  let children = [
    (<HorizontalBarSeries
      data={[
        {y: 2, x: 10},
        {y: 4, x: 5},
        {y: 5, x: 15}
      ]}
    />),
    (<HorizontalBarSeries
      data={[
        {y: 2, x: 12},
        {y: 4, x: 2},
        {y: 5, x: 11}
      ]}/>),
    (<div> i think i will by that lamp </div>)
  ];
  let results = getStackedData(children, 'y');
  let expectedResults = [[
    {x: 10, y: 2},
    {x: 5, y: 4},
    {x: 15, y: 5}
  ], [
    {x: 12, y: 4, y0: 2},
    {x: 2, y: 8, y0: 4},
    {x: 11, y: 10, y0: 5}
  ], undefined];
  t.deepEqual(results, expectedResults, 'should find the correct results for stacking by y');

  children = [
    (<HorizontalBarSeries
      data={[
        {x: 2, y: 10},
        {x: 4, y: 5},
        {x: 5, y: 15}
      ]}
    />),
    (<HorizontalBarSeries
      data={[
        {x: 2, y: 12},
        {x: 4, y: 2},
        {x: 5, y: 11}
      ]}/>),
    null
  ];
  results = getStackedData(children, 'x');
  expectedResults = [[
    {x: 2, y: 10},
    {x: 4, y: 5},
    {x: 5, y: 15}
  ], [
    {x: 4, x0: 2, y: 12},
    {x: 8, x0: 4, y: 2},
    {x: 10, x0: 5, y: 11}
  ], null];
  t.deepEqual(results, expectedResults, 'should find the correct results for stacking by x');
  t.end();
});
