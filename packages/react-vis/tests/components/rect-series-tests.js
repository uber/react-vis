import React from 'react';
import {mount} from 'enzyme';
import HorizontalRectSeries from 'plot/series/horizontal-bar-series';
import VerticalRectSeries from 'plot/series/vertical-bar-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import Histogram from '../../../showcase/plot/histogram';
import StackedHistogram from '../../../showcase/plot/stacked-histogram';

testRenderWithProps(HorizontalRectSeries, GENERIC_XYPLOT_SERIES_PROPS);
testRenderWithProps(VerticalRectSeries, GENERIC_XYPLOT_SERIES_PROPS);

test('RectSeries: Showcase Example - StackedHistogram', () => {
  const $ = mount(<StackedHistogram />);
  expect($.text()).toBe('TOGGLE TO CANVAS01234567051015202530');
  expect($.find('.rv-xy-plot__series--rect rect').length).toBe(6);

  $.find('.showcase-button').simulate('click');
  expect($.find('.rv-xy-plot__series--rect rect').length).toBe(0);
  expect($.find('.rv-xy-canvas canvas').length).toBe(1);
});

test('RectSeries: Showcase Example - Histogram', () => {
  const $ = mount(<Histogram />);
  expect($.text()).toBe('May 21May 28Jun 04Jun 11Jun 180.51.01.52.0');
  expect($.find('.rv-xy-plot__series--rect rect').length).toBe(8);
});
