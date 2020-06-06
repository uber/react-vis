import React from 'react';
import {mount} from 'enzyme';
import XYPlot from '~/plot/xy-plot';
import HorizontalBarSeries from '~/plot/series/horizontal-bar-series';
import VerticalBarSeries from '~/plot/series/vertical-bar-series';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';
import StackedHorizontalBarChart from '../../../showcase/plot/stacked-horizontal-bar-chart';
import StackedVerticalBarChart from '../../../showcase/plot/stacked-vertical-bar-chart';
import BarChart from '../../../showcase/plot/bar-chart';
import BigBaseBarChart from '../../../showcase/plot/big-base-bar-chart';
import ClusteredStackedVerticalBarChart from '../../../showcase/plot/clustered-stacked-bar-chart';
import DifferenceChart from '../../../showcase/plot/difference-chart';

describe('BarSeries', () => {
  testRenderWithProps(HorizontalBarSeries, GENERIC_XYPLOT_SERIES_PROPS);

  testRenderWithProps(VerticalBarSeries, GENERIC_XYPLOT_SERIES_PROPS);

  test('Showcase Example - BarChart', () => {
    const $ = mount(<BarChart />);
    expect($.text()).toBe('TOGGLE TO CANVASABC02468101214ABC');
    expect($.find('.rv-xy-plot__series--bar rect').length).toBe(6);
    expect($.find('g.vertical-bar-series-example').length).toBe(1);

    $.find('.showcase-button').simulate('click');
    expect($.find('rect.rv-xy-plot__series--bar').length).toBe(0);
    expect($.find('.rv-xy-canvas canvas').length).toBe(1);
  });

  test('Showcase Example - StackedHorizontalBarChart & StackedVerticalBarChart', () => {
    [StackedHorizontalBarChart, StackedVerticalBarChart].forEach(
      (Component, i) => {
        const $ = mount(<Component />);
        const textContent = ['0510152025', '12345'];
        const expectedContent = `TOGGLE TO CANVAS${(i === 1
          ? textContent.reverse()
          : textContent
        ).join('')}`;
        expect($.text()).toBe(expectedContent);
        expect($.find('.rv-xy-plot__series--bar rect').length).toBe(6);
        $.find('.showcase-button').simulate('click');
        expect($.find('.rv-xy-plot__series--bar rect').length).toBe(0);
        expect($.find('.rv-xy-canvas canvas').length).toBe(1);
      }
    );
  });

  test('Ordinal Y-Axis HorizontalBarSeries', () => {
    const $ = mount(
      <XYPlot width={300} height={300} yType="ordinal">
        <HorizontalBarSeries
          data={[
            {y: 'a', x: 10},
            {y: 'b', x: 5},
            {y: 'c', x: 15}
          ]}
        />
      </XYPlot>
    );
    expect($.find('.rv-xy-plot__series--bar rect').length).toBe(3);
    expect(
      $.find('.rv-xy-plot__series--bar rect')
        .at(0)
        .prop('height') > 0
    ).toBe(true);
  });

  test('No data', () => {
    const $ = mount(
      <XYPlot width={300} height={300} yType="ordinal">
        <HorizontalBarSeries data={null} />
      </XYPlot>
    );
    expect($.find('.rv-xy-plot__series--bar rect').length).toBe(0);
  });

  test('Showcase Example - ClusteredStackedVerticalBarChart', () => {
    const $ = mount(<ClusteredStackedVerticalBarChart />);
    expect($.text()).toBe('TOGGLE TO CANVASQ1Q2Q3Q40102030ApplesOranges');
    expect($.find('.rv-xy-plot__series--bar rect').length).toBe(16);
    expect($.find('.rv-xy-plot__series').length).toBe(4);

    $.find('.showcase-button').simulate('click');
    expect($.find('.rv-xy-plot__series--bar rect').length).toBe(0);
    expect($.find('.rv-xy-canvas canvas').length).toBe(1);
  });

  test('Showcase Example - BigBaseBarChart', () => {
    const $ = mount(<BigBaseBarChart />);
    expect($.text()).toBe(
      'TOGGLE TO CANVAS:38:39:40:41199,800199,900200,000200,100200,200200,300200,400'
    );
    expect($.find('.rv-xy-plot__series--bar rect').length).toBe(15);
    expect($.find('.rv-xy-plot__series').length).toBe(1);

    $.find('.showcase-button').simulate('click');
    expect($.find('.rv-xy-plot__series--bar rect').length).toBe(0);
    expect($.find('.rv-xy-canvas canvas').length).toBe(1);
  });

  test('Showcase Example - DifferenceChart', () => {
    const $ = mount(<DifferenceChart />);
    expect($.text()).toBe('TOGGLE TO CANVAS02468101214-4-20246810');
    expect($.find('.rv-xy-plot__series--bar rect').length).toBe(15);
    expect($.find('.rv-xy-plot__series').length).toBe(1);

    $.find('.showcase-button').simulate('click');
    expect($.find('.rv-xy-plot__series--bar rect').length).toBe(0);
    expect($.find('.rv-xy-canvas canvas').length).toBe(1);
  });
});
