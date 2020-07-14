import React from 'react';
import {mount} from 'enzyme';
import Treemap from '~/treemap';

import SimpleTreemap from '../../../showcase/treemap/simple-treemap';
import DynamicTreemap from '../../../showcase/treemap/dynamic-treemap';

import {testRenderWithProps} from '../test-utils';

const INTERPOLATE_DATA = {
  title: 'interpolate',
  children: [
    {title: 'ArrayInterpolator', color: '#12939A', size: 1983},
    {title: 'ColorInterpolator', color: '#12939A', size: 2047},
    {title: 'DateInterpolator', color: '#12939A', size: 1375},
    {title: 'Interpolator', color: '#12939A', size: 8746},
    {title: 'MatrixInterpolator', color: '#12939A', size: 2202},
    {title: 'NumberInterpolator', color: '#12939A', size: 1382},
    {title: 'ObjectInterpolator', color: '#12939A', size: 1629},
    {title: 'PointInterpolator', color: '#12939A', size: 1675},
    {title: 'RectangleInterpolator', color: '#12939A', size: 2042}
  ]
};

const TREEMAP_PROPS = {
  height: 100,
  width: 100,
  className: 'little-nested-tree-example',
  data: {
    name: 'animate',
    children: [
      {title: 'Easing', color: '#12939A', size: 17010},
      {title: 'FunctionSequence', color: '#12939A', size: 5842},
      INTERPOLATE_DATA,
      {title: 'ISchedulable', color: '#12939A', size: 1041},
      {title: 'Parallel', color: '#12939A', size: 5176},
      {title: 'Pause', color: '#12939A', size: 449},
      {title: 'Scheduler', color: '#12939A', size: 5593},
      {title: 'Sequence', color: '#12939A', size: 5534},
      {title: 'Transition', color: '#12939A', size: 9201},
      {title: 'Transitioner', color: '#12939A', size: 19975},
      {title: 'TransitionEvent', color: '#12939A', size: 1116},
      {title: 'Neonate', color: '#12939A', size: 6006}
    ]
  }
};

describe('Treemap', () => {
  // make sure that the components render at all
  testRenderWithProps(Treemap, TREEMAP_PROPS);

  test('Basic rendering', () => {
    const $ = mount(<Treemap {...TREEMAP_PROPS} />);
    expect($.find('.rv-treemap__leaf').length).toBe(22);
    const expectedText =
      'EasingNeonateinterpolateISchedulableParallelPauseFunctionSequenceSequenceTransitionTransitionerTransitionEventSchedulerArrayInterpolatorColorInterpolatorDateInterpolatorInterpolatorMatrixInterpolatorNumberInterpolatorObjectInterpolatorPointInterpolatorRectangleInterpolator';
    expect($.find('.rv-treemap').text()).toBe(expectedText);
    expect($.find('div.little-nested-tree-example').length).toBe(1);

    $.setProps({data: INTERPOLATE_DATA});
    expect($.find('.rv-treemap__leaf').length).toBe(10);
    const newText =
      'interpolateArrayInterpolatorColorInterpolatorDateInterpolatorInterpolatorMatrixInterpolatorNumberInterpolatorObjectInterpolatorPointInterpolatorRectangleInterpolator';
    expect($.find('.rv-treemap').text()).toBe(newText);
    expect($.find('div.little-nested-tree-example').length).toBe(1);
  });

  test('Custom Sorting', () => {
    const $ = mount(<Treemap {...TREEMAP_PROPS} />);
    const expectedText =
      'interpolateTransitionerEasingTransitionNeonateFunctionSequenceSchedulerSequenceParallelTransitionEventISchedulablePauseInterpolatorMatrixInterpolatorColorInterpolatorRectangleInterpolatorArrayInterpolatorPointInterpolatorObjectInterpolatorNumberInterpolatorDateInterpolator';
    const expectedReverseText =
      'PauseISchedulableTransitionEventParallelSequenceSchedulerFunctionSequenceNeonateTransitionEasingTransitionerinterpolateDateInterpolatorNumberInterpolatorObjectInterpolatorPointInterpolatorArrayInterpolatorRectangleInterpolatorColorInterpolatorMatrixInterpolatorInterpolator';
    const expectedNewText =
      'interpolateInterpolatorMatrixInterpolatorColorInterpolatorRectangleInterpolatorArrayInterpolatorPointInterpolatorObjectInterpolatorNumberInterpolatorDateInterpolator';
    const expectedReverseNewText =
      'interpolateDateInterpolatorNumberInterpolatorObjectInterpolatorPointInterpolatorArrayInterpolatorRectangleInterpolatorColorInterpolatorMatrixInterpolatorInterpolator';

    [
      'circlePack',
      'partition',
      'partition-pivot',
      'squarify',
      'resquarify',
      'slice',
      'dice',
      'slicedice',
      'binary'
    ].forEach(mode => {
      $.setProps({
        mode,
        sortFunction: (a, b) => b.value - a.value,
        ...TREEMAP_PROPS
      });
      expect($.find('.rv-treemap').text()).toBe(expectedText);
      $.setProps({sortFunction: (a, b) => a.value - b.value});
      expect($.find('.rv-treemap').text()).toBe(expectedReverseText);

      // circle pack includes the root node, while the other modes do not. The root of INTERPOLATE_DATA has a title, but the root of the default data does not
      $.setProps({
        data: INTERPOLATE_DATA,
        sortFunction: (a, b) => b.value - a.value
      });
      expect($.find('.rv-treemap').text()).toBe(expectedNewText);
      $.setProps({sortFunction: (a, b) => a.value - b.value});
      expect($.find('.rv-treemap').text()).toBe(expectedReverseNewText);
    });
  });

  test('Empty treemap', () => {
    const $ = mount(<Treemap {...{...TREEMAP_PROPS, data: {}}} />);
    // 1 is the empty root node
    expect($.find('.rv-treemap__leaf').length).toBe(1);
    expect($.find('.rv-treemap').text()).toBe('');
    expect($.find('div.little-nested-tree-example').length).toBe(1);
  });

  test('Hide Root Node', () => {
    const $ = mount(<Treemap {...TREEMAP_PROPS} />);
    // the tree from TREEMAP_PROPS doesn't have a title so its text is the same with ot without the root
    const expectedText =
      'EasingNeonateinterpolateISchedulableParallelPauseFunctionSequenceSequenceTransitionTransitionerTransitionEventSchedulerArrayInterpolatorColorInterpolatorDateInterpolatorInterpolatorMatrixInterpolatorNumberInterpolatorObjectInterpolatorPointInterpolatorRectangleInterpolator';
    const numberOfElements = 21;
    const numberOfElementsWithRoot = numberOfElements + 1;
    const expectedNewText =
      'ArrayInterpolatorColorInterpolatorDateInterpolatorInterpolatorMatrixInterpolatorNumberInterpolatorObjectInterpolatorPointInterpolatorRectangleInterpolator';
    const expectedNewTextWithRoot = `interpolate${expectedNewText}`;
    const numberOfNewElements = 9;
    const numberOfNewElementsWithRoot = numberOfNewElements + 1;
    [
      'circlePack',
      'partition',
      'partition-pivot',
      'squarify',
      'resquarify',
      'slice',
      'dice',
      'slicedice',
      'binary'
    ].forEach(mode => {
      $.setProps({mode, ...TREEMAP_PROPS, hideRootNode: false});
      expect($.find('.rv-treemap').text()).toBe(expectedText);
      expect($.find('.rv-treemap__leaf').length).toBe(numberOfElementsWithRoot);
      $.setProps({hideRootNode: true});
      expect($.find('.rv-treemap').text()).toBe(expectedText);
      expect($.find('.rv-treemap__leaf').length).toBe(numberOfElements);

      $.setProps({data: INTERPOLATE_DATA, hideRootNode: false});
      expect($.find('.rv-treemap').text()).toBe(expectedNewTextWithRoot);
      expect($.find('.rv-treemap__leaf').length).toBe(
        numberOfNewElementsWithRoot
      );
      $.setProps({hideRootNode: true});
      expect($.find('.rv-treemap').text()).toBe(expectedNewText);
      expect($.find('.rv-treemap__leaf').length).toBe(numberOfNewElements);
    });
  });

  test('SimpleTreemap', () => {
    const $ = mount(<SimpleTreemap />);
    [
      'circlePack',
      'partition',
      'partition-pivot',
      'squarify',
      'resquarify',
      'slice',
      'dice',
      'slicedice',
      'binary'
    ].forEach(mode => {
      const selector =
        mode === 'circlePack'
          ? '.rv-treemap__leaf circle'
          : 'path.rv-treemap__leaf';
      // circle pack includes the root node, while the other modes do not
      const numberOfElements = 252;
      expect($.find(selector).length).toBe(numberOfElements);
      expect($.text()).toBe(`USE DOMPREV MODE ${mode} NEXT MODE`);
      // switch to svg
      $.find('.showcase-button')
        .at(0)
        .simulate('click');
      expect($.find('.rv-treemap__leaf').length).toBe(numberOfElements);
      expect($.text()).toBe(`USE SVGPREV MODE ${mode} NEXT MODE`);

      // switch back to dom and go to next mode
      $.find('.showcase-button')
        .at(0)
        .simulate('click');
      $.find('.showcase-button')
        .at(2)
        .simulate('click');
    });
  });

  test('DynamicTreemap', () => {
    const $ = mount(<DynamicTreemap />);
    expect($.find('.rv-treemap__leaf').length).toBe(21);
    expect($.find('.rv-treemap').text()).toBe(
      '2020202020202020202020202020202020202020'
    );
  });
});
