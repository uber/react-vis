import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import XYPlot from 'plot/xy-plot';
import LineSeries from 'plot/series/line-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
// import AreaChartElevatedExample from '../../showcase/plot/area-chart-elevated';

testRenderWithProps(LineSeries, GENERIC_XYPLOT_SERIES_PROPS);

const LINE_PROPS = {
  className: 'line-chart-example',
  color: '#12939a',
  data: [
    {x: 1, y: 5, y0: 6},
    {x: 2, y: 20, y0: 11},
    {x: 3, y: 10, y0: 9}
  ]
};

test('LineSeries: basic rendering', t => {
  const $ = mount(
    <XYPlot width={300} height={300}>
      <LineSeries {...LINE_PROPS}/>
    </XYPlot>
  );
  t.equal($.find('.rv-xy-plot__series').length, 1, 'should find the right number of series');
  t.equal($.find('.rv-xy-plot__series path').length, 1, 'should find the right number of series');
  t.equal($.find('.line-chart-example').length, 1, 'should find the right number of custom named series');

  $.setProps({children: (<LineSeries {...{...LINE_PROPS, data: null}}/>)});
  t.equal($.find('.rv-xy-plot__series').length, 0, 'should find the right number of series');
  t.equal($.find('.rv-xy-plot__series path').length, 0, 'should find the right number of series');
  t.equal($.find('.line-chart-example').length, 0, 'should find the right number of custom named series');
  t.end();
});
