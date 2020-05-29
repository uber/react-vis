import React from 'react';
import {mount} from 'enzyme';
import XYPlot from 'plot/xy-plot';
import HeatmapSeries from 'plot/series/heatmap-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import HeatmapChart from '../../../showcase/plot/heatmap-chart';
import LabeledHeatmap from '../../../showcase/plot/labeled-heatmap';

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

describe('Heatmap', () => {
  testRenderWithProps(HeatmapSeries, GENERIC_XYPLOT_SERIES_PROPS, true);

  test('basic rendering', () => {
    const $ = mount(
      <XYPlot width={300} height={300}>
        <HeatmapSeries {...HEATMAP_PROPS} />
      </XYPlot>
    );
    expect($.find('.rv-xy-plot__series--heatmap').length).toBe(1);
    expect($.find('.rv-xy-plot__series--heatmap rect').length).toBe(12);
    expect($.find('g.heatmap-series-example').length).toBe(1);

    $.setProps({
      children: <HeatmapSeries {...{...HEATMAP_PROPS, data: null}} />
    });
    expect($.find('.rv-xy-plot__series--heatmap').length).toBe(0);
    expect($.find('.rv-xy-plot__series--heatmap rect').length).toBe(0);
    expect($.find('.heatmap-series-example').length).toBe(0);
  });

  test('Showcase Example - HeatmapChart', () => {
    const $ = mount(<HeatmapChart />);
    expect($.find('.rv-xy-plot__series--heatmap').length).toBe(1);
    expect($.find('.rv-xy-plot__series--heatmap rect').length).toBe(12);
    expect($.find('g.heatmap-series-example').length).toBe(1);
    expect($.text()).toBe('0.51.01.52.02.53.03.5051015');
  });

  test('Showcase Example - LabeledHeatmap', () => {
    const $ = mount(<LabeledHeatmap />);
    expect($.find('.rv-xy-plot__series--heatmap').length).toBe(1);
    expect($.find('.rv-xy-plot__series--label').length).toBe(1);
    expect($.find('.rv-xy-plot__series--heatmap rect').length).toBe(100);
    expect($.find('g.heatmap-series-example').length).toBe(1);
    expect($.text()).toBe(
      'A1B1C1D1E1F1G1H1I1J1J2I2H2G2F2E2D2C2B2A20123456789111111111122222122233333331313444444444155555555556666666666777777777788888888889999999999'
    );
  });
});
