import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';

import CustomAxes from '../../showcase/axes/custom-axes';
import CustomAxis from '../../showcase/axes/custom-axis';
import PaddedAxis from '../../showcase/axes/padded-axis';
import CustomAxesOrientation from '../../showcase/axes/custom-axes-orientation';
import AxisWithTurnedLabels from '../../showcase/plot/axis-with-turned-labels';

test('Axis: Showcase Example - CustomAxesOrientation', t => {
  const $ = mount(<CustomAxesOrientation />);
  t.equal($.text(), '1.01.52.02.53.03.54.0X Axis246810Y Axis', 'should find appropriate text');
  t.equal($.find('.rv-xy-plot__series--line').length, 2, 'should find the right number of lines');
  t.equal($.find('line').length, 26, 'should find the right number of grid lines');
  t.end();
});

test('Axis: Showcase Example - Custom axis', t => {
  const $ = mount(<CustomAxis />);
  t.equal($.text(), '1.01.52.03.0X', 'should find appropriate text');
  t.equal($.find('.rv-xy-plot__series--line').length, 1, 'should find the right number of lines');
  t.equal($.find('line').length, 15, 'should find the right number of grid lines');
  t.end();
});

test('Axis: Showcase Example - Even more Custom axes', t => {
  const $ = mount(<CustomAxes />);
  t.equal($.text(), '01345XValue is 0Value is 1Value is 2Value is 3Value is 4Value is 501491625cooldogskateboardwowsuchMultilinedogs', 'should find appropriate text');
  t.equal($.find('line').length, 26, 'should find the right number of grid lines');
  t.end();
});

test('Axis: Showcase Example - AxisWithTurnedLabels', t => {
  const $ = mount(<AxisWithTurnedLabels />);
  t.equal($.text(), 'ApplesBananasCranberries02468101214', 'should find appropriate text');
  t.equal($.find('rect').length, 6, 'should find the right number of lines');
  t.equal($.find('line').length, 24, 'should find the right number of grid lines');
  t.end();
});

test('Axis: Showcase Example - Padded', t => {
  const $ = mount(<PaddedAxis />);
  t.equal($.text(), '020406080X Axis010203040Y Axis020406080X Axis-200204060Y Axis', 'should find appropriate text');
  t.equal($.find('.rv-xy-plot__series--line').length, 4, 'should find the right number of lines');
  t.equal($.find('line').length, 44, 'should find the right number of grid lines');
  t.end();
});
