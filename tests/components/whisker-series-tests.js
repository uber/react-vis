import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import WhiskerSeries from 'plot/series/whisker-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import WhiskerChart from '../../showcase/plot/whisker-chart';

testRenderWithProps(WhiskerSeries, GENERIC_XYPLOT_SERIES_PROPS);

test('WhiskerSeries: Showcase Example - Whisker Scatterplot', t => {
  const $ = mount(<WhiskerChart />);
  t.equal($.text(), '1.01.52.02.53.068101214', 'should find the right text content');
  t.equal($.find('.whisker-series-example').length, 1, 'should find the right number of custom named series');
  // 8 lines each per 5 (double) whiskers
  t.equal($.find('.rv-xy-plot__series--whisker line').length, 40, 'should find the right number of lines');
  t.end();
});
