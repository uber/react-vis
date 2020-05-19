import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import MarkSeries from 'plot/series/mark-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import Scatterplot from '../../showcase/plot/scatterplot';
import DynamicCrosshairScatterplot from '../../showcase/axes/dynamic-crosshair-scatterplot';

testRenderWithProps(MarkSeries, GENERIC_XYPLOT_SERIES_PROPS);

test('MarkSeries: Showcase Example - Scatterplot', t => {
  const $ = mount(<Scatterplot />);
  t.equal(
    $.text(),
    '1.01.52.02.53.068101214',
    'should find the right text content'
  );
  t.equal(
    $.find('.rv-xy-plot__series--mark circle').length,
    5,
    'should find the right number of circles'
  );
  t.equal(
    $.find('.mark-series-example').length,
    1,
    'should find the right number of custom named series'
  );
  t.end();
});

test('MarkSeries: Showcase Example - Dynamic Crosshair Scatterplot', t => {
  const $ = mount(<DynamicCrosshairScatterplot />);
  // NOTE: Point 0 (P0) and Point 1 (P1) are vertically aligned
  const yDistanceBetweenP0andP1 = 2.5;
  const chatTopPadding = 10;

  const highlightedCircles1 = $.find('.rv-xy-plot__series--mark circle').reduce(
    highlightedCircle,
    []
  );
  t.equal(highlightedCircles1.length, 0, 'should not highlight any circles');

  updateCursor(0, yDistanceBetweenP0andP1 / 2 - 0.01);
  const highlightedCircles2 = $.find('.rv-xy-plot__series--mark circle').reduce(
    highlightedCircle,
    []
  );
  t.equal(highlightedCircles2.length, 1, 'should highlight one circle');
  t.deepEqual(
    highlightedCircles2[0],
    {cx: 0, cy: 0},
    'should highlight circle at <0, 0>'
  );

  updateCursor(0, yDistanceBetweenP0andP1 / 2);
  const highlightedCircles3 = $.find('.rv-xy-plot__series--mark circle').reduce(
    highlightedCircle,
    []
  );
  t.equal(highlightedCircles3.length, 1, 'should highlight one circle');
  t.deepEqual(
    highlightedCircles3[0],
    {cx: 0, cy: 2.5},
    'should highlight circle at <0, 2.5>'
  );
  t.end();

  function updateCursor(x, y) {
    $.find('.rv-xy-plot__series--mark').simulate('mousemove', {
      nativeEvent: {clientX: x, clientY: y + chatTopPadding}
    });
  }

  function highlightedCircle(_highlightedCircle, circle) {
    const isHighlighted = circle.prop('style').fill === '#FF9833';
    const circlePosition = {cx: circle.prop('cx'), cy: circle.prop('cy')};
    return isHighlighted
      ? [..._highlightedCircle, circlePosition]
      : _highlightedCircle;
  }
});
