import React from 'react';
import {mount} from 'enzyme';
import CustomSVGSeries from '~/plot/series/custom-svg-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import CustomSVGExample from '../../../showcase/plot/custom-svg-example';
import CustomSVGAllTheMarks from '../../../showcase/plot/custom-svg-all-the-marks';
import CustomSVGRootLevelComponent from '../../../showcase/plot/custom-svg-root-level';

describe('CustomSVGSeries', () => {
  testRenderWithProps(CustomSVGSeries, GENERIC_XYPLOT_SERIES_PROPS);

  test('Showcase Example - CustomSVGExample', () => {
    const $ = mount(<CustomSVGExample />);
    expect($.text()).toBe('1.01.52.02.53.068101214x: 187.5y: 200');
    expect($.find('.rv-xy-plot__series--custom-svg').length).toBe(5);
    expect($.find('.rv-xy-plot__series--custom-svg polygon').length).toBe(0);
    expect($.find('.rv-xy-plot__series--custom-svg circle').length).toBe(2);
    expect($.find('.rv-xy-plot__series--custom-svg rect').length).toBe(3);
  });

  test('Showcase Example - CustomSVGRootLevelComponent', () => {
    const $ = mount(<CustomSVGRootLevelComponent />);
    expect($.text()).toBe(
      '1.01.52.02.53.068101214x: 0y: 125x: 87.5y: 75.00000000000001x: 125y: 250x: 250y: 0x: 187.5y: 200'
    );
    expect($.find('.rv-xy-plot__series--custom-svg').length).toBe(5);
    expect($.find('.rv-xy-plot__series--custom-svg polygon').length).toBe(0);
    expect($.find('.rv-xy-plot__series--custom-svg circle').length).toBe(5);
    expect($.find('.rv-xy-plot__series--custom-svg rect').length).toBe(0);
    expect($.find('.rv-xy-plot__series--custom-svg text').length).toBe(5);
  });

  test('Showcase Example - CustomSVGAllTheMarks', () => {
    const textContent = 'REVERSE0123402468101214';
    const hoverText = 'star';

    const $ = mount(<CustomSVGAllTheMarks />);
    expect($.text()).toBe(textContent);
    $.find('.rv-xy-plot__series--custom-svg')
      .at(0)
      .simulate('mouseEnter');
    expect($.text()).toBe(`${textContent}${hoverText}`);
    expect($.find('.rv-xy-plot__series--custom-svg').length).toBe(20);
    expect($.find('.rv-xy-plot__series--custom-svg polygon').length).toBe(10);
    expect($.find('.rv-xy-plot__series--custom-svg circle').length).toBe(5);
    expect($.find('.rv-xy-plot__series--custom-svg rect').length).toBe(5);
  });
});
