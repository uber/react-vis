import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import MarkSeries from 'plot/series/mark-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import Scatterplot from '../../showcase/plot/scatterplot';

testRenderWithProps(MarkSeries, GENERIC_XYPLOT_SERIES_PROPS);

test('MarkSeries: Showcase Example - Scatterplot', t => {
  const $ = mount(<Scatterplot />);
  t.equal($.text(), '1.01.52.02.53.068101214', 'should fine the right text content');
  t.equal($.find('.rv-xy-plot__series--mark circle').length, 5, 'should find the right number of circles');
  t.equal($.find('.mark-series-example').length, 1, 'should find the right number of custom named series');
  t.end();
});
