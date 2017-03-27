import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import XYPlot from 'plot/xy-plot';
import LineSeries from 'plot/series/line-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import LineChart from '../../showcase/plot/line-chart';
import LineMarkSeries from '../../showcase/plot/linemark-chart';

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

test('LineSeries: Showcase Example - LineChart', t => {
  const $ = mount(<LineChart />);
  t.equal($.text(), '1.01.52.02.53.03.54.0X Axis2468101214Y Axis', 'should fine the right text content');
  t.equal($.find('.rv-xy-plot__series--line').length, 3, 'should find the right number of series');

  ['first-series', 'third-series', 'fourth-series'].forEach(customClassName => {
    t.equal($.find(`.${customClassName}`).length, 1,
    `should find the right number of series with the custom class name: ${customClassName}`);
  });
  t.equal($.find('.second-series').length, 0,
    'there should be no line with the class second series bc it has null data and should be filtered out');
  t.end();
});

test('LineSeries: Showcase Example - LineMarkSeries', t => {
  const $ = mount(<LineMarkSeries />);
  t.equal($.text(), '1.01.52.02.53.0510152025', 'should fine the right text content');
  t.equal($.find('.rv-xy-plot__series--linemark').length, 2, 'should find the right number of series');
  t.equal($.find('.rv-xy-plot__series circle').length, 6, 'should find the right number of marks');

  ['linemark-series-example', 'linemark-series-example-2'].forEach(customClassName => {
    t.equal($.find(`.${customClassName}`).length, 2,
    `should find the right number of series with the custom class name: ${customClassName}`);
  });
  t.end();
});

test('LineSeries: Line Styling', t => {
  const $ = mount(
    <XYPlot width={300} height={300}>
      <LineSeries
        {...LINE_PROPS}
        opacity={0.5}
        strokeWidth="3px"
        stroke="rgb(255, 255, 255)"
        strokeDasharray="3, 1"
      />
    </XYPlot>
  );

  const lineStyle = $.find('.rv-xy-plot__series path').prop('style');

  t.equal(lineStyle.opacity, 0.5, 'should render an opaque line');
  t.equal(lineStyle.strokeWidth, '3px', 'should honor stroke width');
  t.equal(lineStyle.stroke, 'rgb(255, 255, 255)', 'should honor stroke');
  t.equal(lineStyle.strokeDasharray, '3, 1', 'should honor stroke dash-array');
  t.end();
});
