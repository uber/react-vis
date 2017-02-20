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
    {angle: 5, label: 'yellow again'}
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

  const overlaySlices = $.find('.rv-radial-chart__series--pie__slice-overlay').length;
  t.equal(overlaySlices, RADIAL_PROPS.data.length, 'should find the right number of overlay slices');

  const labels = $.find('.rv-radial-chart__series--pie-label-inner-wrapper').length;
  t.equal(labels, RADIAL_PROPS.data.length, 'should find the right number of label wrappers');
  t.equal($.text(), 'greenyellowcyanmagentayellow again', 'should find appropriate text');

  $.setProps({data: []});
  t.equal($.find('.rv-radial-chart__series--pie__slice').length, 0, 'should find no slives');
  t.equal($.find('.rv-radial-chart__series--pie__slice-overlay').length, 0, 'should find no overlay slices');
  t.equal($.find('.rv-radial-chart__series--pie-label-inner-wrapper').length, 0, 'should find no labels');
  t.equal($.text(), '', 'should find no text');
  t.end();
});

test('RadialChart: Showcase Example - Simple Radial Chart Example', t => {
  const $ = mount(<SimpleRadialChart />);
  t.equal($.find('.rv-radial-chart__series--pie__slice').length, 5, 'should find the same number of slices as data entries');
  t.equal($.find('.rv-radial-chart__series--pie__slice-overlay').length, 5, 'should find the right number of overlay slices');
  t.equal($.find('.rv-radial-chart__series--pie-label-inner-wrapper').length, 5, 'should find the right number of label wrappers');
  t.equal($.text(), 'greenyellowcyanmagentayellow again', 'should find appropriate text');
  t.end();
});

test('RadialChart: Showcase Example - DonutChart', t => {
  const $ = mount(<DonutChart />);
  t.equal($.find('.rv-radial-chart__series--pie__slice').length, 5, 'should find an appropriate number of slice');
  t.equal($.find('.rv-radial-chart__series--pie__slice-overlay').length, 5, 'should find no overlays, as labels is turned off');
  t.equal($.find('.rv-radial-chart__series--pie-label-inner-wrapper').length, 0, 'should find no label wrappers, as labels is turned off');
  t.equal($.text(), '', 'should find no text');
  t.end();
});

test('RadialChart: Showcase Example - Custom radius example', t => {
  const $ = mount(<CustomRadiusRadialChart />);
  $.find('.rv-radial-chart__series--pie__slice-overlay').at(1).simulate('mouseEnter');
  $.find('.rv-radial-chart__series--pie__slice-overlay').at(1).simulate('mouseLeave');
  t.equal($.find('.rv-radial-chart__series--pie__slice').length, 5, 'should find the same number of slices as data entries');
  t.equal($.find('.rv-radial-chart__series--pie__slice-overlay').length, 5, 'should find the right number of overlay slices');
  t.equal($.find('.rv-radial-chart__series--pie-label-inner-wrapper').length, 3, 'should find the right number of label wrappers');
  t.equal($.text(), 'Super Custom labelWith annotationAlt LabelSub Label only', 'should find appropriate text');
  t.end();
});
