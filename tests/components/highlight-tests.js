import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import Highlight from 'plot/highlight';
import DragableExample from '../../showcase/misc/dragable-chart-example';
import ZoomableChartExample from '../../showcase/misc/zoomable-chart-example';
import SelectionPlotExample from '../../showcase/misc/selection-plot-example';
import BidirectionDragChart from '../../showcase/misc/2d-dragable-plot';

import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';

testRenderWithProps(Highlight, GENERIC_XYPLOT_SERIES_PROPS);

test('Highlight: DragableExample', t => {
  const $ = mount(<DragableExample />);
  const initialText =
    '0.00.51.01.52.02.53.03.54.04.55.05.56.06.57.00246810selectionStart: 0,selectionEnd: 0,';
  t.equal($.text(), initialText, 'should find the correct text initially');

  $.find('.rv-mouse-target').simulate('mouseDown', {
    nativeEvent: {offsetX: 100, offsetY: 100}
  });
  for (let i = 0; i < 100; i++) {
    $.find('.rv-mouse-target').simulate('mouseMove', {
      nativeEvent: {offsetX: 100 + i, offsetY: 100}
    });
  }
  t.equal($.text(), initialText, 'should find the right text after brushing');
  $.find('.rv-mouse-target').simulate('mouseUp', {
    nativeEvent: {offsetX: 200, offsetY: 100}
  });
  t.equal(
    $.text(),
    '0.00.51.01.52.02.53.03.54.04.55.05.56.06.57.00246810selectionStart: 0.93,selectionEnd: 2.47,',
    'should find the right text after brushing'
  );

  // click to clear
  $.find('.rv-mouse-target').simulate('mouseDown', {
    nativeEvent: {offsetX: 0, offsetY: 0}
  });
  $.find('.rv-mouse-target').simulate('mouseUp', {
    nativeEvent: {offsetX: 0, offsetY: 0}
  });
  t.equal(
    $.text(),
    initialText,
    'should find no points selected after click to clear'
  );

  t.end();
});

test('Highlight: ZoomableChartExample', t => {
  const $ = mount(<ZoomableChartExample />);
  const initialText =
    '-5051015200102030405060708090Reset ZoomLast Draw AreaN/A';
  t.equal($.text(), initialText, 'should find the correct text initially');

  // brush in a drag area
  $.find('.rv-mouse-target').simulate('mouseDown', {
    nativeEvent: {offsetX: 100, offsetY: 100}
  });
  for (let i = 0; i < 100; i++) {
    $.find('.rv-mouse-target').simulate('mouseMove', {
      nativeEvent: {offsetX: 100 + i, offsetY: 100 + i}
    });
  }
  t.equal($.text(), initialText, 'should find the right text after brushing');

  $.find('.rv-mouse-target').simulate('mouseUp', {
    nativeEvent: {offsetX: 200, offsetY: 200}
  });
  t.equal(
    $.text(),
    '-5051015200102030405060708090Reset ZoomLast Draw AreaTop: 11.083578425950622Right: 34.98Bottom: -0.5863163548405375Left: 13.2',
    'should find the right text after brush finishes'
  );

  t.end();
});

test('Highlight: SelectionPlotExample', t => {
  const $ = mount(<SelectionPlotExample />);

  const initialText = '0.51.01.52.02.5681012There are 0 selected points';
  t.equal(
    $.find('.selection-example').length,
    1,
    'should find the custom class is passed through correctly'
  );
  t.equal($.text(), initialText, 'should find the correct text initially');

  $.find('.rv-mouse-target').simulate('mouseDown', {
    nativeEvent: {offsetX: 100, offsetY: 100}
  });
  for (let i = 0; i < 100; i++) {
    $.find('.rv-mouse-target').simulate('mouseMove', {
      nativeEvent: {offsetX: 100, offsetY: 100 + i}
    });
  }
  t.equal(
    $.text(),
    '0.51.01.52.02.5681012There are 4 selected points',
    'should find the right text after brushing'
  );
  $.find('.rv-mouse-target').simulate('mouseUp', {
    nativeEvent: {offsetX: 100, offsetY: 200}
  });
  t.equal(
    $.text(),
    '0.51.01.52.02.5681012There are 4 selected points',
    'should find the right text after brushing'
  );

  // click to clear
  $.find('.rv-mouse-target').simulate('mouseDown', {
    nativeEvent: {offsetX: 0, offsetY: 0}
  });
  $.find('.rv-mouse-target').simulate('mouseUp', {
    nativeEvent: {offsetX: 0, offsetY: 0}
  });
  t.equal(
    $.text(),
    initialText,
    'should find no points selected after click to clear'
  );
  t.end();
});

test('Highlight: BidirectionDragChart', t => {
  const $ = mount(<BidirectionDragChart />);

  // brush in a drag area
  t.equal(
    $.text(),
    '12342468There are 0 selected points',
    'should find the correct text initially'
  );

  $.find('.rv-mouse-target').simulate('mouseDown', {
    nativeEvent: {offsetX: 100, offsetY: 100}
  });
  for (let i = 0; i < 100; i++) {
    $.find('.rv-mouse-target').simulate('mouseMove', {
      nativeEvent: {offsetX: 100 + i, offsetY: 100 + i}
    });
  }
  t.equal(
    $.text(),
    '12342468There are 5 selected points',
    'should find the right text after brushing'
  );

  $.find('.rv-mouse-target').simulate('mouseUp', {
    nativeEvent: {offsetX: 200, offsetY: 200}
  });
  t.equal(
    $.text(),
    '12342468There are 5 selected points',
    'should find the right text after brush finishes'
  );

  // execute dragging
  $.find('.rv-mouse-target').simulate('mouseDown', {
    nativeEvent: {offsetX: 150, offsetY: 150}
  });
  for (let i = 0; i < 50; i++) {
    $.find('.rv-mouse-target').simulate('mouseMove', {
      nativeEvent: {offsetX: 150 + i, offsetY: 150 + i}
    });
  }
  t.equal(
    $.text(),
    '12342468There are 6 selected points',
    'should find the right text after dragging'
  );
  $.find('.rv-mouse-target').simulate('mouseUp', {
    nativeEvent: {offsetX: 200, offsetY: 200}
  });
  t.equal(
    $.text(),
    '12342468There are 6 selected points',
    'should find the right text after drag finishes'
  );

  // click to clear
  $.find('.rv-mouse-target').simulate('mouseDown', {
    nativeEvent: {offsetX: 75, offsetY: 75}
  });
  $.find('.rv-mouse-target').simulate('mouseUp', {
    nativeEvent: {offsetX: 75, offsetY: 75}
  });
  t.equal(
    $.text(),
    '12342468There are 0 selected points',
    'should find no points selected after click to clear'
  );

  t.end();
});
