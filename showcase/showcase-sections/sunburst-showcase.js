import React, {Component} from 'react';

import {showCase} from '../index';
import {mapSection} from '../showcase-components/showcase-utils';
const {
  AnimatedSunburst,
  ArcSeriesExample,
  BasicSunburst,
  ClockExample,
  SunburstWithTooltips
} = showCase;

const SUNBURSTS = [{
  name: 'Arc Series Example',
  component: ArcSeriesExample,
  docsLink: 'http://uber.github.io/react-vis/documentation/series-reference/arc-series',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/arc-series.js',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/radial-chart/arc-series-example.js'
}, {
  name: 'Basic Sunburst',
  component: BasicSunburst,
  docsLink: 'http://uber.github.io/react-vis/documentation/other-charts/sunburst-diagram',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/sunburst/index.js',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/sunbursts/basic-sunburst.js'
}, {
  name: 'Clock',
  component: ClockExample,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/sunbursts/clock-example.js'
}, {
  name: 'Animated Sunburst',
  component: AnimatedSunburst,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/sunbursts/animated-sunburst.js'
}, {
  name: 'Sunburst with tooltips',
  component: SunburstWithTooltips,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/sunbursts/sunburst-with-tooltips.js'
}];

class SunburstSection extends Component {
  render() {
    return (
      <article id="sunbursts">
        <h1>Sunbursts</h1>
        {SUNBURSTS.map(mapSection)}
      </article>
    );
  }
}

export default SunburstSection;
