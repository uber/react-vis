import React, {Component} from 'react';

import {showCase} from '../index';
import {mapSection} from '../showcase-components/showcase-utils';
const {
  AnimatedSunburst,
  ArcSeriesExample,
  BasicSunburst,
  ClockExample
} = showCase;

const SUNBURSTS = [{
  name: 'Arc Series Example',
  component: ArcSeriesExample,
  docsLink: 'http://uber.github.io/react-vis/#/documentation/xy-plot-series/arc-series',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/arc-series.js'
}, {
  name: 'Basic Sunburst',
  component: BasicSunburst,
  docsLink: 'http://uber.github.io/react-vis/#/documentation/other-charts/sunburst-diagram',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/sunburst/index.js'
}, {
  name: 'Clock',
  component: ClockExample
}, {
  name: 'Animated Sunburst',
  component: AnimatedSunburst
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
