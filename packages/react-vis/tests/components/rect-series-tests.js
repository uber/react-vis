import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import HorizontalRectSeries from 'plot/series/horizontal-bar-series';
import VerticalRectSeries from 'plot/series/vertical-bar-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import Histogram from '../../showcase/plot/histogram';
import StackedHistogram from '../../showcase/plot/stacked-histogram';

testRenderWithProps(HorizontalRectSeries, GENERIC_XYPLOT_SERIES_PROPS);
testRenderWithProps(VerticalRectSeries, GENERIC_XYPLOT_SERIES_PROPS);

test('RectSeries: Showcase Example - StackedHistogram', t => {
  const $ = mount(<StackedHistogram />);
  t.equal(
    $.text(),
    'TOGGLE TO CANVAS01234567051015202530',
    'should fine the right text content'
  );
  t.equal(
    $.find('.rv-xy-plot__series--rect rect').length,
    6,
    'should find the right number of bars'
  );

  $.find('.showcase-button').simulate('click');
  t.equal(
    $.find('.rv-xy-plot__series--rect rect').length,
    0,
    'should now find no rects'
  );
  t.equal(
    $.find('.rv-xy-canvas canvas').length,
    1,
    'should now find one canvas'
  );
  t.end();
});

test('RectSeries: Showcase Example - Histogram', t => {
  const $ = mount(<Histogram />);
  t.equal(
    $.text(),
    'May 21May 28Jun 04Jun 11Jun 180.51.01.52.0',
    'should fine the right text content'
  );
  t.equal(
    $.find('.rv-xy-plot__series--rect rect').length,
    8,
    'should find the right number of bars'
  );

  t.end();
});
