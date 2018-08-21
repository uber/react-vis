import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import HexbinSeries from 'plot/series/hexbin-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import HexHeatmap from '../../showcase/plot/hex-heatmap';

testRenderWithProps(HexbinSeries, GENERIC_XYPLOT_SERIES_PROPS);

test('Heatmap: Showcase Example - HexHeatmap', t => {
  const $ = mount(<HexHeatmap />);
  t.equal($.find('.rv-xy-plot__series--hexbin').length, 1, 'should find the right number of series');
  t.equal($.find('.rv-xy-plot__series--hexbin path').length, 53, 'should find the right number of series');
  t.equal($.find('.hexbin-example').length, 1, 'should find the correct custom class name');
  t.equal($.text(), '4050607080901002345678UPDATE', 'should find the correct text');

  $.find('.rv-xy-plot__series--hexbin path').at(2).simulate('mouseOver');
  t.equal($.text(), '4050607080901002345678x: 138.56406460551017y: 180value: 1UPDATE', 'should find the correct text');

  t.end();
});
