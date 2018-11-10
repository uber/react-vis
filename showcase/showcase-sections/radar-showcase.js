import React from 'react';

import {mapSection} from '../showcase-components/showcase-utils';
import {showCase} from '../index';
const {
  AnimatedRadarChart,
  BasicRadarChart,
  FourQuadrantRadarChart,
  RadarChartWithTooltips,
  RadarChartSeriesTooltips,
} = showCase;

const RADAR = [{
  name: 'Basic Radar Chart',
  component: BasicRadarChart,
  componentName: 'BasicRadarChart',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/radar-chart/index.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/other-charts/radar-chart'
}, {
  name: 'Animated Radar Chart',
  component: AnimatedRadarChart,
  componentName: 'AnimatedRadarChart'
}, {
  name: 'Four Quadrant Radar Chart',
  component: FourQuadrantRadarChart,
  componentName: 'FourQuadrantRadarChart'
}, {
    name: 'Radar Chart with Tooltips',
    component: RadarChartWithTooltips,
    componentName: 'RadarChartWithTooltips'
}, {
    name: 'Radar Chart with Series Tooltips',
    component: RadarChartSeriesTooltips,
    componentName: 'RadarChartSeriesTooltips'
  }
];

function RadarShowcase(props) {
  return (
    <article id="radar-charts">
      <h1>Radar Chart</h1>
      {RADAR.map(mapSection)}
    </article>
  );
}

export default RadarShowcase;
