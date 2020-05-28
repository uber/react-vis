import React from 'react';
import {mount} from 'enzyme';
import MarkSeries from 'plot/series/mark-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import Scatterplot from '../../../showcase/plot/scatterplot';
import DynamicCrosshairScatterplot from '../../../showcase/axes/dynamic-crosshair-scatterplot';

describe('MarkSeries', () => {
  testRenderWithProps(MarkSeries, GENERIC_XYPLOT_SERIES_PROPS);

  test('MShowcase Example - Scatterplot', () => {
    const $ = mount(<Scatterplot />);
    expect($.text()).toBe('1.01.52.02.53.068101214');
    expect($.find('.rv-xy-plot__series--mark circle').length).toBe(5);
    expect($.find('g.mark-series-example').length).toBe(1);
  });

  test('MShowcase Example - Dynamic Crosshair Scatterplot', () => {
    const $ = mount(<DynamicCrosshairScatterplot />);
    // NOTE: Point 0 (P0) and Point 1 (P1) are vertically aligned
    const yDistanceBetweenP0andP1 = 2.5;
    const chatTopPadding = 10;

    const highlightedCircles1 = $.find(
      '.rv-xy-plot__series--mark circle'
    ).reduce(highlightedCircle, []);
    expect(highlightedCircles1.length).toBe(0);

    updateCursor(0, yDistanceBetweenP0andP1 / 2 - 0.01);
    const highlightedCircles2 = $.find(
      '.rv-xy-plot__series--mark circle'
    ).reduce(highlightedCircle, []);
    expect(highlightedCircles2.length).toBe(1);
    expect(highlightedCircles2[0]).toEqual({cx: 0, cy: 0});

    updateCursor(0, yDistanceBetweenP0andP1 / 2);
    const highlightedCircles3 = $.find(
      '.rv-xy-plot__series--mark circle'
    ).reduce(highlightedCircle, []);
    expect(highlightedCircles3.length).toBe(1);

    expect(Math.abs(highlightedCircles3[0].cx - 0) < 0.005).toBeTruthy();
    expect(Math.abs(highlightedCircles3[0].cy - 2.5) < 0.005).toBeTruthy();

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
});
