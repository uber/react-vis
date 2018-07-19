import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import XYPlot from 'plot/xy-plot';
import HeatmapSeries from 'plot/series/heatmap-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import HeatmapChart from '../../showcase/plot/heatmap-chart';
import LabeledHeatmap from '../../showcase/plot/labeled-heatmap';

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

test('Heatmap: Showcase Example - HeatmapChart', t => {
  const $ = mount(<HeatmapChart />);
  t.equal($.find('.rv-xy-plot__series--heatmap').length, 1, 'should find the right number of series');
  t.equal($.find('.rv-xy-plot__series--heatmap rect').length, 12, 'should find the right number of series');
  t.equal($.find('.heatmap-series-example').length, 1, 'should find the correct custom class name');
  t.equal($.text(), '0.51.01.52.02.53.03.5051015', 'should find the correct text');
  t.end();
});

test('Heatmap: Showcase Example - LabeledHeatmap', t => {
  const $ = mount(<LabeledHeatmap />);
  t.equal($.find('.rv-xy-plot__series--heatmap').length, 1, 'should find the right number of series');
  t.equal($.find('.rv-xy-plot__series--label').length, 1, 'should find the right number of series');
  t.equal($.find('.rv-xy-plot__series--heatmap rect').length, 100, 'should find the right number of series');
  t.equal($.find('.heatmap-series-example').length, 1, 'should find the correct custom class name');
  t.equal($.text(), 'A1B1C1D1E1F1G1H1I1J1J2I2H2G2F2E2D2C2B2A20123456789111111111122222122233333331313444444444155555555556666666666777777777788888888889999999999', 'should find the correct text');
  t.end();
});
