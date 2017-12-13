import React, {Component} from 'react';
import {mapSection} from '../showcase-components/showcase-utils';
import {showCase} from '../index';
const {
  AnimationExample,
  LabelSeriesExample,
  GradientExample,
  NullDataExample,
  SyncedCharts,
  TimeChart,
  TriangleExample,
  VoronoiLineChart
} = showCase;

const MISC = [{
  name: 'Synced Charts',
  component: SyncedCharts,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/misc/synced-charts.js'
}, {
  name: 'Time Chart',
  component: TimeChart,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/misc/time-chart.js'
}, {
  name: 'Polygon Example',
  component: TriangleExample,
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/polygon-series.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/series-reference/polygon-series',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/misc/triangle-example.js'
}, {
  name: 'Voronoi Line Chart',
  component: VoronoiLineChart,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/misc/voronoi-line-chart.js'
}, {
  name: 'Gradient & Custom Border Example',
  component: GradientExample,
  sourceLink: 'https://github.com/uber/react-vis/blob/master/showcase/misc/gradient-example.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/api-reference/gradients',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/misc/gradient-example.js'
}, {
  name: 'Animation Example',
  component: AnimationExample,
  docsLink: 'http://uber.github.io/react-vis/documentation/general-principles/animation',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/misc/animation-example.js'
}, {
  name: 'Label Series Example',
  component: LabelSeriesExample,
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/label-series.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/series-reference/label-series',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/misc/label-series-example.js'
}, {
  name: 'Null Data Example',
  component: NullDataExample,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/misc/null-data-example.js'
}];

class MiscShowcase extends Component {
  render() {
    return (
      <article id="misc">
        <h2>Miscellaneous</h2>
        {MISC.map(mapSection)}
      </article>
    );
  }
}

export default MiscShowcase;
