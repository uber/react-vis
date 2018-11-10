// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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
import HorizontalBarSeries from 'plot/series/horizontal-rect-series';
import VerticalBarSeries from 'plot/series/vertical-rect-series';

test('series-utils #isSeriesChild', t => {
  const series = <LineSeries data={[]} />;
  t.ok(isSeriesChild(series), 'Should return true for series');
  const axis = <XAxis
    xRange={[0, 1]}
    xDomain={[0, 1]}
    xType="linear"
    width={100}
    height={100}
    top={0}
    left={0} />;
  t.notOk(isSeriesChild(axis), 'Should return false for non-series');
  t.end();
});

test('series-utils #getSeriesChildren', t => {
  const children = [
    <span key="wild"> This squid is heavy </span>,
    <input key="wacky" placeholder="i wish i hadnt bought it" />,
    <LineSeries key="woah" data={[]} />
  ];
  const $ = mount(
    <div width={300} height={300}>
      {children}
    </div>
  );
  const expectedChildren = [{...children[2], key: '.$woah'}];
  t.deepEqual(
    getSeriesChildren($.props().children),
    expectedChildren,
    'should find the correct children'
  );
  t.end();
});

const arePropsValid = seriesProps => {
  return (
    typeof seriesProps._colorValue !== 'undefined' &&
    typeof seriesProps._opacityValue !== 'undefined' &&
    typeof seriesProps.sameTypeIndex === 'number' &&
    typeof seriesProps.sameTypeTotal === 'number' &&
    typeof seriesProps.seriesIndex === 'number'
  );
};

test('series-utils #collectSeriesTypesInfo', t => {
  const result = getSeriesPropsFromChildren([
    <LineSeries data={[]} />,
    <LineSeries data={[]} />
  ]);
  t.ok(result.length === 2, 'Returns array of proper size');
  result.forEach((props, i) =>
    t.ok(arePropsValid(props), `Props #${i} are valid`)
  );
  t.end();
});

test('series-utils #seriesClusterProps', t => {
  const result = getSeriesPropsFromChildren([
    <HorizontalBarSeries cluster="alpha" data={[]} />,
    <HorizontalBarSeries cluster="beta" data={[]} />,
    <HorizontalBarSeries cluster="alpha" data={[]} />,
    <HorizontalBarSeries cluster="gamma" data={[]} />
  ]);
  const expectedClusters = ['alpha', 'beta', 'gamma'];
  t.ok(result.length === 4, 'Returns array of proper size');
  result.forEach((props, i) => {
    t.ok(props.sameTypeIndex === expectedClusters.indexOf(props.cluster));
    t.ok(
      props.sameTypeTotal === props.clusters.length,
      'SameTypeTotal is set correctly'
    );
    t.ok(
      props.clusters.length === 3,
      'Returns correct number of unique clusters'
    );
  });
  t.end();
});

// eslint-disable-next-line max-statements
test('series-utils #getStackedData', t => {
  const yData = [
    [{y: 2, x: 10}, {y: 4, x: 5}, {y: 5, x: 15}],
    [{y: 2, x: 12}, {y: 4, x: 2}, {y: 5, x: 11}]
  ];

  const stackByYExpected = [
    [{x: 2, y: 10}, {x: 4, y: 5}, {x: 5, y: 15}],
    [{x: 2, y: 22, y0: 10}, {x: 4, y: 7, y0: 5}, {x: 5, y: 26, y0: 15}],
    undefined
  ];

  const stackByXExpected = [
    [{y: 2, x: 10}, {y: 4, x: 5}, {y: 5, x: 15}],
    [{y: 2, x: 22, x0: 10}, {y: 4, x: 7, x0: 5}, {y: 5, x: 26, x0: 15}],
    null
  ];

  const stackByYExpectedPartial = [
    [{x: 2, y: 10}, {x: 4, y: 5}],
    [{x: 4, y: 7, y0: 5}, {x: 5, y: 11}]
  ];

  const stackByXExpectedPartial = [
    [{y: 2, x: 10}, {y: 4, x: 5}],
    [{y: 4, x: 7, x0: 5}, {y: 5, x: 11}]
  ];

  // Transpose data to flip stacking
  const xData = yData.map(arr => arr.map(d => ({x: d.y, y: d.x})));

  const partialYData = [yData[0].slice(0, 2), yData[1].slice(1)];
  const partialXData = partialYData.map(arr =>
    arr.map(d => ({x: d.y, y: d.x}))
  );

  let children = [
    <VerticalBarSeries data={xData[0]} />,
    <VerticalBarSeries data={xData[1]} />,
    <div> i think i will by that lamp </div>
  ];

  let results = getStackedData(children, 'y');
  t.deepEqual(
    results,
    stackByYExpected,
    'should find the correct results for stacking by y'
  );

  children = [
    <HorizontalBarSeries data={yData[0]} />,
    <HorizontalBarSeries data={yData[1]} />,
    null
  ];
  results = getStackedData(children, 'x');

  t.deepEqual(
    results,
    stackByXExpected,
    'should find the correct results for stacking by x'
  );

  children = [
    <HorizontalBarSeries cluster="alpha" data={yData[0]} />,
    <HorizontalBarSeries cluster="alpha" data={yData[1]} />,
    <HorizontalBarSeries cluster="beta" data={yData[0]} />,
    <HorizontalBarSeries cluster="beta" data={yData[1]} />
  ];
  results = getStackedData(children, 'x');
  let expectedResults = [
    ...stackByXExpected.slice(0, 2),
    ...stackByXExpected.slice(0, 2)
  ];

  t.deepEqual(
    results,
    expectedResults,
    'should find the correct results for stacking bar clusters by x'
  );

  children = [
    <VerticalBarSeries cluster="alpha" data={xData[0]} />,
    <VerticalBarSeries cluster="alpha" data={xData[1]} />,
    <VerticalBarSeries cluster="beta" data={xData[0]} />,
    <VerticalBarSeries cluster="beta" data={xData[1]} />
  ];
  results = getStackedData(children, 'y');
  expectedResults = [
    ...stackByYExpected.slice(0, 2),
    ...stackByYExpected.slice(0, 2)
  ];
  t.deepEqual(
    results,
    expectedResults,
    'should find the correct results for stacking bar clusters by y'
  );

  children = [
    <HorizontalBarSeries cluster="alpha" data={partialYData[0]} />,
    <HorizontalBarSeries cluster="alpha" data={partialYData[1]} />,
    <HorizontalBarSeries cluster="beta" data={partialYData[0]} />,
    <HorizontalBarSeries cluster="beta" data={partialYData[1]} />
  ];
  results = getStackedData(children, 'x');
  expectedResults = [...stackByXExpectedPartial, ...stackByXExpectedPartial];
  t.deepEqual(
    results,
    expectedResults,
    'should find the correct results for stacking bar clusters by x with incomplete data'
  );

  children = [
    <VerticalBarSeries cluster="alpha" data={partialXData[0]} />,
    <VerticalBarSeries cluster="alpha" data={partialXData[1]} />,
    <VerticalBarSeries cluster="beta" data={partialXData[0]} />,
    <VerticalBarSeries cluster="beta" data={partialXData[1]} />
  ];
  results = getStackedData(children, 'y');
  expectedResults = [...stackByYExpectedPartial, ...stackByYExpectedPartial];

  t.deepEqual(
    results,
    expectedResults,
    'should find the correct results for stacking bar clusters by y with incomplete data'
  );

  children = [
    <VerticalBarSeries data={yData[0]} stack />,
    <VerticalBarSeries
      data={[{x: 10, y: 3}, {x: 5, y: 6}, {x: 15, y: 7}]}
      stack
    />,
    <LineSeries data={yData[1]} />
  ];
  results = getStackedData(children, 'y');
  expectedResults = [
    yData[0],
    [{x: 10, y: 5, y0: 2}, {x: 5, y: 10, y0: 4}, {x: 15, y: 12, y0: 5}],
    yData[1]
  ];
  t.deepEqual(
    results,
    expectedResults,
    'should find the correct results for stacking by y only the bars'
  );

  children = [
    <VerticalBarSeries cluster="alpha" data={xData[0]} stack />,
    <VerticalBarSeries cluster="alpha" data={xData[1]} stack />,
    <VerticalBarSeries cluster="beta" data={xData[0]} stack />,
    <VerticalBarSeries cluster="beta" data={xData[1]} stack />,
    <LineSeries data={xData[1]} />
  ];
  results = getStackedData(children, 'y');
  expectedResults = [
    ...stackByYExpected.slice(0, 2),
    ...stackByYExpected.slice(0, 2),
    xData[1]
  ];
  t.deepEqual(
    results,
    expectedResults,
    'should find the correct results for stacking bar clusters by y with a non stacked line'
  );

  t.end();
});
