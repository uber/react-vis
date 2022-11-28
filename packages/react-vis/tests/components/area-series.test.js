import React from 'react';
import {mount} from 'enzyme';

import XYPlot from '~/plot/xy-plot';
import AreaSeries from '~/plot/series/area-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import AreaChartElevated from '../../../showcase/plot/area-chart-elevated';
import AreaChart from '../../../showcase/plot/area-chart';

testRenderWithProps(AreaSeries, GENERIC_XYPLOT_SERIES_PROPS, true);

const AREA_PROPS = {
  className: 'area-chart-example',
  color: '#12939a',
  data: [
    {x: 1, y: 5, y0: 6},
    {x: 2, y: 20, y0: 11},
    {x: 3, y: 10, y0: 9}
  ]
};

describe('AreaSeries', () => {
  test('basic rendering', () => {
    const $ = mount(
      <XYPlot width={300} height={300}>
        <AreaSeries {...AREA_PROPS} />
      </XYPlot>
    );
    expect($.find('.rv-xy-plot__series').length).toBe(1);
    expect($.find('path.rv-xy-plot__series').length).toBe(1);
    expect($.find('path.area-chart-example').length).toBe(1);

    $.setProps({children: <AreaSeries {...{...AREA_PROPS, data: null}} />});
    expect($.find('.rv-xy-plot__series').length).toBe(0);
    expect($.find('.rv-xy-plot__series path').length).toBe(0);
    expect($.find('.area-chart-example').length).toBe(0);
  });

  test('AreaSeries: Showcase Example - AreaChart', () => {
    const $ = mount(<AreaChart />);
    expect($.find('.rv-xy-plot__series').length).toBe(1);
    expect($.find('path.rv-xy-plot__series').length).toBe(1);
    expect($.find('path.area-series-example').length).toBe(1);
  });

  test('AreaSeries: Showcase Example - AreaChartElevated', () => {
    const $ = mount(<AreaChartElevated />);
    expect($.find('.rv-xy-plot__series').length).toBe(5);
    expect($.find('path.rv-xy-plot__series').length).toBe(3);
    expect($.find('path.area-elevated-series-1').length).toBe(1);
    expect($.find('path.area-elevated-series-2').length).toBe(1);
  });
});
