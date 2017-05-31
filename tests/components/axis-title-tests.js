import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import AxisTitle from 'plot/axis/axis-title';
import {ORIENTATION} from 'utils/axis-utils';

const {LEFT, RIGHT, TOP, BOTTOM} = ORIENTATION;

const baseProps = {
  width: 400,
  height: 400,
  title: 'Title'
};

test('AxisTitle: horizontal bottom axis title', t => {
  const props = Object.assign({}, baseProps, {
    orientation: BOTTOM
  });
  const $ = mount(<AxisTitle {...props} />);
  const innerGroupHtml = $.find('g > g').html();
  t.ok(innerGroupHtml.includes('text-anchor: end'), 'should have text-anchor: end');
  t.equal($.find('text').text(), baseProps.title, 'should render the correct title');
  t.end();
});

test('AxisTitle: horizontal top axis title', t => {
  const props = Object.assign({}, baseProps, {
    orientation: TOP
  });
  const $ = mount(<AxisTitle {...props} />);
  const innerGroupHtml = $.find('g > g').html();
  t.ok(innerGroupHtml.includes('text-anchor: start'), 'should have text-anchor: start');
  t.equal($.find('text').text(), baseProps.title, 'should render the correct title');
  t.end();
});

test('AxisTitle: vertical left title', t => {
  const props = Object.assign({}, baseProps, {
    orientation: LEFT
  });
  const $ = mount(<AxisTitle {...props} />);
  const innerGroupHtml = $.find('g > g').html();
  t.ok(innerGroupHtml.includes('text-anchor: end'), 'should have text-anchor: end');
  t.equal($.find('text').text(), baseProps.title, 'should render the correct title');
  t.end();
});

test('AxisTitle: vertical right title', t => {
  const props = Object.assign({}, baseProps, {
    orientation: RIGHT
  });
  const $ = mount(<AxisTitle {...props} />);
  const innerGroupHtml = $.find('g > g').html();
  t.ok(innerGroupHtml.includes('text-anchor: start'), 'should have text-anchor: start');
  t.equal($.find('text').text(), baseProps.title, 'should render the correct title');
  t.end();
});
