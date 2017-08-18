import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import ArcSeries from 'plot/series/arc-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import ArcSeriesExample from '../../showcase/radial-chart/arc-series-example';

testRenderWithProps(ArcSeries, GENERIC_XYPLOT_SERIES_PROPS);

test('ArcSeries: Showcase Example - ArcSeriesExample', t => {
  const $ = mount(<ArcSeriesExample />);
  t.equal($.text(), 'UPDATE-4-2024-4-2024', 'should find the right text content');
  // multiplied by two to account for shadow listeners
  t.equal($.find('.rv-xy-plot__series--arc').length, 4, 'should find the right number of series');
  t.equal($.find('.rv-xy-plot__series--arc path').length, 2 * 8, 'with the right number of arc in them');

  t.end();
});
