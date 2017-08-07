import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import Sunburst from 'sunburst';
import BasicSunburst from '../../showcase/sunbursts/basic-sunburst';
import SunburstWithTooltips from '../../showcase/sunbursts/sunburst-with-tooltips';

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

// make sure that the components render at all
testRenderWithProps(Sunburst, SUNBURST_PROPS);

test('Sunburst: Basic rendering + data changes', t => {
  const $ = mount(<Sunburst {...SUNBURST_PROPS}/>);
  t.equal($.find('.little-nested-burst-example.rv-xy-plot__series--arc path').length, 21, 'should find the custom class name used');

  $.setProps({data: INTERPOLATE_DATA});
  t.equal($.find('.rv-xy-plot__series--arc-path').length, 9, 'should find the right number of children');
  t.end();
});

test('Sunburst: Empty', t => {
  const $ = mount(<Sunburst {...{...SUNBURST_PROPS, data: {}}}/>);
  t.equal($.find('.rv-xy-plot__series--arc-path').length, 0, 'should find the right number of children');

  t.end();
});

test('Sunburst: Flare Demo', t => {
  const $ = mount(<BasicSunburst />);
  t.equal($.find('.rv-xy-plot__series--arc path').length, 251, 'should find the right number of children');
  t.equal($.text(), 'SUNBURST', 'should find the correct text inside of the chart');
  // check hover state
  t.deepEqual($.state().pathValue, false, 'should initially find no hover path');
  $.find('.rv-xy-plot__series--arc-path').at(200).simulate('mouseover');
  t.deepEqual($.state().pathValue, 'root > vis > events > DataEvent', 'should find the correct path hovered');
  t.end();
});

test('Sunburst: SunburstWithTooltips', t => {
  const $ = mount(<SunburstWithTooltips />);
  t.equal($.text(), 'cooldogssunglasses', 'should find the right text');
  t.equal($.find('.rv-xy-plot__series--arc path').length, 10, 'should find the right number of children');
  $.find('.rv-xy-plot__series--arc-path').at(1).simulate('mouseOver');
  t.equal($.text(), 'cooldogssunglasses#FF991F', 'should find appropriate hover text');

  t.end();
});
