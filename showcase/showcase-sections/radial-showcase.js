import React, {Component} from 'react';

import {mapSection} from '../showcase-components/showcase-utils';
import {showCase} from '../index';
const {
  CustomRadiusRadialChart,
  DonutChartExample,
  SimpleRadialChart
} = showCase;
/* eslint-disable max-len */
const RADIAL = [{
  name: 'Simple Radial Chart',
  component: SimpleRadialChart,
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/radial-chart/index.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/other-charts/radial-chart',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/radial-chart/simple-radial-chart.js'
}, {
  name: 'Simple Donut Chart',
  component: DonutChartExample,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/radial-chart/donut-chart.js'
}, {
  name: 'Custom Radius',
  component: CustomRadiusRadialChart,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/radial-chart/custom-radius-radial-chart.js'
}];
/* eslint-enable max-len */

class RadialShowcase extends Component {
  render() {
    return (
      <article id="radial-charts">
        <h1>Radial Chart</h1>
        {RADIAL.map(mapSection)}
      </article>
    );
  }
}

export default RadialShowcase;
