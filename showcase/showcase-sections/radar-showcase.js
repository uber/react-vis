import React, {Component} from 'react';

import {mapSection} from '../showcase-components/showcase-utils';
import {showCase} from '../index';
const {
  AnimatedRadarChart,
  BasicRadarChart
} = showCase;

const RADAR = [{
  name: 'Basic Radar Chart',
  component: BasicRadarChart
}, {
  name: 'Animated Radar Chart',
  component: AnimatedRadarChart
}];

class RadarShowcase extends Component {
  render() {
    return (
      <article id="radar-charts">
        <h1>Radar Chart</h1>
        {RADAR.map(mapSection)}
      </article>
    );
  }
}

export default RadarShowcase;
