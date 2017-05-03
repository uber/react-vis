import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import GradientDefs from 'plot/gradient-defs';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import TriangleExample from '../../showcase/misc/triangle-example';
import GradientExample from '../../showcase/misc/gradient-example';

testRenderWithProps(GradientDefs, GENERIC_XYPLOT_SERIES_PROPS);

test('GradientDefs: TriangleExample', t => {
  const $ = mount(<TriangleExample />);
  t.equal($.find('.rv-xy-plot__series--polygon').length, 121, 'should find the right number of polygons');
  t.equal($.find('.rv-gradient-defs').length, 1, 'should find the right number of gradient defs');
  t.equal($.find('#grad1').length, 1, 'should find the right number of gradients');
  t.end();
});

test('GradientDefs: GradientExample', t => {
  const $ = mount(<GradientExample />);
  t.equal($.find('.rv-xy-plot__series--line').length, 2, 'should find the right number of polygons');
  t.equal($.find('.rv-gradient-defs').length, 1, 'should find the right number of gradient defs');
  t.equal($.find('#CoolGradient').length, 1, 'should find the right number of gradients');
  t.end();
});
