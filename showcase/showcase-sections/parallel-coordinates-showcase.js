import React, {Component} from 'react';

import {mapSection} from '../showcase-components/showcase-utils';
import {showCase} from '../index';
const {
  AnimatedParallelCoordinates,
  BasicParallelCoordinates
} = showCase;

/* eslint-disable max-len */
const PARALLEL_COORDINATES = [{
  name: 'Basic Parallel Coordinates',
  component: BasicParallelCoordinates,
  componentName: 'BasicParallelCoordinates',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/radar-chart/index.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/other-charts/radar-chart'
}, {
  name: 'Animated Parallel Coordinates',
  component: AnimatedParallelCoordinates,
  componentName: 'AnimatedParallelCoordinates'
}];
/* eslint-enable max-len */

class ParallelCoordinatesShowcase extends Component {
  render() {
    return (
      <article id="parallel-coordinates">
        <h1>Parallel Coordinates</h1>
        {PARALLEL_COORDINATES.map(mapSection)}
      </article>
    );
  }
}

export default ParallelCoordinatesShowcase;
