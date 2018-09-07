import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import ParallelCoordinates from 'parallel-coordinates';
import BasicParallelCoordinates from '../../showcase/parallel-coordinates/basic-parallel-coordinates';
import AnimatedParallelCoordinates from '../../showcase/parallel-coordinates/animated-parallel-coordinates';
import BrushedParallelCoordinates from '../../showcase/parallel-coordinates/brushed-parallel-coordinates';

import {testRenderWithProps} from '../test-utils';

const PARALLEL_COODINATES_PROPS = {
  data: [{
    explosions: 7,
    wow: 10,
    dog: 8,
    sickMoves: 9,
    nice: 7
  }],
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
// make sure that the components render at all
testRenderWithProps(ParallelCoordinates, PARALLEL_COODINATES_PROPS);

test('Parallel Coordinates: Basic Parallel Coordinates', t => {
  const $ = mount(<BasicParallelCoordinates />);
  t.equal($.find('.rv-parallel-coordinates-chart').length, 1, 'should find a parallel coordinates chart');
  t.equal($.find('.rv-xy-manipulable-axis__ticks').length, 6, 'should find the right number of axes');
  t.equal($.find('.rv-parallel-coordinates-chart-line').length, 6, 'should find the right number of lines');
  t.equal($.find('circle').length, 18, 'should find the right number of nodes rendered');
  t.equal($.find('.rv-parallel-coordinates-chart').text(), '0.002.004.006.008.0010.0$2.0$4.8$7.6$10$13$165.006.007.008.009.0010.00.002.004.006.008.0010.00.001.402.804.205.607.0010.08.406.805.203.602.00mileagepricesafetyperformanceinteriorwarranty', 'should find the right text content');
  t.end();
});

test('Parallel Coordinates: Animated Parallel Coordinates ', t => {
  const $ = mount(<AnimatedParallelCoordinates />);
  t.equal($.find('.rv-parallel-coordinates-chart').length, 1, 'should find a parallel coordinates chart');
  t.equal($.find('.rv-xy-manipulable-axis__ticks').length, 5, 'should find the right number of axes');
  t.equal($.find('.rv-parallel-coordinates-chart-line').length, 1, 'should find the right number of axes');
  t.equal($.find('.rv-parallel-coordinates-chart').text(), '020406080100niceexplosionswowdogsickMoves', 'should find the right text content');

  $.find('.showcase-button').simulate('click');
  t.equal($.find('.rv-xy-manipulable-axis__ticks').length, 5, 'should find the right number of axes');
  t.equal($.find('.rv-parallel-coordinates-chart-line').length, 1, 'should find the right number of axes');
  t.equal($.find('.rv-parallel-coordinates-chart').text(), '020406080100niceexplosionswowdogsickMoves', 'should find the right text content');

  t.end();
});

test('Parallel Coordinates: Brushed Parallel Coordinates', t => {
  const $ = mount(<BrushedParallelCoordinates />);
  t.equal($.find('.rv-parallel-coordinates-chart-line').length, 150, 'should find the right number of lines');
  t.equal($.find('.rv-parallel-coordinates-chart').text(), '4.35.05.76.57.27.92.02.53.03.43.94.41.02.23.44.55.76.90.100.581.11.52.02.5sepal lengthsepal widthpetal lengthpetal width', 'should find the right text content');

  // brush
  $.find('.rv-mouse-target').at(0).simulate('mouseDown', {nativeEvent: {offsetX: 50, offsetY: 100}});
  for (let i = 0; i < 100; i++) {
    $.find('.rv-mouse-target').at(0).simulate('mouseMove', {nativeEvent: {offsetX: 50, offsetY: 100 + i}});
  }
  t.equal($.find('.rv-parallel-coordinates-chart-line-unselected').length, 0, 'should find no unselected lines before mouse up');

  $.find('.rv-mouse-target').at(0).simulate('mouseUp', {nativeEvent: {offsetX: 50, offsetY: 200}});

  t.equal($.find('.rv-parallel-coordinates-chart-line-unselected').length, 102, 'should find unselected lines after mouseup');

  // click to clear
  $.find('.rv-mouse-target').at(0).simulate('mouseDown', {nativeEvent: {offsetX: 50, offsetY: 95}});
  $.find('.rv-mouse-target').at(0).simulate('mouseUp', {nativeEvent: {offsetX: 50, offsetY: 95}});

  t.equal($.find('.rv-parallel-coordinates-chart-line-unselected').length, 0, 'should find no unselected lines after click to clear');

  t.end();
});
