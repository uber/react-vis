import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import RadialChart from 'radial-chart';
import SimpleRadialChart from '../../showcase/radial-chart/simple-radial-chart';
import DonutChart from '../../showcase/radial-chart/donut-chart';
import CustomRadiusRadialChart from '../../showcase/radial-chart/custom-radius-radial-chart';

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
  width: 400
};
// make sure that the components render at all
testRenderWithProps(RadialChart, RADIAL_PROPS);

test('RadialChart: Basic rendering', t => {
  const $ = mount(<RadialChart {...RADIAL_PROPS}/>);
  const pieSlices = $.find('.rv-radial-chart__series--pie__slice').length;
  t.equal(pieSlices, RADIAL_PROPS.data.length, 'should find the same number of slices as data entries');
  t.equal($.find('.rv-radial-chart__series--pie__slice').at(0).prop('className'), 'rv-radial-chart__series--pie__slice custom-class', 'should have custom class if defined in data entry');

  const labels = $.find('.rv-xy-plot__series--label-text').length;
  t.equal(labels, RADIAL_PROPS.data.length, 'should find the right number of label wrappers');
  t.equal($.text(), 'yellow againmagentacyanyellowgreen', 'should find appropriate text');

  $.setProps({data: []});
  t.equal($.find('.rv-radial-chart__series--pie__slice').length, 0, 'should find no slives');
  t.equal($.find('.rv-radial-chart__series--pie__slice-overlay').length, 0, 'should find no overlay slices');
  t.equal($.find('.rv-xy-plot__series--label-text').length, 0, 'should find no labels');
  t.equal($.text(), '', 'should find no text');
  t.end();
});

test('RadialChart: Showcase Example - Simple Radial Chart Example', t => {
  const $ = mount(<SimpleRadialChart />);
  t.equal($.find('.rv-radial-chart__series--pie__slice').length, 5, 'should find the same number of slices as data entries');
  t.equal($.find('.rv-xy-plot__series--label-text').length, 5, 'should find the right number of label wrappers');
  t.equal($.text(), 'yellow againmagentacyanyellowgreen', 'should find appropriate text');
  t.end();
});

test('RadialChart: Showcase Example - DonutChart', t => {
  const $ = mount(<DonutChart />);
  t.equal($.find('.rv-radial-chart__series--pie__slice').length, 5, 'should find an appropriate number of slice');
  t.equal($.find('.rv-xy-plot__series--label-text').length, 0, 'should find no label wrappers, as labels is turned off');
  t.equal($.text(), '', 'should find no text');
  $.find('.rv-radial-chart__series--pie__slice').at(1).simulate('mouseOver');
  t.equal($.text(), 'angle: -4.263590029871862angle0: -2.9171931783333793radius0: 0radius: 1color: 1x: -0.4338837391175583y: 0.900968867902419', 'should find appropriate hover text');
  t.end();
});

test('RadialChart: Showcase Example - Custom radius example', t => {
  const $ = mount(<CustomRadiusRadialChart />);
  $.find('.rv-radial-chart__series--pie__slice').at(1).simulate('mouseEnter');
  $.find('.rv-radial-chart__series--pie__slice').at(1).simulate('mouseLeave');
  t.equal($.find('.rv-radial-chart__series--pie__slice').length, 5, 'should find the same number of slices as data entries');
  t.equal($.find('.rv-xy-plot__series--label-text').length, 4, 'should find the right number of label wrappers');
  t.equal($.text(), 'Sub Label onlyAlt LabelSuper Custom labelWith annotation', 'should find appropriate text');
  t.end();
});
