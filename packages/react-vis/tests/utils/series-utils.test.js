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

import React from 'react';
import {mount} from 'enzyme';

import {
  isSeriesChild,
  getSeriesPropsFromChildren,
  getSeriesChildren,
  getStackedData
} from '~/utils/series-utils';
import LineSeries from '~/plot/series/line-series';
import XAxis from '~/plot/axis/x-axis';
import HorizontalBarSeries from '~/plot/series/horizontal-rect-series';
import VerticalBarSeries from '~/plot/series/vertical-rect-series';
import LabelSeries from '~/plot/series/label-series';

describe('series-utils', () => {
  test('isSeriesChild', () => {
    const series = <LineSeries data={[]} />;
    expect(isSeriesChild(series)).toBeTruthy();
    const axis = (
      <XAxis
        xRange={[0, 1]}
        xDomain={[0, 1]}
        xType="linear"
        width={100}
        height={100}
        top={0}
        left={0}
      />
    );
    expect(isSeriesChild(axis)).toBeFalsy();
  });

  test('getSeriesChildren', () => {
    const children = [
      <text key="wild"> This squid is heavy </text>,
      <circle key="wacky" cx="50" cy="50" r="50" />,
      <LineSeries key="woah" data={[]} />
    ];
    const $ = mount(
      <svg width={300} height={300}>
        {children}
      </svg>
    );
    const expectedChildren = [{...children[2], key: '.$woah'}];
    expect(getSeriesChildren($.props().children)).toEqual(expectedChildren);
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

  test('collectSeriesTypesInfo', () => {
    const result = getSeriesPropsFromChildren([
      <LineSeries data={[]} />,
      <LineSeries data={[]} />
    ]);
    expect(result.length === 2).toBeTruthy();
    result.forEach(props => expect(arePropsValid(props)).toBeTruthy());
  });

  test('seriesClusterProps', () => {
    const result = getSeriesPropsFromChildren([
      <HorizontalBarSeries cluster="alpha" data={[]} />,
      <HorizontalBarSeries cluster="beta" data={[]} />,
      <HorizontalBarSeries cluster="alpha" data={[]} />,
      <HorizontalBarSeries cluster="gamma" data={[]} />
    ]);
    const expectedClusters = ['alpha', 'beta', 'gamma'];
    expect(result.length === 4).toBeTruthy();
    result.forEach(props => {
      expect(
        props.sameTypeIndex === expectedClusters.indexOf(props.cluster)
      ).toBeTruthy();
      expect(props.sameTypeTotal === props.clusters.length).toBeTruthy();
      expect(props.clusters.length === 3).toBeTruthy();
    });
  });

  // eslint-disable-next-line max-statements
  test('getStackedData', () => {
    const yData = [
      [
        {y: 2, x: 10},
        {y: 4, x: 5},
        {y: 5, x: 15}
      ],
      [
        {y: 2, x: 12},
        {y: 4, x: 2},
        {y: 5, x: 11}
      ]
    ];

    const stackByYExpected = [
      [
        {x: 2, y: 10},
        {x: 4, y: 5},
        {x: 5, y: 15}
      ],
      [
        {x: 2, y: 22, y0: 10},
        {x: 4, y: 7, y0: 5},
        {x: 5, y: 26, y0: 15}
      ],
      undefined
    ];

    const stackByXExpected = [
      [
        {y: 2, x: 10},
        {y: 4, x: 5},
        {y: 5, x: 15}
      ],
      [
        {y: 2, x: 22, x0: 10},
        {y: 4, x: 7, x0: 5},
        {y: 5, x: 26, x0: 15}
      ],
      null
    ];

    const stackByYExpectedPartial = [
      [
        {x: 2, y: 10},
        {x: 4, y: 5}
      ],
      [
        {x: 4, y: 7, y0: 5},
        {x: 5, y: 11}
      ]
    ];

    const stackByXExpectedPartial = [
      [
        {y: 2, x: 10},
        {y: 4, x: 5}
      ],
      [
        {y: 4, x: 7, x0: 5},
        {y: 5, x: 11}
      ]
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
    expect(results).toEqual(stackByYExpected);

    children = [
      <HorizontalBarSeries data={yData[0]} />,
      <HorizontalBarSeries data={yData[1]} />,
      null
    ];
    results = getStackedData(children, 'x');

    expect(results).toEqual(stackByXExpected);

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

    expect(results).toEqual(expectedResults);

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
    expect(results).toEqual(expectedResults);

    children = [
      <HorizontalBarSeries cluster="alpha" data={partialYData[0]} />,
      <HorizontalBarSeries cluster="alpha" data={partialYData[1]} />,
      <HorizontalBarSeries cluster="beta" data={partialYData[0]} />,
      <HorizontalBarSeries cluster="beta" data={partialYData[1]} />
    ];
    results = getStackedData(children, 'x');
    expectedResults = [...stackByXExpectedPartial, ...stackByXExpectedPartial];
    expect(results).toEqual(expectedResults);

    children = [
      <VerticalBarSeries cluster="alpha" data={partialXData[0]} />,
      <VerticalBarSeries cluster="alpha" data={partialXData[1]} />,
      <VerticalBarSeries cluster="beta" data={partialXData[0]} />,
      <VerticalBarSeries cluster="beta" data={partialXData[1]} />
    ];
    results = getStackedData(children, 'y');
    expectedResults = [...stackByYExpectedPartial, ...stackByYExpectedPartial];

    expect(results).toEqual(expectedResults);

    children = [
      <VerticalBarSeries data={yData[0]} stack />,
      <VerticalBarSeries
        data={[
          {x: 10, y: 3},
          {x: 5, y: 6},
          {x: 15, y: 7}
        ]}
        stack
      />,
      <LineSeries data={yData[1]} />
    ];
    results = getStackedData(children, 'y');
    expectedResults = [
      yData[0],
      [
        {x: 10, y: 5, y0: 2},
        {x: 5, y: 10, y0: 4},
        {x: 15, y: 12, y0: 5}
      ],
      yData[1]
    ];
    expect(results).toEqual(expectedResults);

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
    expect(results).toEqual(expectedResults);

    children = [
      <VerticalBarSeries data={xData[0]} />,
      <VerticalBarSeries data={xData[1]} />,
      <LabelSeries data={xData[0]} />,
      <LabelSeries data={xData[1]} />
    ];
    results = getStackedData(children, 'y');
    expectedResults = [
      ...stackByYExpected.slice(0, 2),
      ...stackByYExpected.slice(0, 2)
    ];

    expect(results).toEqual(expectedResults);
  });
});
