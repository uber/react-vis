import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';

import {
  LinkedCharts,
  LineChartMouseOverXY,
  LineChartMouseOverSeries,
  ScatterPlotOnNearestXY
} from '../../showcase/interaction/interaction-examples';

test('Interaction examples: LinkedCharts', t => {
  const $ = mount(<LinkedCharts />);
  t.equal($.find('.rv-xy-plot').length, 3, '3 XYPlot in this example');
  t.end();
});

test('Interaction examples: LineChartMouseOverXY', t => {
  const $ = mount(<LineChartMouseOverXY />);
  t.equal($.find('.rv-xy-plot').length, 1, '1 XYPlot in this example');
  t.end();
});

test('Interaction examples: LineChartMouseOverSeries', t => {
  const $ = mount(<LineChartMouseOverSeries />);
  t.equal($.find('.rv-xy-plot').length, 1, '1 XYPlot in this example');
  t.end();
});

test('Interaction examples: ScatterPlotOnNearestXY', t => {
  const $ = mount(<ScatterPlotOnNearestXY />);
  t.equal($.find('.rv-xy-plot').length, 1, '1 XYPlot in this example');
  t.end();
});
