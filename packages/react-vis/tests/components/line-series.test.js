import React from 'react';
import {mount} from 'enzyme';
import XYPlot from 'plot/xy-plot';
import LineSeries from 'plot/series/line-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import LineChart from '../../../showcase/plot/line-chart';
import LineMarkSeries from '../../../showcase/plot/linemark-chart';
import LineChartManyColors from '../../../showcase/color/line-chart-many-colors';
import NullData from '../../../showcase/misc/null-data-example';
import TimeChart from '../../../showcase/misc/time-chart';
import SyncedCharts from '../../../showcase/misc/synced-charts';

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

describe('LineSeries', () => {
  test('basic rendering', () => {
    const $ = mount(
      <XYPlot width={300} height={300}>
        <LineSeries {...LINE_PROPS} />
      </XYPlot>
    );
    expect($.find('.rv-xy-plot__series').length).toBe(1);
    expect($.find('path.rv-xy-plot__series').length).toBe(1);
    expect($.find('path.line-chart-example').length).toBe(1);

    $.setProps({children: <LineSeries {...{...LINE_PROPS, data: null}} />});
    $.update();

    expect($.find('.rv-xy-plot__series').length).toBe(0);
    expect($.find('.rv-xy-plot__series path').length).toBe(0);
    expect($.find('.line-chart-example').length).toBe(0);
  });

  test('Showcase Example - LineChart', () => {
    const $ = mount(<LineChart />);
    expect($.find('g.alt-x-label').length).toBe(1);

    expect($.find('g.alt-y-label').length).toBe(1);
    expect($.text()).toBe(
      'TOGGLE TO CANVAS1.01.52.02.53.03.54.02468101214X AxisY Axis'
    );
    expect($.find('.rv-xy-plot__series--line').length).toBe(3);

    ['first-series', 'third-series', 'fourth-series'].forEach(
      customClassName => {
        expect(
          $.find(`.rv-xy-plot__series--line.${customClassName}`).length
        ).toBe(1);
      }
    );

    expect($.find('path.second-series').length).toBe(0);

    $.find('button').simulate('click');
    expect($.find('.rv-xy-plot__series--line').length).toBe(0);

    $.find('button').simulate('click');
    expect($.find('.rv-xy-plot__series--line').length).toBe(3);
  });

  test('Showcase Example - LineMarkSeries', () => {
    const $ = mount(<LineMarkSeries />);
    expect($.text()).toBe('1.01.52.02.53.0510152025');
    expect($.find('.rv-xy-plot__series--linemark').length).toBe(2);
    expect($.find('.rv-xy-plot__series circle').length).toBe(6);

    ['linemark-series-example', 'linemark-series-example-2'].forEach(
      customClassName => {
        expect($.find(`MarkSeries.${customClassName}`).length).toBe(1);

        expect($.find(`LineSeries.${customClassName}`).length).toBe(1);
      }
    );
  });

  test('Showcase Example - LineChartManyColors', () => {
    const $ = mount(<LineChartManyColors />);
    const lines = $.find('.rv-xy-plot__series');
    expect(lines.length).toBe(20);
    lines.forEach((node, i) =>
      expect(node.props().style.stroke).toBe(LINE_WITH_MANY_COLORS_COLORS[i])
    );
  });

  test('Showcase Example - TimeChart', () => {
    const $ = mount(<TimeChart />);
    expect($.find('.rv-xy-plot__series--line').length).toBe(2);
    expect($.text()).toBe(
      'Sep 1012 PMMon 1112 PMTue 1212 PMWed 13X Axis2468101214Y Axis'
    );
  });

  test('Showcase Example - SyncedCharts', () => {
    const $ = mount(<SyncedCharts />);
    const tests = () => {
      expect($.find('.rv-xy-plot').length).toBe(2);
      expect($.find('.rv-xy-plot__series--line').length).toBe(4);
      expect($.text()).toBe('1.01.52.02.53.024681012141.01.52.02.53.0246810');
    };
    tests();
    $.find('.rv-xy-plot__series--line')
      .at(0)
      .simulate('mouseEnter');
    tests();
    $.find('.rv-xy-plot')
      .at(0)
      .simulate('mouseLeave');
  });

  test('Line Styling', () => {
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

    const lineStyle = $.find('path.rv-xy-plot__series').prop('style');

    expect(lineStyle.opacity).toBe(0.5);
    expect(lineStyle.strokeWidth).toBe('3px');
    expect(lineStyle.stroke).toBe('rgb(255, 255, 255)');
    expect(lineStyle.strokeDasharray).toBe('3, 1');
  });

  test('getNull prop: Showcase Example - Null Data Example', () => {
    const $ = mount(<NullData />);
    expect($.find('path.rv-xy-plot__series').length).toBe(2);
    expect($.find('.rv-xy-plot__series--mark circle').length).toBe(3);

    simulateMouseMove(35);
    expect($.find('.rv-crosshair__title').text()).toBe('x: 1');
    expect(
      $.find('.rv-crosshair__item')
        .at(0)
        .text()
    ).toBe('0: 10');
    expect(
      $.find('.rv-crosshair__item')
        .at(1)
        .text()
    ).toBe('1: 30');

    $.find('.rv-xy-plot__inner').simulate('mouseleave');
    expect($.find('.rv-crosshair').exists()).toBe(false);

    simulateMouseMove(100);
    expect($.find('.rv-crosshair__title').text()).toBe('x: 2');
    expect(
      $.find('.rv-crosshair__item')
        .at(0)
        .text()
    ).toBe('0: 10');
    expect(
      $.find('.rv-crosshair__item')
        .at(1)
        .text()
    ).toBe('1: 0');

    simulateMouseMove(165);
    expect($.find('.rv-crosshair__title').text()).toBe('x: 3');
    expect(
      $.find('.rv-crosshair__item')
        .at(0)
        .text()
    ).toBe('0: 13');
    expect(
      $.find('.rv-crosshair__item')
        .at(1)
        .exists()
    ).toBe(false);

    simulateMouseMove(230);
    expect($.find('.rv-crosshair__title').text()).toBe('x: 4');
    expect(
      $.find('.rv-crosshair__item')
        .at(0)
        .text()
    ).toBe('0: 7');
    expect(
      $.find('.rv-crosshair__item')
        .at(1)
        .text()
    ).toBe('1: 15');

    simulateMouseMove(295);
    expect($.find('.rv-crosshair').exists()).toBe(false);

    function simulateMouseMove(x) {
      $.find('.rv-xy-plot__inner').simulate('mousemove', {
        nativeEvent: {clientX: x, clientY: 150}
      });
    }
  });
});
