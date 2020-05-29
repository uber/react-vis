import React from 'react';
import {mount} from 'enzyme';
import Highlight from 'plot/highlight';
import DragableExample from '../../../showcase/misc/dragable-chart-example';
import ZoomableChartExample from '../../../showcase/misc/zoomable-chart-example';
import SelectionPlotExample from '../../../showcase/misc/selection-plot-example';
import BidirectionDragChart from '../../../showcase/misc/2d-dragable-plot';

import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';

describe('Highlight', () => {
  testRenderWithProps(Highlight, GENERIC_XYPLOT_SERIES_PROPS);

  test('DragableExample', () => {
    const $ = mount(<DragableExample />);
    const initialText =
      '0.00.51.01.52.02.53.03.54.04.55.05.56.06.57.00246810selectionStart: 0,selectionEnd: 0,';
    expect($.text()).toBe(initialText);

    $.find('.rv-mouse-target').simulate('mouseDown', {
      nativeEvent: {offsetX: 100, offsetY: 100}
    });
    for (let i = 0; i < 100; i++) {
      $.find('.rv-mouse-target').simulate('mouseMove', {
        nativeEvent: {offsetX: 100 + i, offsetY: 100}
      });
    }
    expect($.text()).toBe(initialText);
    $.find('.rv-mouse-target').simulate('mouseUp', {
      nativeEvent: {offsetX: 200, offsetY: 100}
    });
    expect($.text()).toBe(
      '0.00.51.01.52.02.53.03.54.04.55.05.56.06.57.00246810selectionStart: 0.93,selectionEnd: 2.47,'
    );

    // click to clear
    $.find('.rv-mouse-target').simulate('mouseDown', {
      nativeEvent: {offsetX: 0, offsetY: 0}
    });
    $.find('.rv-mouse-target').simulate('mouseUp', {
      nativeEvent: {offsetX: 0, offsetY: 0}
    });
    expect($.text()).toBe(initialText);
  });

  test('ZoomableChartExample', () => {
    const $ = mount(<ZoomableChartExample />);
    const initialText =
      '-5051015200102030405060708090Reset ZoomLast Draw AreaN/A';
    expect($.text()).toBe(initialText);

    // brush in a drag area
    $.find('.rv-mouse-target').simulate('mouseDown', {
      nativeEvent: {offsetX: 100, offsetY: 100}
    });
    for (let i = 0; i < 100; i++) {
      $.find('.rv-mouse-target').simulate('mouseMove', {
        nativeEvent: {offsetX: 100 + i, offsetY: 100 + i}
      });
    }
    expect($.text()).toBe(initialText);

    $.find('.rv-mouse-target').simulate('mouseUp', {
      nativeEvent: {offsetX: 200, offsetY: 200}
    });
    expect($.text()).toBe(
      '-5051015200102030405060708090Reset ZoomLast Draw AreaTop: 11.083578425950623Right: 34.98Bottom: -0.5863163548405383Left: 13.2'
    );
  });

  test('SelectionPlotExample', () => {
    const $ = mount(<SelectionPlotExample />);

    const initialText = '0.51.01.52.02.5681012There are 0 selected points';
    expect($.find('g.selection-example').length).toBe(1);
    expect($.text()).toBe(initialText);

    $.find('.rv-mouse-target').simulate('mouseDown', {
      nativeEvent: {offsetX: 100, offsetY: 100}
    });
    for (let i = 0; i < 100; i++) {
      $.find('.rv-mouse-target').simulate('mouseMove', {
        nativeEvent: {offsetX: 100, offsetY: 100 + i}
      });
    }
    expect($.text()).toBe('0.51.01.52.02.5681012There are 4 selected points');
    $.find('.rv-mouse-target').simulate('mouseUp', {
      nativeEvent: {offsetX: 100, offsetY: 200}
    });
    expect($.text()).toBe('0.51.01.52.02.5681012There are 4 selected points');

    // click to clear
    $.find('.rv-mouse-target').simulate('mouseDown', {
      nativeEvent: {offsetX: 0, offsetY: 0}
    });
    $.find('.rv-mouse-target').simulate('mouseUp', {
      nativeEvent: {offsetX: 0, offsetY: 0}
    });
    expect($.text()).toBe(initialText);
  });

  test('BidirectionDragChart', () => {
    const $ = mount(<BidirectionDragChart />);

    // brush in a drag area
    expect($.text()).toBe('12342468There are 0 selected points');

    $.find('.rv-mouse-target').simulate('mouseDown', {
      nativeEvent: {offsetX: 100, offsetY: 100}
    });
    for (let i = 0; i < 100; i++) {
      $.find('.rv-mouse-target').simulate('mouseMove', {
        nativeEvent: {offsetX: 100 + i, offsetY: 100 + i}
      });
    }
    expect($.text()).toBe('12342468There are 5 selected points');

    $.find('.rv-mouse-target').simulate('mouseUp', {
      nativeEvent: {offsetX: 200, offsetY: 200}
    });
    expect($.text()).toBe('12342468There are 5 selected points');

    // execute dragging
    $.find('.rv-mouse-target').simulate('mouseDown', {
      nativeEvent: {offsetX: 150, offsetY: 150}
    });
    for (let i = 0; i < 50; i++) {
      $.find('.rv-mouse-target').simulate('mouseMove', {
        nativeEvent: {offsetX: 150 + i, offsetY: 150 + i}
      });
    }
    expect($.text()).toBe('12342468There are 6 selected points');
    $.find('.rv-mouse-target').simulate('mouseUp', {
      nativeEvent: {offsetX: 200, offsetY: 200}
    });
    expect($.text()).toBe('12342468There are 6 selected points');

    // click to clear
    $.find('.rv-mouse-target').simulate('mouseDown', {
      nativeEvent: {offsetX: 75, offsetY: 75}
    });
    $.find('.rv-mouse-target').simulate('mouseUp', {
      nativeEvent: {offsetX: 75, offsetY: 75}
    });
    expect($.text()).toBe('12342468There are 0 selected points');
  });
});
