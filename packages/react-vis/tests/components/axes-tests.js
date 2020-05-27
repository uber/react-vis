import React from 'react';
import {mount} from 'enzyme';

import CustomAxes from '../../../showcase/axes/custom-axes';
import CustomAxis from '../../../showcase/axes/custom-axis';
import PaddedAxis from '../../../showcase/axes/padded-axis';
import CustomAxesOrientation from '../../../showcase/axes/custom-axes-orientation';
import AxisWithTurnedLabels from '../../../showcase/plot/axis-with-turned-labels';
import AxisOn0 from '../../../showcase/axes/axis-on-0';

test('Axis: Showcase Example - CustomAxesOrientation', () => {
  const $ = mount(<CustomAxesOrientation />);
  expect($.text()).toBe('1.01.52.02.53.03.54.0X Axis246810Y Axis');
  expect($.find('.rv-xy-plot__series--line').length).toBe(2);
  expect($.find('line').length).toBe(26);
});

test('Axis: Showcase Example - Custom axis', () => {
  const $ = mount(<CustomAxis />);
  expect($.text()).toBe('1.01.52.03.0X');
  expect($.find('.rv-xy-plot__series--line').length).toBe(1);
  expect($.find('line').length).toBe(15);

  const titleStyle = $.find('.rv-xy-plot__axis__title text').prop('style');
  expect(titleStyle.fontSize).toBe('16px');
});

test('Axis: Showcase Example - Even more Custom axes', () => {
  const $ = mount(<CustomAxes />);
  expect($.text()).toBe(
    '01345XValue is 0Value is 1Value is 2Value is 3Value is 4Value is 501491625cooldogskateboardwowsuchMultilinedogs'
  );
  expect($.find('line').length).toBe(26);
});

test('Axis: Showcase Example - AxisWithTurnedLabels', () => {
  const $ = mount(<AxisWithTurnedLabels />);
  expect($.text()).toBe('ApplesBananasCranberries02468101214');
  expect($.find('rect').length).toBe(6);
  expect($.find('line').length).toBe(24);
});

test('Axis: Showcase Example - Padded', () => {
  const $ = mount(<PaddedAxis />);
  expect($.find('.rv-xy-plot__series--line').length).toBe(4);
  expect($.find('line').length > 30).toBeTruthy();
});

test('Axis: axis crosses on 0', () => {
  // vertical axes
  const $0 = mount(
    <AxisOn0
      verticalTickValues={[0]}
      horizontalTickValues={[]}
      yAxisOn0={true}
    />
  ).render();

  const xOfGridlines0 = $0.find('.rv-xy-plot__grid-lines line')[0].attribs.x1;
  const xOfAxisSetOn0 = translateToXY(
    $0.find('.rv-xy-plot__axis.rv-xy-plot__axis--vertical')[0].attribs.transform
  )[0];

  expect(xOfGridlines0).toBe(xOfAxisSetOn0);

  const $1 = mount(
    <AxisOn0
      verticalTickValues={[0]}
      horizontalTickValues={[]}
      yAxisOn0={false}
    />
  ).render();

  const xOfAxisNotSetOn0 = $1
    .find('.rv-xy-plot__axis.rv-xy-plot__axis--vertical')[0]
    .attribs.transform.replace('translate(', '')
    .split(',')[0];

  expect(xOfGridlines0 !== xOfAxisNotSetOn0).toBeTruthy();

  // horizontal axes
  const $2 = mount(
    <AxisOn0
      verticalTickValue={[]}
      horizontalTickValues={[0]}
      xAxisOn0={true}
    />
  ).render();
  const gridlinesY = Number(
    translateToXY($2.find('.rv-xy-plot__grid-lines')[0].attribs.transform)[1]
  );
  const yOfGridlines0 = String(
    gridlinesY + Number($2.find('.rv-xy-plot__grid-lines__line')[0].attribs.y1)
  );
  const yOfAxisSetOn0 = translateToXY(
    $2.find('.rv-xy-plot__axis.rv-xy-plot__axis--horizontal')[0].attribs
      .transform
  )[1];

  expect(yOfAxisSetOn0).toBe(yOfGridlines0);

  const $3 = mount(
    <AxisOn0
      verticalTickValue={[]}
      horizontalTickValues={[0]}
      xAxisOn0={false}
    />
  ).render();

  const yOfAxisNotSetOn0 = translateToXY(
    $3.find('.rv-xy-plot__axis.rv-xy-plot__axis--horizontal')[0].attribs
      .transform
  )[1];
  expect(yOfAxisNotSetOn0 !== yOfGridlines0).toBeTruthy();
});

function translateToXY(translate) {
  // 'translate(50,100)' => ['50', '100']
  const results = /translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(translate);
  return [results[1], results[2]];
}
