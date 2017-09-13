import React, {Component} from 'react';

import {mapSection} from '../showcase-components/showcase-utils';
import {showCase} from '../index';
const {
  AnimatedParallelCoordinates,
  BasicParallelCoordinates
} = showCase;

const PARALLEL_COORDINATES = [
  {
    name: 'Basic Parallel Coordinates',
    component: BasicParallelCoordinates,
    sourceLink: 'https://github.com/uber/react-vis/blob/master/src/radar-chart/index.js',
    docsLink: 'http://uber.github.io/react-vis/#/documentation/other-charts/radar-chart'
  }, {
    name: 'Animated Parallel Coordinates',
    component: AnimatedParallelCoordinates
  }];

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
