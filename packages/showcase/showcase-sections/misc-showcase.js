import React from 'react';
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
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/plot/series/polygon-series.js',
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
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/showcase/misc/gradient-example.js',
    docsLink:
      'http://uber.github.io/react-vis/documentation/api-reference/gradients'
  },
  {
    name: 'Animation Example',
    component: AnimationExample,
    componentName: 'AnimationExample',
    docsLink:
      'http://uber.github.io/react-vis/documentation/general-principles/animation'
  },
  {
    name: 'Label Series Example',
    component: LabelSeriesExample,
    componentName: 'LabelSeriesExample',
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/plot/series/label-series.js',
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

function MiscShowcase(props) {
  return (
    <article id="misc">
      <h2>Miscellaneous</h2>
      {MISC.map(mapSection)}
    </article>
  );
}

export default MiscShowcase;
