import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';

import DynamicCrosshair from '../../showcase/axes/dynamic-crosshair';

test('Crosshair: Dynamic Crosshair - Example', t => {
  const $ = mount(<DynamicCrosshair />);
  simulateMouseMove(100);
  t.equal($.find('.rv-crosshair').hasClass('test-class-name'), true, 'should find the class name passed as a prop');
  t.end();

  function simulateMouseMove(x) {
    $.find('.rv-xy-plot__inner')
      .simulate('mousemove', {nativeEvent: {clientX: x, clientY: 150}});
  }
});

test('Crosshair: Dynamic Crosshair - Touch Example', t => {
  const $ = mount(<DynamicCrosshair />);
  simulateMouseMove(100);
  t.equal($.find('.rv-crosshair').hasClass('test-class-name'), true, 'should find the class name passed as a prop');
  t.end();

  function simulateMouseMove(x) {
    $.find('.rv-xy-plot__inner')
      .simulate('touchmove', {nativeEvent: {type: 'touchmove', touches: [{pageX: x, pageY: 150}]}});
  }
});
