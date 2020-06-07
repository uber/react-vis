import React from 'react';
import {mapSection} from '../showcase-components/showcase-utils';
import {showCase} from '../index';
import {SHOWCASE_BASE_URL, REACTVIS_BASE_URL} from '../showcase-links';
const {
  AnimationExample,
  LabelSeriesExample,
  GradientExample,
  NullDataExample,
  SyncedCharts,
  TimeChart,
  TriangleExample,
  VoronoiLineChart,
  ZoomableChartExample,
  SelectionPlotExample,
  DragableChartExample,
  BidirectionDragChart
} = showCase;

const MISC = [
  {
    name: 'Synced Charts',
    component: SyncedCharts,
    componentName: 'SyncedCharts'
  },
  {
    name: 'Time Chart',
    component: TimeChart,
    componentName: 'TimeChart'
  },
  {
    name: 'Polygon Example',
    component: TriangleExample,
    componentName: 'TriangleExample',
    sourceLink: `${REACTVIS_BASE_URL}/src/plot/series/polygon-series.js`,
    docsLink:
      'http://uber.github.io/react-vis/documentation/series-reference/polygon-series'
  },
  {
    name: 'Voronoi Line Chart',
    component: VoronoiLineChart,
    componentName: 'VoronoiLineChart'
  },
  {
    name: 'Gradient & Custom Border Example',
    component: GradientExample,
    componentName: 'GradientExample',
    sourceLink: `${SHOWCASE_BASE_URL}/misc/gradient-example.js`,
    docsLink:
      'http://uber.github.io/react-vis/documentation/api-reference/gradients'
  },
  {
    name: 'Animation Example',
    component: AnimationExample,
    componentName: 'AnimationExample',
    docsLink:
      'http://uber.github.io/react-vis/documentation/series-reference/label-series'
  },
  {
    name: 'Label Series Example',
    component: LabelSeriesExample,
    componentName: 'LabelSeriesExample',
    sourceLink: `${SHOWCASE_BASE_URL}/src/plot/series/label-series.js`,
    docsLink:
      'http://uber.github.io/react-vis/documentation/series-reference/label-series'
  },
  {
    name: 'Null Data Example',
    component: NullDataExample,
    componentName: 'NullDataExample'
  },
  {
    name: 'Zoomable Chart example',
    component: ZoomableChartExample,
    componentName: 'ZoomableChartExample'
  },
  {
    name: 'Selection plot example',
    component: SelectionPlotExample,
    componentName: 'SelectionPlotExample'
  },
  {
    name: 'Dragable Chart Example',
    component: DragableChartExample,
    componentName: 'DragableChartExample'
  },
  {
    name: '2d Dragable Chart',
    component: BidirectionDragChart,
    componentName: 'BidirectionDragChart'
  }
];

function MiscShowcase() {
  return (
    <article id="misc">
      <h2>Miscellaneous</h2>
      {MISC.map(mapSection)}
    </article>
  );
}

export default MiscShowcase;
