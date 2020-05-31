import React from 'react';
import {mount} from 'enzyme';
import Sunburst from 'sunburst';
import BasicSunburst from '../../../showcase/sunbursts/basic-sunburst';
import SunburstWithTooltips from '../../../showcase/sunbursts/sunburst-with-tooltips';
import AnimatedSunburst from '../../../showcase/sunbursts/animated-sunburst';

import {testRenderWithProps} from '../test-utils';

const INTERPOLATE_DATA = {
  title: 'interpolate',
  children: [
    {title: 'ArrayInterpolator', color: '#12939A', size: 1983},
    {title: 'ColorInterpolator', color: '#12939A', size: 2047},
    {title: 'DateInterpolator', color: '#12939A', size: 1375},
    {title: 'Interpolator', color: '#12939A', size: 8746},
    {title: 'MatrixInterpolator', color: '#12939A', size: 2202},
    {title: 'NumberInterpolator', color: '#12939A', size: 1382},
    {title: 'ObjectInterpolator', color: '#12939A', size: 1629},
    {title: 'PointInterpolator', color: '#12939A', size: 1675},
    {title: 'RectangleInterpolator', color: '#12939A', size: 2042}
  ]
};

const SUNBURST_PROPS = {
  height: 100,
  width: 100,
  className: 'little-nested-burst-example',
  hideRootNode: true,
  data: {
    name: 'animate',
    children: [
      {title: 'Easing', color: '#12939A', size: 17010},
      {title: 'FunctionSequence', color: '#12939A', size: 5842},
      INTERPOLATE_DATA,
      {title: 'ISchedulable', color: '#12939A', size: 1041},
      {title: 'Parallel', color: '#12939A', size: 5176},
      {title: 'Pause', color: '#12939A', size: 449},
      {title: 'Scheduler', color: '#12939A', size: 5593},
      {title: 'Sequence', color: '#12939A', size: 5534},
      {title: 'Transition', color: '#12939A', size: 9201},
      {title: 'Transitioner', color: '#12939A', size: 19975},
      {title: 'TransitionEvent', color: '#12939A', size: 1116},
      {title: 'Neonate', color: '#12939A', size: 6006}
    ]
  }
};

describe('Sunburst', () => {
  // make sure that the components render at all
  testRenderWithProps(Sunburst, SUNBURST_PROPS);

  test('Basic rendering + data changes', () => {
    const $ = mount(<Sunburst {...SUNBURST_PROPS} />);
    expect(
      $.find('.little-nested-burst-example.rv-xy-plot__series--arc path').length
    ).toBe(21);

    $.setProps({data: INTERPOLATE_DATA});
    $.update();
    expect($.find('.rv-xy-plot__series--arc-path').length).toBe(9);
  });

  test('Empty', () => {
    const $ = mount(<Sunburst {...{...SUNBURST_PROPS, data: {}}} />);
    expect($.find('.rv-xy-plot__series--arc-path').length).toBe(0);
  });

  test('BasicSunburst', () => {
    const $ = mount(<BasicSunburst />);
    // multiplied by two to account for the shadow listeners
    expect($.find('.rv-xy-plot__series--arc path').length).toBe(251 * 2);
    expect($.text()).toBe('click to lock selectionSUNBURST');
    // check hover state
    expect($.state().pathValue).toEqual(false);
    $.find('.rv-xy-plot__series--arc-path')
      .at(200)
      .simulate('mouseover');
    expect($.state().pathValue).toEqual('root > vis > events > DataEvent');

    $.find('.rv-xy-plot__series--arc-path')
      .at(1)
      .simulate('click');
    expect($.text()).toBe(
      'click to unlock selectionDataEventroot > vis > events > DataEvent'
    );
    $.find('.rv-xy-plot__series--arc-path')
      .at(1)
      .simulate('mouseLeave');
    $.find('.rv-xy-plot__series--arc-path')
      .at(10)
      .simulate('mouseEnter');

    expect($.text()).toBe(
      'click to unlock selectionDataEventroot > vis > events > DataEvent'
    );
  });

  test('SunburstWithTooltips', () => {
    const $ = mount(<SunburstWithTooltips />);
    expect($.text()).toBe('cooldogssunglassesexcellentchartgreatlabel');
    expect($.find('.rv-xy-plot__series--arc path').length).toBe(10);
    $.find('.rv-xy-plot__series--arc-path')
      .at(1)
      .simulate('mouseOver');
    expect($.text()).toBe('cooldogssunglassesexcellentchartgreatlabel#FF991F');
  });

  test('AnimatedSunburst', () => {
    const $ = mount(<AnimatedSunburst />);
    expect($.text()).toBe('UPDATENOT HOVERED');
    expect($.find('.rv-xy-plot__series--arc path').length > 2).toBeTruthy();
    $.find('.rv-xy-plot__series--arc-path')
      .at(1)
      .simulate('mouseOver');
    expect($.text()).toBe('UPDATECURRENTLY HOVERING');
  });
});
