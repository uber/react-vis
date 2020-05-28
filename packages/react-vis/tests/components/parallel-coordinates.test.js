import React from 'react';
import {mount} from 'enzyme';
import ParallelCoordinates from 'parallel-coordinates';
import BasicParallelCoordinates from '../../../showcase/parallel-coordinates/basic-parallel-coordinates';
import AnimatedParallelCoordinates from '../../../showcase/parallel-coordinates/animated-parallel-coordinates';
import BrushedParallelCoordinates from '../../../showcase/parallel-coordinates/brushed-parallel-coordinates';

import {testRenderWithProps} from '../test-utils';

const PARALLEL_COODINATES_PROPS = {
  data: [
    {
      explosions: 7,
      wow: 10,
      dog: 8,
      sickMoves: 9,
      nice: 7
    }
  ],
  domains: [
    {name: 'nice', domain: [0, 100]},
    {name: 'explosions', domain: [6.9, 7.1]},
    {name: 'wow', domain: [0, 11]},
    {name: 'dog', domain: [0, 16]},
    {name: 'sickMoves', domain: [0, 20]}
  ],
  height: 300,
  width: 400
};

describe('Parallel Coordinates', () => {
  // make sure that the components render at all
  testRenderWithProps(ParallelCoordinates, PARALLEL_COODINATES_PROPS);

  test('Basic Parallel Coordinates', () => {
    const $ = mount(<BasicParallelCoordinates />);
    expect($.find('div.rv-parallel-coordinates-chart').length).toBe(1);
    expect($.find('.rv-xy-manipulable-axis__ticks').length).toBe(6);
    expect($.find('LineSeries.rv-parallel-coordinates-chart-line').length).toBe(
      3
    );
    expect($.find('MarkSeries.rv-parallel-coordinates-chart-line').length).toBe(
      3
    );

    expect($.find('circle').length).toBe(18);
    expect($.find('div.rv-parallel-coordinates-chart').text()).toBe(
      '0.002.004.006.008.0010.0$2.0$4.8$7.6$10$13$165.006.007.008.009.0010.00.002.004.006.008.0010.00.001.402.804.205.607.0010.08.406.805.203.602.00mileagepricesafetyperformanceinteriorwarranty'
    );
  });

  test('Animated Parallel Coordinates ', () => {
    const $ = mount(<AnimatedParallelCoordinates />);
    expect($.find('div.rv-parallel-coordinates-chart').length).toBe(1);
    expect($.find('.rv-xy-manipulable-axis__ticks').length).toBe(5);
    expect($.find('path.rv-parallel-coordinates-chart-line').length).toBe(1);
    // This relies on floating point
    // t.equal(
    //   $.find('div.rv-parallel-coordinates-chart').text(),
    //   '020406080100niceexplosionswowdogsickMoves',
    //   'should find the right text content'
    // );

    $.find('.showcase-button').simulate('click');
    expect($.find('.rv-xy-manipulable-axis__ticks').length).toBe(5);
    expect($.find('path.rv-parallel-coordinates-chart-line').length).toBe(1);
  });

  test('Brushed Parallel Coordinates', () => {
    const $ = mount(<BrushedParallelCoordinates />);
    expect($.find('path.rv-parallel-coordinates-chart-line').length).toBe(150);
    expect($.find('div.rv-parallel-coordinates-chart').text()).toBe(
      '4.35.05.76.57.27.92.02.53.03.43.94.41.02.23.44.55.76.90.100.581.11.52.02.5sepal lengthsepal widthpetal lengthpetal width'
    );

    // brush
    $.find('.rv-mouse-target')
      .at(0)
      .simulate('mouseDown', {nativeEvent: {offsetX: 50, offsetY: 100}});
    for (let i = 0; i < 100; i++) {
      $.find('.rv-mouse-target')
        .at(0)
        .simulate('mouseMove', {nativeEvent: {offsetX: 50, offsetY: 100 + i}});
    }
    expect(
      $.find('.rv-parallel-coordinates-chart-line-unselected').length
    ).toBe(0);

    $.find('.rv-mouse-target')
      .at(0)
      .simulate('mouseUp', {nativeEvent: {offsetX: 50, offsetY: 200}});

    expect(
      $.find('path.rv-parallel-coordinates-chart-line-unselected').length
    ).toBe(102);

    // click to clear
    $.find('.rv-mouse-target')
      .at(0)
      .simulate('mouseDown', {nativeEvent: {offsetX: 50, offsetY: 95}});
    $.find('.rv-mouse-target')
      .at(0)
      .simulate('mouseUp', {nativeEvent: {offsetX: 50, offsetY: 95}});

    expect(
      $.find('.rv-parallel-coordinates-chart-line-unselected').length
    ).toBe(0);
  });
});
