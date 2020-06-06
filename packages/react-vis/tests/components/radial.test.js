import React from 'react';
import {mount} from 'enzyme';
import RadialChart from '~/radial-chart';
import SimpleRadialChart from '../../../showcase/radial-chart/simple-radial-chart';
import DonutChart from '../../../showcase/radial-chart/donut-chart';
import CustomRadiusRadialChart from '../../../showcase/radial-chart/custom-radius-radial-chart';
import GradientPie from '../../../showcase/radial-chart/gradient-pie';

import {testRenderWithProps} from '../test-utils';

const RADIAL_PROPS = {
  data: [
    {angle: 1, label: 'green'},
    {angle: 2, label: 'yellow'},
    {angle: 5, label: 'cyan'},
    {angle: 3, label: 'magenta'},
    {angle: 5, label: 'yellow again', className: 'custom-class'}
  ],
  height: 300,
  showLabels: true,
  width: 400,
  padAngle: 0.3
};

describe('RadialChart', () => {
  // make sure that the components render at all
  testRenderWithProps(RadialChart, RADIAL_PROPS);

  test('Basic rendering', () => {
    const $ = mount(<RadialChart {...RADIAL_PROPS} />);
    const pieSlices = $.find('.rv-radial-chart__series--pie__slice').length;
    expect(pieSlices).toBe(RADIAL_PROPS.data.length);
    expect(
      $.find('.rv-radial-chart__series--pie__slice')
        .at(0)
        .prop('className')
    ).toBe(
      'rv-xy-plot__series rv-xy-plot__series--arc-path rv-radial-chart__series--pie__slice custom-class'
    );

    const labels = $.find('.rv-xy-plot__series--label-text').length;
    expect(labels).toBe(RADIAL_PROPS.data.length);
    expect($.text()).toBe('yellow againmagentacyanyellowgreen');

    $.setProps({data: []});
    expect($.find('.rv-radial-chart__series--pie__slice').length).toBe(0);
    expect($.find('.rv-radial-chart__series--pie__slice-overlay').length).toBe(
      0
    );
    expect($.find('.rv-xy-plot__series--label-text').length).toBe(0);
    expect($.text()).toBe('');
  });

  test('Showcase Example - Simple Radial Chart Example', () => {
    const $ = mount(<SimpleRadialChart />);
    expect($.find('.rv-radial-chart__series--pie__slice').length).toBe(5);
    expect($.find('.rv-xy-plot__series--label-text').length).toBe(5);
    expect($.text()).toBe('yellow againmagentacyanyellowgreen');
  });

  test('Showcase Example - DonutChart', () => {
    const $ = mount(<DonutChart />);
    expect($.find('.rv-radial-chart__series--pie__slice').length).toBe(5);
    expect($.find('.rv-xy-plot__series--label-text').length).toBe(0);
    expect($.text()).toBe('');
    $.find('.rv-radial-chart__series--pie__slice')
      .at(1)
      .simulate('mouseOver');
    expect($.text()).toBe(
      'theta: 3angle0: -2.9171931783333793angle: -4.263590029871862radius0: 0radius: 1color: 1x: -0.4338837391175583y: 0.900968867902419'
    );
  });

  test('Showcase Example - Custom radius example', () => {
    const $ = mount(<CustomRadiusRadialChart />);
    $.find('.rv-radial-chart__series--pie__slice')
      .at(1)
      .simulate('mouseEnter');
    $.find('.rv-radial-chart__series--pie__slice')
      .at(1)
      .simulate('mouseLeave');
    // multiplied by two to account for the shadow listeners
    expect($.find('.rv-radial-chart__series--pie__slice').length).toBe(2 * 5);
    expect($.find('.rv-xy-plot__series--label-text').length).toBe(4);
    expect($.text()).toBe(
      'Sub Label onlyAlt LabelSuper Custom labelWith annotation'
    );
  });

  test('Showcase Example - Gradient Pie Example', () => {
    const $ = mount(<GradientPie />);
    // multiplied by two to account for the shadow listeners
    expect($.find('.rv-radial-chart__series--pie__slice').length).toBe(3);
    expect($.find('.rv-xy-plot__series--label-text').length).toBe(0);
    expect($.find('.rv-gradient-defs linearGradient').length).toBe(3);
  });
});
