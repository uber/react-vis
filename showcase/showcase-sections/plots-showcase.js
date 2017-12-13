import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {showCase} from '../index';
import {mapSection} from '../showcase-components/showcase-utils';
const {
  AreaChart,
  AreaChartElevated,
  BarChart,
  BigBaseBarChart,
  ClusteredStackedVerticalBarChart,
  ContourSeriesExample,
  ComplexChart,
  CustomScales,
  CustomSVGExample,
  CustomSVGAllTheMarks,
  CustomSVGRootLevel,
  FauxScatterplotChart,
  GridLinesChart,
  HeatmapChart,
  Histogram,
  LineChart,
  LineChartManyColors,
  LineChartWithStyle,
  LineChartCanvas,
  LineMarkChart,
  StackedVerticalBarChart,
  StackedHorizontalBarChart,
  StackedHistogram,
  ScatterplotChart,
  ScatterplotCanvas,
  WhiskerChart,
  WidthHeightMarginChart
} = showCase;

const PLOTS = [{
  component: LineChart,
  name: 'Line Series',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/line-series.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/series-reference/line-series',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/line-chart.js'
}, {
  component: LineChartWithStyle,
  name: 'Line Series with style',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/line-series.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/series-reference/line-series',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/line-chart-with-style.js'
},
{
  component: LineMarkChart,
  name: 'LineMark Series',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/line-mark-series.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/series-reference/line-mark-series',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/linemark-chart.js'
}, {
  component: LineChartCanvas,
  name: 'Line Series Canvas',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/line-chart-canvas.js'
}, {
  component: LineChartManyColors,
  name: 'Line Series With Many Colors',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/color/line-chart-many-colors.js'
}, {
  component: ScatterplotChart,
  name: 'Mark Series',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/mark-series.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/series-reference/mark-series',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/line-chart.js'
}, {
  component: ScatterplotCanvas,
  name: 'Mark Series Canvas',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/scatterplot.js'
}, {
  component: WhiskerChart,
  name: 'Whisker Series',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/whisker-series.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/series-reference/whisker-series',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/whisker-chart.js'
}, {
  component: AreaChart,
  name: 'Area Series',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/area-series.js',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/area-chart.js'
}, {
  component: AreaChartElevated,
  name: 'Area Series With vertical offset',
  sourceLink: 'http://uber.github.io/react-vis/documentation/series-reference/area-series',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/area-chart-elevated.js'
}, {
  component: BarChart,
  name: 'Bar Series',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/bar-series.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/series-reference/bar-series',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/line-chart.js'
}, {
  component: BigBaseBarChart,
  name: 'Big Base Bar Series',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/bar-chart.js'
}, {
  name: 'Stacked Horizontal Bar Series',
  component: StackedHorizontalBarChart,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/stacked-horizontal-bar-chart.js'
}, {
  name: 'Stacked Vertical Bar Series',
  component: StackedVerticalBarChart,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/stacked-vertical-bar-chart.js'
}, {
  name: 'Clustered Stacked Vertical Bar Series',
  component: ClusteredStackedVerticalBarChart,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/clustered-stacked-bar-chart.js'
}, {
  name: 'Stacked Vertical Rect Series (histogram)',
  component: StackedHistogram,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/stacked-histogram.js'
}, {
  name: 'Horizontal Rect Series',
  component: Histogram,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/histogram.js'
}, {
  name: 'Heatmap Series',
  component: HeatmapChart,
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/heatmap-series.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/series-reference/heatmap-series',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/heatmap-chart.js'
}, {
  name: 'Contour Series',
  component: ContourSeriesExample,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/contour-series-example.js'
}, {
  name: 'Custom SVG Series',
  component: CustomSVGExample,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/custom-svg-example.js'
}, {
  name: 'Custom SVG - All The Mark',
  component: CustomSVGAllTheMarks,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/custom-svg-all-the-marks.js'
}, {
  name: 'Custom SVG - Root Level Function Definition',
  component: CustomSVGRootLevel,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/custom-svg-root-level.js'
}];

const BASIC_COMPONENTS = [{
  name: 'Custom Size and Margin',
  component: WidthHeightMarginChart,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/width-height-margin.js'
}, {
  name: 'Custom scales',
  component: CustomScales,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/custom-scales.js'
}, {
  name: 'Custom GridLines',
  component: GridLinesChart,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/grid.js'
}, {
  name: 'Circular Gridlines',
  component: FauxScatterplotChart,
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/circular-grid-lines.js',
  docsLink: 'http://uber.github.io/react-vis/documentation/api-reference/grids',
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/faux-radial-scatterplot.js'
}];

class PlotsShowcase extends Component {
  render() {
    const {forExample} = this.props;
    return (
      <article id="plots">
        <h1>Plots</h1>
        {!forExample && (<section>
          <ComplexChart />
        </section>)}
        <h2>Series Types</h2>
        {PLOTS.map(mapSection)}
        <h2>Basic Components</h2>
        {BASIC_COMPONENTS.map(mapSection)}
      </article>
    );
  }
}

PlotsShowcase.propTypes = {
  forExample: PropTypes.bool
};

export default PlotsShowcase;
