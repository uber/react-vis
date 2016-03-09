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
import ReactTestUtils from 'react-addons-test-utils';

import Treemap from '../lib/treemap/treemap';
import Table from '../lib/table/table';

import LineSeries from '../lib/plot/series/line-series';
import AreaSeries from '../lib/plot/series/area-series';
import MarkSeries from '../lib/plot/series/mark-series';
import HeatmapSeries from '../lib/plot/series/heatmap-series';
import VerticalBarSeries from '../lib/plot/series/vertical-bar-series';

import XAxisBottom from '../lib/plot/x-axis';
import YAxisLeft from '../lib/plot/y-axis';

import VerticalGrid from '../lib/plot/vertical-grid-lines';
import HorizontalGrid from '../lib/plot/horizontal-grid-lines';

import XYPlot from '../lib/plot/xy-plot';

const utils = {
  renderComponent(component) {
    return ReactTestUtils.renderIntoDocument(component);
  },

  find(component, type) {
    return ReactTestUtils.findRenderedComponentWithType(component, type);
  },

  destroyComponent(component) {
    // noop for now
  }
};

test('Rendering Treemap', function t(assert) {
  const component = utils.renderComponent(
    React.createElement(Treemap, {height: 100, data: {}}));
  const treemap = utils.find(component, Treemap);
  assert.ok(treemap, 'component should be rendered');

  utils.destroyComponent(component);
  assert.end();
});

test('Rendering Table', function t(assert) {
  const component = utils.renderComponent(
    React.createElement(Table, {
      height: 100,
      width: 100,
      header: ['a', 'b', 'c'],
      data: [[1, 2, 3], [4, 5, 6]]
    }));
  assert.ok(component, 'component should be rendered');

  utils.destroyComponent(component);
  assert.end();
});

test('Rendering LineSeries', function t(assert) {
  const component = utils.renderComponent(
    React.createElement(LineSeries, {data: []}));
  assert.ok(component, 'component should be rendered');

  utils.destroyComponent(component);
  assert.end();
});

test('Rendering AreaSeries', function t(assert) {
  const component = utils.renderComponent(
    React.createElement(AreaSeries, {data: []}));
  assert.ok(component, 'component should be rendered');

  utils.destroyComponent(component);
  assert.end();
});

test('Rendering MarkSeries', function t(assert) {
  const component = utils.renderComponent(
    React.createElement(MarkSeries, {data: []}));
  assert.ok(component, 'component should be rendered');

  utils.destroyComponent(component);
  assert.end();
});

test('Rendering VerticalBarSeries', function t(assert) {
  // TODO: Data duplication in data and _allData is a bad idea. Fix that.
  const component = utils.renderComponent(
    React.createElement(VerticalBarSeries, {
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
      ]]
    }));
  assert.ok(component, 'component should be rendered');

  utils.destroyComponent(component);
  assert.end();
});

test('Rendering HeatmapSeries', function t(assert) {
  const component = utils.renderComponent(
    React.createElement(HeatmapSeries, {data: []}));
  assert.ok(component, 'component should be rendered');

  utils.destroyComponent(component);
  assert.end();
});

test('Rendering XAxisBottom', function t(assert) {
  const component = utils.renderComponent(
    React.createElement(XAxisBottom, {
      xRange: [0, 1],
      xDomain: [0, 1],
      xType: 'linear'
    })
  );
  assert.ok(component, 'component should be rendered');
  utils.destroyComponent(component);
  assert.end();
});

test('Rendering YAxisLeft', function t(assert) {
  const component = utils.renderComponent(
    React.createElement(YAxisLeft, {
      yRange: [0, 1],
      yDomain: [0, 1],
      yType: 'linear'
    })
  );
  assert.ok(component, 'component should be rendered');
  utils.destroyComponent(component);
  assert.end();
});

test('Rendering VerticalGrid', function t(assert) {
  const component = utils.renderComponent(
    React.createElement(VerticalGrid, {
      xRange: [0, 1],
      xDomain: [0, 1],
      xType: 'linear'
    })
  );
  assert.ok(component, 'component should be rendered');
  utils.destroyComponent(component);
  assert.end();
});

test('Rendering HorizontalGrid', function t(assert) {
  const component = utils.renderComponent(
    React.createElement(HorizontalGrid, {
      yRange: [0, 1],
      yDomain: [0, 1],
      yType: 'linear'
    })
  );
  assert.ok(component, 'component should be rendered');
  utils.destroyComponent(component);
  assert.end();
});

test('Rendering XYPlot', function t(assert) {
  const component = utils.renderComponent(
    React.createElement(XYPlot, {width: 10, height: 10})
  );
  assert.ok(component, 'component should be rendered');
  utils.destroyComponent(component);
  assert.end();
});
