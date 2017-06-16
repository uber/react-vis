import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import DecorativeAxis from 'plot/axis/decorative-axis';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import DecorativeAxisCrissCross from '../../showcase/axes/decorative-axes-criss-cross';
import ParallelCoordinatesExample from '../../showcase/axes/parallel-coordinates-example';

testRenderWithProps(DecorativeAxis, {
  ...GENERIC_XYPLOT_SERIES_PROPS,
  axisStart: {x: 0, y: 1},
  axisEnd: {x: 0, y: 1},
  axisDomain: [0, 1]
});

test('DecorativeAxis: Showcase Example - DecorativeAxisCrissCross', t => {
  const $ = mount(<DecorativeAxisCrissCross />);
  t.equal($.text(), '-101.01223344556677889100¡1000!¡990!¡980!¡970!¡960!¡950!¡940!¡930!¡920!¡910!¡900!', 'should find the right text content');
  t.equal($.find('.rv-xy-manipulable-axis').length, 2, 'should find the number of axes');
  t.equal($.find('.rv-xy-plot__axis__tick__line').length, 22, 'should find the number of axis ticks');
  t.equal($.find('.rv-xy-plot__axis__tick__text').length, 22, 'should find the number of axis tick texts');
  t.end();
});

test('DecorativeAxis: Showcase Example - ParallelCoordinatesExample', t => {
  const $ = mount(<ParallelCoordinatesExample />);
  t.equal($.text(),
    '0.04.79.314192328333742473.03.54.04.55.05.56.06.57.07.58.0681101501802202603003403804204600.023466992120140160180210230160020002300270030003400370041004400480051008.09.71113151618202123257071727475767778808182',
    'should find the right text content');
  t.equal($.find('.rv-xy-manipulable-axis').length, 7, 'should find the number of axes');
  t.equal($.find('.rv-xy-plot__axis__tick__line').length, 77, 'should find the number of axis ticks');
  t.equal($.find('.rv-xy-plot__axis__tick__text').length, 77, 'should find the number of axis tick texts');
  t.end();
});
