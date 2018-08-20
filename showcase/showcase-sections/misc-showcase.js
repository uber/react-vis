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
  VoronoiLineChart,
  VoronoiScatterplot
} = showCase;

const MISC = [{
  name: 'Synced Charts',
  component: SyncedCharts,
  componentName: 'SyncedCharts'
}, {
  name: 'Time Chart',
  component: TimeChart,
  componentName: 'TimeChart'
}, {
  name: 'Polygon Example',
  component: TriangleExample,
  componentName: 'TriangleExample',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/polygon-series.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/series-reference/polygon-series'
}, {
  name: 'Voronoi Line Chart',
  component: VoronoiLineChart,
  componentName: 'VoronoiLineChart'
}, {
  name: 'Voronoi Scatterplot',
  component: VoronoiScatterplot,
  componentName: 'VoronoiScatterplot'
}, {
  name: 'Gradient & Custom Border Example',
  component: GradientExample,
  componentName: 'GradientExample',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/showcase/misc/gradient-example.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/api-reference/gradients'
}, {
  name: 'Animation Example',
  component: AnimationExample,
  componentName: 'AnimationExample',
  docsLink: 'http://uber.github.io/react-vis/documentation/general-principles/animation'
}, {
  name: 'Label Series Example',
  component: LabelSeriesExample,
  componentName: 'LabelSeriesExample',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/label-series.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/series-reference/label-series'
}, {
  name: 'Null Data Example',
  component: NullDataExample,
  componentName: 'NullDataExample'
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
