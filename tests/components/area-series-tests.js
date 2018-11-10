import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';

import XYPlot from 'plot/xy-plot';
import AreaSeries from 'plot/series/area-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import AreaChartElevated from '../../showcase/plot/area-chart-elevated';
import AreaChart from '../../showcase/plot/area-chart';

testRenderWithProps(AreaSeries, GENERIC_XYPLOT_SERIES_PROPS);

const AREA_PROPS = {
  className: 'area-chart-example',
  color: '#12939a',
  data: [{x: 1, y: 5, y0: 6}, {x: 2, y: 20, y0: 11}, {x: 3, y: 10, y0: 9}]
};

test('AreaSeries: basic rendering', t => {
  const $ = mount(
    <XYPlot width={300} height={300}>
      <AreaSeries {...AREA_PROPS} />
    </XYPlot>
  );
  t.equal(
    $.find('.rv-xy-plot__series').length,
    1,
    'should find the right number of series'
  );
  t.equal(
    $.find('.rv-xy-plot__series path').length,
    1,
    'should find the right number of series'
  );
  t.equal(
    $.find('.area-chart-example').length,
    1,
    'should find the right number of custom named series'
  );

  $.setProps({children: <AreaSeries {...{...AREA_PROPS, data: null}} />});
  t.equal(
    $.find('.rv-xy-plot__series').length,
    0,
    'should find the right number of series'
  );
  t.equal(
    $.find('.rv-xy-plot__series path').length,
    0,
    'should find the right number of series'
  );
  t.equal(
    $.find('.area-chart-example').length,
    0,
    'should find the right number of custom named series'
  );
  t.end();
});

test('AreaSeries: Showcase Example - AreaChart', t => {
  const $ = mount(<AreaChart />);
  t.equal(
    $.find('.rv-xy-plot__series').length,
    1,
    'should find the right number of series'
  );
  t.equal(
    $.find('path.rv-xy-plot__series').length,
    1,
    'should find the right number of series'
  );
  t.equal(
    $.find('.area-series-example').length,
    1,
    'should find the right number of custom named series'
  );
  t.end();
});

test('AreaSeries: Showcase Example - AreaChartElevated', t => {
  const $ = mount(<AreaChartElevated />);
  t.equal(
    $.find('.rv-xy-plot__series').length,
    5,
    'should find the right number of series'
  );
  t.equal(
    $.find('path.rv-xy-plot__series').length,
    3,
    'should find the right number of pathes'
  );
  t.equal(
    $.find('.area-elevated-series-1').length,
    1,
    'should find the first custom component correctly'
  );
  t.equal(
    $.find('.area-elevated-series-2').length,
    1,
    'should find the second custom component correctly'
  );
  t.end();
});
