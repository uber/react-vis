import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import CustomSVGSeries from 'plot/series/custom-svg-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import CustomSVGExample from '../../showcase/plot/custom-svg-example';
import CustomSVGAllTheMarks from '../../showcase/plot/custom-svg-all-the-marks';

testRenderWithProps(CustomSVGSeries, GENERIC_XYPLOT_SERIES_PROPS);

test('CustomSVGSeries: Showcase Example - CustomSVGExample', t => {
  const $ = mount(<CustomSVGExample />);
  t.equal($.text(), '1.01.52.02.53.068101214x: 187.5y: 200', 'should fine the right text content');
  t.equal($.find('.rv-xy-plot__series--custom-svg').length, 5, 'should find the right number of gs');
  t.equal($.find('.rv-xy-plot__series--custom-svg polygon').length, 0, 'should find the right number of polygons');
  t.equal($.find('.rv-xy-plot__series--custom-svg circle').length, 2, 'should find the right number of circle');
  t.equal($.find('.rv-xy-plot__series--custom-svg rect').length, 3, 'should find the right number of rects');
  t.end();
});

test('CustomSVGSeries: Showcase Example - CustomSVGAllTheMarks', t => {
  const $ = mount(<CustomSVGAllTheMarks />);
  t.equal($.text(), 'REVERSE0123402468101214', 'should fine the right text content');
  t.equal($.find('.rv-xy-plot__series--custom-svg').length, 20, 'should find the right number of gs');
  t.equal($.find('.rv-xy-plot__series--custom-svg polygon').length, 10, 'should find the right number of polygons');
  t.equal($.find('.rv-xy-plot__series--custom-svg circle').length, 5, 'should find the right number of circle');
  t.equal($.find('.rv-xy-plot__series--custom-svg rect').length, 5, 'should find the right number of rects');
  t.end();
});
