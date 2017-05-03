import React, {Component} from 'react';
import {mapSection} from '../showcase-components/showcase-utils';
import {showCase} from '../index';
const {
  AnimationExample,
  LabelSeriesExample,
  GradientExample,
  SyncedCharts,
  TimeChart,
  TriangleExample,
  VoronoiLineChart
} = showCase;

const MISC = [{
  name: 'Synced Charts',
  component: SyncedCharts
}, {
  name: 'Time Chart',
  component: TimeChart
}, {
  name: 'Polygon Example',
  component: TriangleExample,
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/polygon-series.js',
  docsLink: 'http://uber.github.io/react-vis/#/documentation/xy-plot-series/polygon-series'
}, {
  name: 'Voronoi Line Chart',
  component: VoronoiLineChart
}, {
  name: 'Gradient Example',
  component: GradientExample
}, {
  name: 'Animation Example',
  component: AnimationExample,
  docsLink: 'http://uber.github.io/react-vis/#/documentation/overview/animation'
}, {
  name: 'Label Series Example',
  component: LabelSeriesExample,
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/label-series.js',
  docsLink: 'http://uber.github.io/react-vis/#/documentation/xy-plot-series/label-series'
}];

class MiscShowcase extends Component {
  render() {
    return (
      <article>
        <h2>Miscellaneous</h2>
        {MISC.map(mapSection)}
      </article>
    );
  }
}

export default MiscShowcase;
