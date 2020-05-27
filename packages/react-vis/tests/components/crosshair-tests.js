import React from 'react';
import {mount} from 'enzyme';

import DynamicCrosshair from '../../../showcase/axes/dynamic-crosshair';

test('Crosshair: Dynamic Crosshair - Example', () => {
  const $ = mount(<DynamicCrosshair />);
  simulateMouseMove(100);
  expect($.find('.rv-crosshair').hasClass('test-class-name')).toBe(true);

  function simulateMouseMove(x) {
    $.find('.rv-xy-plot__inner').simulate('mousemove', {
      nativeEvent: {clientX: x, clientY: 150}
    });
  }
});

test('Crosshair: Dynamic Crosshair - Touch Example', () => {
  const $ = mount(<DynamicCrosshair />);
  simulateMouseMove(100);
  expect($.find('.rv-crosshair').hasClass('test-class-name')).toBe(true);

  function simulateMouseMove(x) {
    $.find('.rv-xy-plot__inner').simulate('touchmove', {
      nativeEvent: {type: 'touchmove', touches: [{pageX: x, pageY: 150}]}
    });
  }
});
