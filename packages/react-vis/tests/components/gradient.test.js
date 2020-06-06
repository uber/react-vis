import React from 'react';
import {mount} from 'enzyme';
import GradientDefs from '~/plot/gradient-defs';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import TriangleExample from '../../../showcase/misc/triangle-example';
import GradientExample from '../../../showcase/misc/gradient-example';

describe('GradientDefs', () => {
  testRenderWithProps(GradientDefs, GENERIC_XYPLOT_SERIES_PROPS);

  test('TriangleExample', () => {
    const $ = mount(<TriangleExample />);
    expect($.find('.rv-xy-plot__series--polygon').length).toBe(121);
    expect($.find('.rv-gradient-defs').length).toBe(1);
    expect($.find('#grad1').length).toBe(1);
  });

  test('GradientExample', () => {
    const $ = mount(<GradientExample />);
    expect($.find('.rv-xy-plot__series--line').length).toBe(2);
    expect($.find('.rv-gradient-defs').length).toBe(1);
    expect($.find('#CoolGradient').length).toBe(1);
  });
});
