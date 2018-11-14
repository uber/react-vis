import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import XYPlot from 'plot/xy-plot';
import LineSeries from 'plot/series/line-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import LineChart from '../../showcase/plot/line-chart';
import LineMarkSeries from '../../showcase/plot/linemark-chart';
import LineChartManyColors from '../../showcase/color/line-chart-many-colors';
import NullData from '../../showcase/misc/null-data-example';
import TimeChart from '../../showcase/misc/time-chart';
import SyncedCharts from '../../showcase/misc/synced-charts';

testRenderWithProps(LineSeries, GENERIC_XYPLOT_SERIES_PROPS);

const LINE_PROPS = {
  className: 'line-chart-example',
  color: '#12939a',
  data: [{x: 1, y: 5, y0: 6}, {x: 2, y: 20, y0: 11}, {x: 3, y: 10, y0: 9}]
};

const LINE_WITH_MANY_COLORS_COLORS = [
  'rgb(255, 255, 0)',
  'rgb(255, 245, 0)',
  'rgb(255, 235, 0)',
  'rgb(255, 225, 0)',
  'rgb(255, 215, 0)',
  'rgb(255, 205, 0)',
  'rgb(255, 195, 0)',
  'rgb(255, 185, 0)',
  'rgb(255, 175, 0)',
  'rgb(255, 165, 0)',
  'rgb(255, 155, 0)',
  'rgb(255, 145, 0)',
  'rgb(255, 135, 0)',
  'rgb(255, 125, 0)',
  'rgb(255, 115, 0)',
  'rgb(255, 105, 0)',
  'rgb(255, 95, 0)',
  'rgb(255, 85, 0)',
  'rgb(255, 75, 0)',
  'rgb(255, 65, 0)'
];

test('LineSeries: basic rendering', t => {
  const $ = mount(
    <XYPlot width={300} height={300}>
      <LineSeries {...LINE_PROPS} />
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
    $.find('.line-chart-example').length,
    1,
    'should find the right number of custom named series'
  );

  $.setProps({children: <LineSeries {...{...LINE_PROPS, data: null}} />});
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
    $.find('.line-chart-example').length,
    0,
    'should find the right number of custom named series'
  );
  t.end();
});

test('LineSeries: Showcase Example - LineChart', t => {
  const $ = mount(<LineChart />);
  t.equal($.find('.alt-x-label').length, 1, 'should find custom x class on chart label correctly');
  t.equal($.find('.alt-y-label').length, 1, 'should find custom y class on chart label correctly');
  t.equal(
    $.text(),
    'TOGGLE TO CANVAS1.01.52.02.53.03.54.02468101214X AxisY Axis',
    'should find the right text content'
  );
  t.equal(
    $.find('.rv-xy-plot__series--line').length,
    3,
    'should find the right number of series'
  );

  ['first-series', 'third-series', 'fourth-series'].forEach(customClassName => {
    t.equal(
      $.find(`.${customClassName}`).length,
      1,
      `should find the right number of series with the custom class name: ${customClassName}`
    );
  });
  t.equal(
    $.find('.second-series').length,
    0,
    'there should be no line with the class second series bc it has null data and should be filtered out'
  );

  $.find('button').simulate('click');
  t.equal(
    $.find('.rv-xy-plot__series--line').length,
    0,
    'should find no more line series'
  );

  $.find('button').simulate('click');
  t.equal(
    $.find('.rv-xy-plot__series--line').length,
    3,
    'should find no more line series'
  );
  t.end();
});

test('LineSeries: Showcase Example - LineMarkSeries', t => {
  const $ = mount(<LineMarkSeries />);
  t.equal(
    $.text(),
    '1.01.52.02.53.0510152025',
    'should find the right text content'
  );
  t.equal(
    $.find('.rv-xy-plot__series--linemark').length,
    2,
    'should find the right number of series'
  );
  t.equal(
    $.find('.rv-xy-plot__series circle').length,
    6,
    'should find the right number of marks'
  );

  ['linemark-series-example', 'linemark-series-example-2'].forEach(
    customClassName => {
      t.equal(
        $.find(`.${customClassName}`).length,
        2,
        `should find the right number of series with the custom class name: ${customClassName}`
      );
    }
  );
  t.end();
});

test('LineSeries: Showcase Example - LineChartManyColors', t => {
  const $ = mount(<LineChartManyColors />);
  const lines = $.find('.rv-xy-plot__series');
  t.equal(lines.length, 20, 'line with many colors has 20 series');
  lines.forEach((node, i) =>
    t.equal(
      node.props().style.stroke,
      LINE_WITH_MANY_COLORS_COLORS[i],
      `${i}th line series gets the right color`
    )
  );
  t.end();
});

test('LineSeries: Showcase Example - TimeChart', t => {
  const $ = mount(<TimeChart />);
  t.equal(
    $.find('.rv-xy-plot__series--line').length,
    2,
    'should find the right number of lines'
  );
  t.equal(
    $.text(),
    'Sep 1012 PMMon 1112 PMTue 1212 PMWed 13X Axis2468101214Y Axis',
    'should find the right number of lines'
  );
  t.end();
});

test('LineSeries: Showcase Example - SyncedCharts', t => {
  const $ = mount(<SyncedCharts />);
  const tests = () => {
    t.equal(
      $.find('.rv-xy-plot').length,
      2,
      'should find the right number of lines'
    );
    t.equal(
      $.find('.rv-xy-plot__series--line').length,
      4,
      'should find the right number of lines'
    );
    t.equal(
      $.text(),
      '1.01.52.02.53.024681012141.01.52.02.53.0246810',
      'should find the right number of lines'
    );
  };
  tests();
  $.find('.rv-xy-plot__series--line')
    .at(0)
    .simulate('mouseEnter');
  tests();
  $.find('.rv-xy-plot')
    .at(0)
    .simulate('mouseLeave');
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

test('getNull prop: Showcase Example - Null Data Example', t => {
  const $ = mount(<NullData />);
  t.equal(
    $.find('.rv-xy-plot__series path').length,
    2,
    'should find the right number of series'
  );
  t.equal(
    $.find('.rv-xy-plot__series--mark circle').length,
    3,
    'should find the right number of circles'
  );

  simulateMouseMove(35);
  t.equal(
    $.find('.rv-crosshair__title').text(),
    'x: 1',
    'should find the right crosshair title'
  );
  t.equal(
    $.find('.rv-crosshair__item')
      .at(0)
      .text(),
    '0: 10',
    'should find the right crosshair series text'
  );
  t.equal(
    $.find('.rv-crosshair__item')
      .at(1)
      .text(),
    '1: 30',
    'should find the right crosshair series text'
  );

  $.find('.rv-xy-plot__inner').simulate('mouseleave');
  t.equal(
    $.find('.rv-crosshair').exists(),
    false,
    'crosshair should not exist'
  );

  simulateMouseMove(100);
  t.equal(
    $.find('.rv-crosshair__title').text(),
    'x: 2',
    'should find the right crosshair title'
  );
  t.equal(
    $.find('.rv-crosshair__item')
      .at(0)
      .text(),
    '0: 10',
    'should find the right crosshair series text'
  );
  t.equal(
    $.find('.rv-crosshair__item')
      .at(1)
      .text(),
    '1: 0',
    'should find the right crosshair series text'
  );

  simulateMouseMove(165);
  t.equal(
    $.find('.rv-crosshair__title').text(),
    'x: 3',
    'should find the right crosshair title'
  );
  t.equal(
    $.find('.rv-crosshair__item')
      .at(0)
      .text(),
    '0: 13',
    'should find the right crosshair series text'
  );
  t.equal(
    $.find('.rv-crosshair__item')
      .at(1)
      .exists(),
    false,
    'crosshair series text should not exist'
  );

  simulateMouseMove(230);
  t.equal(
    $.find('.rv-crosshair__title').text(),
    'x: 4',
    'should find the right crosshair title'
  );
  t.equal(
    $.find('.rv-crosshair__item')
      .at(0)
      .text(),
    '0: 7',
    'should find the right crosshair series text'
  );
  t.equal(
    $.find('.rv-crosshair__item')
      .at(1)
      .text(),
    '1: 15',
    'should find the right crosshair series text'
  );

  simulateMouseMove(295);
  t.equal(
    $.find('.rv-crosshair').exists(),
    false,
    'crosshair should not exist'
  );

  t.end();

  function simulateMouseMove(x) {
    $.find('.rv-xy-plot__inner').simulate('mousemove', {
      nativeEvent: {clientX: x, clientY: 150}
    });
  }
});
