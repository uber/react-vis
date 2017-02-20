import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import HorizontalBarSeries from 'plot/series/horizontal-bar-series';
import VerticalBarSeries from 'plot/series/vertical-bar-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import StackedHorizontalBarChart from '../../showcase/plot/stacked-horizontal-bar-chart';
import StackedVerticalBarChart from '../../showcase/plot/stacked-vertical-bar-chart';
import BarChart from '../../showcase/plot/bar-chart';

testRenderWithProps(HorizontalBarSeries, GENERIC_XYPLOT_SERIES_PROPS);
testRenderWithProps(VerticalBarSeries, GENERIC_XYPLOT_SERIES_PROPS);

test('BarSeries: Showcase Example - BarChart', t => {
  const $ = mount(<BarChart />);
  t.equal($.text(), 'ABC02468101214', 'should fine the right text content');
  t.equal($.find('.rv-xy-plot__series--bar rect').length, 6, 'should find the right number of bars');
  t.equal($.find('.vertical-bar-series-example').length, 1, 'should find the right number of custom named series');
  t.end();
});

test('BarSeries: Showcase Example - StackedHorizontalBarChart & StackedVerticalBarChart', t => {
  [StackedHorizontalBarChart, StackedVerticalBarChart].forEach((Component, i) => {
    const $ = mount(<Component />);
    const textContent = ['0510152025', '12345'];
    const expectedContent = (i === 1 ? textContent.reverse() : textContent).join('');
    t.equal($.text(), expectedContent, 'should fine the right text content');
    t.equal($.find('.rv-xy-plot__series--bar rect').length, 6, 'should find the right number of bars');
  });
  t.end();
});
