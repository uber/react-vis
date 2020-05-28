import React from 'react';
import {mount} from 'enzyme';

import {
  LinkedCharts,
  LineChartMouseOverXY,
  LineChartMouseOverSeries,
  ScatterPlotOnNearestXY
} from '../../../showcase/interaction/interaction-examples';

describe('Interaction examples', () => {
  test('LinkedCharts', () => {
    const $ = mount(<LinkedCharts />);
    expect($.find('.rv-xy-plot').length).toBe(3);
  });

  test('LineChartMouseOverXY', () => {
    const $ = mount(<LineChartMouseOverXY />);
    expect($.find('.rv-xy-plot').length).toBe(1);
  });

  test('LineChartMouseOverSeries', () => {
    const $ = mount(<LineChartMouseOverSeries />);
    expect($.find('.rv-xy-plot').length).toBe(1);
  });

  test('ScatterPlotOnNearestXY', () => {
    const $ = mount(<ScatterPlotOnNearestXY />);
    expect($.find('.rv-xy-plot').length).toBe(1);
  });
});
