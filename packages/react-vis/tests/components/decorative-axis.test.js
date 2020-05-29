import React from 'react';
import {mount} from 'enzyme';
import DecorativeAxis from 'plot/axis/decorative-axis';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import DecorativeAxisCrissCross from '../../../showcase/axes/decorative-axes-criss-cross';
import ParallelCoordinatesExample from '../../../showcase/axes/parallel-coordinates-example';

testRenderWithProps(
  DecorativeAxis,
  {
    ...GENERIC_XYPLOT_SERIES_PROPS,
    axisStart: {x: 0, y: 1},
    axisEnd: {x: 0, y: 1},
    axisDomain: [0, 1]
  },
  true
);

describe('DecorativeAxis', () => {
  test('Showcase Example - DecorativeAxisCrissCross', () => {
    const $ = mount(<DecorativeAxisCrissCross />);
    expect($.text()).toBe(
      '-101.01223344556677889100¡1000!¡990!¡980!¡970!¡960!¡950!¡940!¡930!¡920!¡910!¡900!'
    );
    expect($.find('.rv-xy-manipulable-axis').length).toBe(2);
    expect($.find('.rv-xy-plot__axis__tick__line').length).toBe(22);
    expect($.find('.rv-xy-plot__axis__tick__text').length).toBe(22);
  });

  test('Showcase Example - ParallelCoordinatesExample', () => {
    const $ = mount(<ParallelCoordinatesExample />);
    expect($.text()).toBe(
      '0.04.79.314192328333742473.03.54.04.55.05.56.06.57.07.58.0681101501802202603003403804204600.023466992120140160180210230160020002300270030003400370041004400480051008.09.71113151618202123257071727475767778808182'
    );
    expect($.find('.rv-xy-manipulable-axis').length).toBe(7);
    expect($.find('.rv-xy-plot__axis__tick__line').length).toBe(77);
    expect($.find('.rv-xy-plot__axis__tick__text').length).toBe(77);
  });
});
