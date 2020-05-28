import React from 'react';
import {mount} from 'enzyme';
import RadialChart from 'radial-chart';
import BasicRadarChart from '../../../showcase/radar-chart/basic-radar-chart';
import AnimatedRadarChart from '../../../showcase/radar-chart/animated-radar-chart';
import FourQuadrantRadarChart from '../../../showcase/radar-chart/four-quadrant-radar-chart';
import RadarChartWithTooltips from '../../../showcase/radar-chart/radar-chart-with-tooltips';
import RadarChartSeriesTooltips from '../../../showcase/radar-chart/radar-chart-series-tooltips';

import {testRenderWithProps} from '../test-utils';

const RADAR_PROPS = {
  data: [
    {
      explosions: 7,
      wow: 10,
      dog: 8,
      sickMoves: 9,
      nice: 7
    }
  ],
  domains: [
    {name: 'nice', domain: [0, 100]},
    {name: 'explosions', domain: [6.9, 7.1]},
    {name: 'wow', domain: [0, 11]},
    {name: 'dog', domain: [0, 16]},
    {name: 'sickMoves', domain: [0, 20]}
  ],
  height: 300,
  width: 400
};

describe('Radar', () => {
  // make sure that the components render at all
  testRenderWithProps(RadialChart, RADAR_PROPS);

  test('Radar: Showcase Example - Basic Radar Chart', () => {
    const $ = mount(<BasicRadarChart />);
    expect($.find('div.rv-radar-chart').length).toBe(1);
    expect($.find('.rv-xy-manipulable-axis__ticks').length).toBe(6);
    expect($.find('path.rv-radar-chart-polygon').length).toBe(3);
    expect($.find('div.rv-radar-chart').text()).toBe(
      '2.004.006.008.0010.0$4.8$7.6$10$13$166.007.008.009.0010.02.004.006.008.0010.01.402.804.205.607.008.406.805.203.602.00mileagepricesafetyperformanceinteriorwarranty'
    );
    expect($.find('.rv-xy-plot__series--custom-svg').length).toBe(0);
  });

  test('Radar: Showcase Example - Animated Radial ', () => {
    const $ = mount(<AnimatedRadarChart />);
    expect($.find('div.rv-radar-chart').length).toBe(1);
    expect($.find('.rv-xy-manipulable-axis__ticks').length).toBe(5);
    expect($.find('path.rv-radar-chart-polygon').length).toBe(1);
    // Floating point
    // t.equal(
    //   $.find('div.rv-radar-chart').text(),
    //   '20406080100niceexplosionswowdogsickMoves',
    //   'should find the right text content'
    // );
    expect($.find('.rv-xy-plot__circular-grid-lines__line').length).toBe(10);

    $.find('.showcase-button').simulate('click');
    expect($.find('.rv-xy-manipulable-axis__ticks').length).toBe(5);

    expect($.find('path.rv-radar-chart-polygon').length).toBe(1);
    // Floating Point
    // t.equal(
    //   $.find('div.rv-radar-chart').text(),
    //   '20406080100niceexplosionswowdogsickMoves',
    //   'should find the right text content'
    // );
    expect($.find('.rv-xy-plot__series--custom-svg').length).toBe(0);
  });

  test('Radar: Showcase Example - Four Quadrant Radar Chart', () => {
    const $ = mount(<FourQuadrantRadarChart />);
    expect($.find('div.rv-radar-chart').length).toBe(1);
    expect($.find('.rv-xy-manipulable-axis__ticks').length).toBe(4);
    expect($.find('.rv-xy-manipulable-axis__ticks').children().length).toBe(24);
    expect($.find('path.rv-radar-chart-polygon').length).toBe(1);
    expect($.find('div.rv-radar-chart').text()).toBe(
      '20406080100204060801002040608010020406080100CVisualBasicsExcelAccess'
    );
    expect($.find('.rv-xy-plot__series--custom-svg').length).toBe(0);
  });

  test('Radar: Showcase Example - Radar Chart with Tooltips', () => {
    const $ = mount(<RadarChartWithTooltips />);
    const chartText = 'mileagepricesafetyperformanceinteriorwarranty1234';
    expect($.find('div.rv-radar-chart').length).toBe(1);
    expect($.find('.rv-xy-manipulable-axis__ticks').length).toBe(6);
    expect($.find('path.rv-radar-chart-polygon').length).toBe(7);
    expect($.find('g.rv-radar-chart-polygonPoint').length).toBe(7);
    expect($.find('div.rv-radar-chart').text()).toBe(chartText);

    // Tooltips
    const tooltipText = 'mileage: 3';
    $.find('g.rv-radar-chart-polygonPoint')
      .at(6)
      .children()
      .at(0)
      .simulate('mouseOver');
    expect($.text()).toBe(`${chartText}${tooltipText}`);
  });

  test('Radar: Showcase Example - series tooltips', () => {
    const $ = mount(<RadarChartSeriesTooltips />);
    const chartText =
      '2.004.006.008.0010.0$4.8$7.6$10$13$166.007.008.009.0010.02.004.006.008.0010.01.402.804.205.607.008.406.805.203.602.00mileagepricesafetyperformanceinteriorwarranty';
    const hoverText = 'Mercedes';

    expect($.find('div.rv-radar-chart').length).toBe(1);
    expect($.find('.rv-xy-manipulable-axis__ticks').length).toBe(6);
    expect($.find('path.rv-radar-chart-polygon').length).toBe(3);
    expect($.find('div.rv-radar-chart').text()).toBe(chartText);
    expect($.find('.rv-xy-plot__series--custom-svg').length).toBe(0);
    $.find('.rv-radar-chart-polygon')
      .at(0)
      .simulate('mouseOver');
    expect($.find('div.rv-radar-chart').text()).toBe(
      `${chartText}${hoverText}`
    );
  });
});
