import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';

import CustomAxes from '../../showcase/axes/custom-axes';
import CustomAxis from '../../showcase/axes/custom-axis';
import PaddedAxis from '../../showcase/axes/padded-axis';
import CustomAxesOrientation from '../../showcase/axes/custom-axes-orientation';
import AxisWithTurnedLabels from '../../showcase/plot/axis-with-turned-labels';
import AxisOn0 from '../../showcase/axes/axis-on-0';

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

  const titleStyle = $.find('.rv-xy-plot__axis__title text').prop('style');
  t.equal(titleStyle.fontSize, '16px', 'Styling: should honor title fontSize');
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
  t.equal($.find('.rv-xy-plot__series--line').length, 4, 'should find the right number of lines');
  t.ok($.find('line').length > 30, 'should find the right number of grid lines');
  t.end();
});

test('Axis: axis crosses on 0', t => {
  // vertical axes
  const $0 = mount(<AxisOn0
      verticalTickValues={[0]}
      horizontalTickValues={[]}
      yAxisOn0={true}
  />)
  .render();

  const xOfGridlines0 = $0.find('.rv-xy-plot__grid-lines line')[0].attribs.x1;
  const xOfAxisSetOn0 = translateToXY($0.find('.rv-xy-plot__axis.rv-xy-plot__axis--vertical')[0]
    .attribs.transform)[0];

  t.equal(xOfGridlines0, xOfAxisSetOn0, 'vertical axis set on 0 overlaps gridline.');

  const $1 = mount(<AxisOn0
    verticalTickValues={[0]}
    horizontalTickValues={[]}
    yAxisOn0={false}
  />)
  .render();

  const xOfAxisNotSetOn0 = $1.find('.rv-xy-plot__axis.rv-xy-plot__axis--vertical')[0]
    .attribs.transform.replace('translate(', '').split(',')[0];

  t.ok(xOfGridlines0 !== xOfAxisNotSetOn0, 'vertical axis not set on 0 won\'t overlap gridline.');

  // horizontal axes
  const $2 = mount(<AxisOn0
    verticalTickValue={[]}
    horizontalTickValues={[0]}
    xAxisOn0={true}
  />).render();
  const gridlinesY = Number(translateToXY($2.find('.rv-xy-plot__grid-lines')[0].attribs.transform)[1]);
  const yOfGridlines0 = String(gridlinesY + Number($2.find('.rv-xy-plot__grid-lines__line')[0]
    .attribs.y1));
  const yOfAxisSetOn0 = translateToXY($2.find('.rv-xy-plot__axis.rv-xy-plot__axis--horizontal')[0]
    .attribs.transform)[1];

  t.equal(yOfAxisSetOn0, yOfGridlines0,
      'horizontal axis set on 0 overlaps gridline.');

  const $3 = mount(<AxisOn0
    verticalTickValue={[]}
    horizontalTickValues={[0]}
    xAxisOn0={false}
    />).render();

  const yOfAxisNotSetOn0 = translateToXY($3.find('.rv-xy-plot__axis.rv-xy-plot__axis--horizontal')[0]
    .attribs.transform)[1];
  t.ok(yOfAxisNotSetOn0 !== yOfGridlines0, 'horizontal axis not set on 0 doesn\'t overlap gridline.');

  t.end();
});

function translateToXY(translate) {
  // 'translate(50,100)' => ['50', '100']
  const results = (/translate\(\s*([^\s,)]+)[ ,]([^\s,)]+)/.exec(translate));
  return [results[1], results[2]];
}
