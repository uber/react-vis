import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';

import CustomAxisTickElement from '../../showcase/axes/custom-axis-tick-element';

test('Axis Format: correctly renders return values from tickFormat', t => {
  const element = mount(<CustomAxisTickElement />);
  const ticks = element.find('.rv-xy-plot__axis--horizontal .rv-xy-plot__axis__tick');
  t.deepEqual(
    ticks.map(tick => tick.find('text').length),
    [0, 0, 1, 0, 1],
    'renders custom element without text node'
  );
  t.equal(
    ticks.at(2).find('text').find('tspan').length,
    1,
    'renders tspan inside text node'
  );
  t.equal(
    ticks.at(4).find('text').text(),
    'Label',
    'renders text inside text node'
  );
  t.end();
});

test('Axis Format: passes props to custom element', t => {
  const CustomLabel = props => {
    t.deepEqual(
      Object.keys(props).sort(),
      ['containerWidth', 'dy', 'textAnchor', 'tickCount', 'transform'],
      'custom element received correct props'
    );
    return <text>Custom Label</text>;
  };
  const element = mount(<CustomAxisTickElement />);
  element.setState({
    data: [...element.state().data, {x: 5, y: 600, label: <CustomLabel />}]
  });
  t.equal(
    element.find('.rv-xy-plot__axis--horizontal .rv-xy-plot__axis__tick').at(5).find('text').text(),
    'Custom Label',
    'renders custom label contents'
  );
  t.end();
});
