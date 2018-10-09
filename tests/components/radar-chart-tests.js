import test from 'tape';
import React from 'react';
import {mount} from 'enzyme';
import RadialChart from 'radial-chart';
import BasicRadarChart from '../../showcase/radar-chart/basic-radar-chart';
import AnimatedRadarChart from '../../showcase/radar-chart/animated-radar-chart';
import FourQuadrantRadarChart from '../../showcase/radar-chart/four-quadrant-radar-chart';
import RadarChartWithTooltips from '../../showcase/radar-chart/radar-chart-with-tooltips';
import RadarChartSeriesTooltips from '../../showcase/radar-chart/radar-chart-series-tooltips';

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
// make sure that the components render at all
testRenderWithProps(RadialChart, RADAR_PROPS);

test('Radar: Showcase Example - Basic Radar Chart', t => {
  const $ = mount(<BasicRadarChart />);
  t.equal($.find('.rv-radar-chart').length, 1, 'should find a radar chart');
  t.equal(
    $.find('.rv-xy-manipulable-axis__ticks').length,
    6,
    'should find the right number of axes'
  );
  t.equal(
    $.find('.rv-radar-chart-polygon').length,
    3,
    'should find the right number of axes'
  );
  t.equal(
    $.find('.rv-radar-chart').text(),
    '2.004.006.008.0010.0$4.8$7.6$10$13$166.007.008.009.0010.02.004.006.008.0010.01.402.804.205.607.008.406.805.203.602.00mileagepricesafetyperformanceinteriorwarranty',
    'should find the right text content'
  );
  t.equal($.find('.rv-xy-plot__series--custom-svg').length, 0, 'should find the right number of polygon points (0 because onMouseOver is not defined)');
  t.end();
});

test('Radar: Showcase Example - Animated Radial ', t => {
  const $ = mount(<AnimatedRadarChart />);
  t.equal($.find('.rv-radar-chart').length, 1, 'should find a radar chart');
  t.equal(
    $.find('.rv-xy-manipulable-axis__ticks').length,
    5,
    'should find the right number of axes'
  );
  t.equal(
    $.find('.rv-radar-chart-polygon').length,
    1,
    'should find the right number of polygons'
  );
  t.equal(
    $.find('.rv-radar-chart').text(),
    '20406080100niceexplosionswowdogsickMoves',
    'should find the right text content'
  );
  t.equal(
    $.find('.rv-xy-plot__circular-grid-lines__line').length,
    10,
    'should find the correct number of rings'
  );

  $.find('.showcase-button').simulate('click');
  t.equal(
    $.find('.rv-xy-manipulable-axis__ticks').length,
    5,
    'should find the right number of axes'
  );
  t.equal(
    $.find('.rv-radar-chart-polygon').length,
    1,
    'should find the right number of axes'
  );
  t.equal(
    $.find('.rv-radar-chart').text(),
    '20406080100niceexplosionswowdogsickMoves',
    'should find the right text content'
  );
  t.equal($.find('.rv-xy-plot__series--custom-svg').length, 0, 'should find the right number of polygon points (0 because onMouseOver is not defined)');
  t.end();
});

test('Radar: Showcase Example - Four Quadrant Radar Chart', t => {
  const $ = mount(<FourQuadrantRadarChart />);
  t.equals($.find('.rv-radar-chart').length, 1, 'should find a radar chart');
  t.equals(
    $.find('.rv-xy-manipulable-axis__ticks').length,
    4,
    'should find the right number of total axes'
  );
  t.equals(
    $.find('.rv-xy-manipulable-axis__ticks').children().length,
    24,
    'should find the right number of total ticks'
  );
  t.equal(
    $.find('.rv-radar-chart-polygon').length,
    1,
    'should find the right number of polygons'
  );
  t.equal(
    $.find('.rv-radar-chart').text(),
    '20406080100204060801002040608010020406080100CVisualBasicsExcelAccess',
    'should find the right text content'
  );
  t.equal($.find('.rv-xy-plot__series--custom-svg').length, 0, 'should find the right number of polygon points (0 because onMouseOver is not defined)');
  t.end();
});

test('Radar: Showcase Example - Radar Chart with Tooltips', t => {
  const $ = mount(<RadarChartWithTooltips />);
  const chartText = 'mileagepricesafetyperformanceinteriorwarranty1234';
  t.equal($.find('.rv-radar-chart').length, 1, 'should find a radar chart');
  t.equal(
    $.find('.rv-xy-manipulable-axis__ticks').length,
    6,
    'should find the right number of axes'
  );
  t.equal(
    $.find('.rv-radar-chart-polygon').length,
    7,
    'should find the right number of polygons'
  );
  t.equal(
    $.find('.rv-radar-chart-polygonPoint').length,
    7,
    'should find the right number of polygon points'
  );
  t.equal(
    $.find('.rv-radar-chart').text(),
    chartText,
    'should find the right text content'
  );

  // Tooltips
  const tooltipText = 'mileage: 3';
  $.find('.rv-xy-plot__series .rv-xy-plot__series--mark .rv-radar-chart-polygonPoint')
    .at(6)
    .children().at(0)
    .simulate('mouseOver');
  t.equal($.text(), `${chartText}${tooltipText}`, 'should display tooltip text');
  t.end();
});

test('Radar: Showcase Example - series tooltips', t => {
  const $ = mount(<RadarChartSeriesTooltips />);
  const chartText = '2.004.006.008.0010.0$4.8$7.6$10$13$166.007.008.009.0010.02.004.006.008.0010.01.402.804.205.607.008.406.805.203.602.00mileagepricesafetyperformanceinteriorwarranty';
  const hoverText = 'Mercedes';

  t.equal($.find('.rv-radar-chart').length, 1, 'should find a radar chart');
  t.equal(
    $.find('.rv-xy-manipulable-axis__ticks').length,
    6,
    'should find the right number of axes'
  );
  t.equal(
    $.find('.rv-radar-chart-polygon').length,
    3,
    'should find the right number of polygons'
  );
  t.equal(
    $.find('.rv-radar-chart').text(),
    chartText,
    'should find the right text content'
  );
  t.equal(
    $.find('.rv-xy-plot__series--custom-svg').length,
    0,
    'should find the right number of polygon points (0 because onMouseOver is not defined)'
  );
  $.find('.rv-radar-chart-polygon').at(0).simulate('mouseOver');
  t.equal(
    $.find('.rv-radar-chart').text(),
    `${chartText}${hoverText}`,
    'should find hover text for the series mouseOver'
  );
  t.end();
});