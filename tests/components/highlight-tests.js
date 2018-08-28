import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import Highlight from 'plot/highlight';
import DragableExample from '../../showcase/misc/dragable-chart-example';
import ZoomableChartExample from '../../showcase/misc/zoomable-chart-example';
import SelectionPlotExample from '../../showcase/misc/selection-plot-example';

import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';

testRenderWithProps(Highlight, GENERIC_XYPLOT_SERIES_PROPS);

test('Highlight: DragableExample', t => {
  const $ = mount(<DragableExample />);
  t.equal($.text(), '0.00.51.01.52.02.53.03.54.04.55.05.56.06.57.00246810selectionStart: 0,selectionEnd: 0,', 'should find the correct text initially');

  t.end();
});

test('Highlight: ZoomableChartExample', t => {
  const $ = mount(<ZoomableChartExample />);
  t.equal($.text(), '-40-30-20-100100102030405060708090Reset ZoomLast Draw AreaN/A', 'should find the correct text initially');

  t.end();
});

test('Highlight: DragableExample', t => {
  const $ = mount(<SelectionPlotExample />);
  t.equal($.text(), '1.01.52.02.53.0468101214', 'should find the correct text initially');

  t.end();
});
