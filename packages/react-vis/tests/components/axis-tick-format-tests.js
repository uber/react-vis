import React from 'react';
import {mount} from 'enzyme';

import CustomAxisTickElement from '../../../showcase/axes/custom-axis-tick-element';

test('Axis Format: correctly renders return values from tickFormat', () => {
  const element = mount(<CustomAxisTickElement />);
  const ticks = element.find(
    '.rv-xy-plot__axis--horizontal .rv-xy-plot__axis__tick'
  );
  expect(ticks.map(tick => tick.find('text').length)).toEqual([0, 0, 1, 0, 1]);
  expect(
    ticks
      .at(2)
      .find('text')
      .find('tspan').length
  ).toBe(1);
  expect(
    ticks
      .at(4)
      .find('text')
      .text()
  ).toBe('Label');
});

test('Axis Format: passes props to custom element', () => {
  const CustomLabel = props => {
    expect(Object.keys(props).sort()).toEqual([
      'containerWidth',
      'dy',
      'textAnchor',
      'tickCount',
      'transform'
    ]);
    return <text>Custom Label</text>;
  };
  const element = mount(<CustomAxisTickElement />);
  element.setState({
    data: [...element.state().data, {x: 5, y: 600, label: <CustomLabel />}]
  });
  expect(
    element
      .find('.rv-xy-plot__axis--horizontal .rv-xy-plot__axis__tick')
      .at(5)
      .find('text')
      .text()
  ).toBe('Custom Label');
});
