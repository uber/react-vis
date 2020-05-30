import React from 'react';

import {mapSection} from '../showcase-components/showcase-utils';
import {REACTVIS_BASE_URL} from '../showcase-links';
import {showCase} from '../index';
const {
  CustomRadiusRadialChart,
  DonutChartExample,
  SimpleRadialChart,
  GradientPie
} = showCase;
/* eslint-disable max-len */
const RADIAL = [
  {
    name: 'Simple Radial Chart',
    component: SimpleRadialChart,
    componentName: SimpleRadialChart,
    sourceLink: `${REACTVIS_BASE_URL}/radial-chart/index.js`,
    docsLink:
      'http://uber.github.io/react-vis/documentation/other-charts/radial-chart'
  },
  {
    name: 'Simple Donut Chart',
    component: DonutChartExample,
    componentName: DonutChartExample
  },
  {
    name: 'Custom Radius',
    component: CustomRadiusRadialChart,
    componentName: CustomRadiusRadialChart
  },
  {
    name: 'Gradient Pie',
    component: GradientPie,
    componentName: GradientPie
  }
];

function RadialShowcase() {
  return (
    <article id="radial-charts">
      <h1>Radial Chart</h1>
      {RADIAL.map(mapSection)}
    </article>
  );
}

export default RadialShowcase;
