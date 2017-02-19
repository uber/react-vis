import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import XYPlot from 'plot/xy-plot';
import HeatmapSeries from 'plot/series/heatmap-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';

const HEATMAP_PROPS = {
  className: 'heatmap-series-example',
  data: [
    {x: 1, y: 0, color: 10},
    {x: 1, y: 5, color: 10},
    {x: 1, y: 10, color: 6},
    {x: 1, y: 15, color: 7},
    {x: 2, y: 0, color: 12},
    {x: 2, y: 5, color: 2},
    {x: 2, y: 10, color: 1},
    {x: 2, y: 15, color: 12},
    {x: 3, y: 0, color: 9},
    {x: 3, y: 5, color: 2},
    {x: 3, y: 10, color: 6},
    {x: 3, y: 15, color: 12}
  ]
};

testRenderWithProps(HeatmapSeries, GENERIC_XYPLOT_SERIES_PROPS);

test('Heatmap: basic rendering', t => {
  const $ = mount(
    <XYPlot width={300} height={300}>
      <HeatmapSeries {...HEATMAP_PROPS}/>
    </XYPlot>
  );
  t.equal($.find('.rv-xy-plot__series--heatmap').length, 1, 'should find the right number of series');
  t.equal($.find('.rv-xy-plot__series--heatmap rect').length, 12, 'should find the right number of series');
  t.equal($.find('.heatmap-series-example').length, 1, 'should find the correct custom class name');

  $.setProps({children: (<HeatmapSeries {...{...HEATMAP_PROPS, data: null}}/>)});
  t.equal($.find('.rv-xy-plot__series--heatmap').length, 0, 'should find no series');
  t.equal($.find('.rv-xy-plot__series--heatmap rect').length, 0, 'should find no rects');
  t.equal($.find('.heatmap-series-example').length, 0, 'should not find the custom name');
  t.end();
});
