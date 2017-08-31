import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import ParallelCoordinates from 'parallel-coordinates';
import BasicParallelCoordinates from '../../showcase/parallel-coordinates/basic-parallel-coordinates';
import AnimatedParallelCoordinates from '../../showcase/parallel-coordinates/animated-parallel-coordinates';

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

test('Parallel Coordinates: Showcase Example - Basic Parallel Coordinates', t => {
  const $ = mount(<BasicParallelCoordinates />);
  t.equal($.find('.rv-parallel-coordinates-chart').length, 1, 'should find a parallel coordinates chart');
  t.equal($.find('.rv-xy-manipulable-axis__ticks').length, 6, 'should find the right number of axes');
  t.equal($.find('.rv-parallel-coordinates-chart-line').length, 6, 'should find the right number of lines');
  t.equal($.find('circle').length, 18, 'should find the right number of nodes rendered');
  t.equal($.find('.rv-parallel-coordinates-chart').text(), '0.002.004.006.008.0010.0$2.0$4.8$7.6$10$13$165.006.007.008.009.0010.00.002.004.006.008.0010.00.001.402.804.205.607.0010.08.406.805.203.602.00mileagepricesafetyperformanceinteriorwarranty', 'should find the right text content');
  t.end();
});

test('Parallel Coordinates: Showcase Example - Animated Parallel Coordinates ', t => {
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
