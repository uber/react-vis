import React from 'react';
import {mount} from 'enzyme';

import {
  LinkedCharts,
  LineChartMouseOverXY,
  LineChartMouseOverSeries,
  ScatterPlotOnNearestXY
} from '../../../showcase/interaction/interaction-examples';

test('Interaction examples: LinkedCharts', () => {
  const $ = mount(<LinkedCharts />);
  expect($.find('.rv-xy-plot').length).toBe(3);
});

test('Interaction examples: LineChartMouseOverXY', () => {
  const $ = mount(<LineChartMouseOverXY />);
  expect($.find('.rv-xy-plot').length).toBe(1);
});

test('Interaction examples: LineChartMouseOverSeries', () => {
  const $ = mount(<LineChartMouseOverSeries />);
  expect($.find('.rv-xy-plot').length).toBe(1);
});

test('Interaction examples: ScatterPlotOnNearestXY', () => {
  const $ = mount(<ScatterPlotOnNearestXY />);
  expect($.find('.rv-xy-plot').length).toBe(1);
});
