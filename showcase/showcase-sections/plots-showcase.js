import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {showCase} from '../index';
import {mapSection} from '../showcase-components/showcase-utils';
const {
  AreaChart,
  AreaChartElevated,
  BarChart,
  ClusteredStackedVerticalBarChart,
  ContourSeriesExample,
  ComplexChart,
  CustomScales,
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
  WidthHeightMarginChart
} = showCase;

const PLOTS = [{
  component: LineChart,
  name: 'Line Series',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/line-series.js',
  docsLink: 'http://uber.github.io/react-vis/#/documentation/xy-plot-series/line-series'
}, {
  component: LineChartWithStyle,
  name: 'Line Series with style',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/line-series.js',
  docsLink: 'http://uber.github.io/react-vis/#/documentation/xy-plot-series/line-series'
},
{
  component: LineMarkChart,
  name: 'LineMark Series',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/line-mark-series.js',
  docsLink: 'http://uber.github.io/react-vis/#/documentation/xy-plot-series/line-series'
}, {
  component: LineChartCanvas,
  name: 'Line Series Canvas'
}, {
  component: LineChartManyColors,
  name: 'Line Series With Many Colors'
}, {
  component: ScatterplotChart,
  name: 'Mark Series',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/mark-series.js',
  docsLink: 'http://uber.github.io/react-vis/#/documentation/xy-plot-series/mark-series'
}, {
  component: ScatterplotCanvas,
  name: 'Mark Series Canvas'
}, {
  component: AreaChart,
  name: 'Area Series',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/area-series.js'
}, {
  component: AreaChartElevated,
  name: 'Area Series With vertical offset',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/area-series.js'
}, {
  component: BarChart,
  name: 'Bar Series',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/bar-series.js',
  docsLink: 'http://uber.github.io/react-vis/#/documentation/xy-plot-series/bar-series'
}, {
  name: 'Stacked Horizontal Bar Series',
  component: StackedHorizontalBarChart
}, {
  name: 'Stacked Vertical Bar Series',
  component: StackedVerticalBarChart
}, {
  name: 'Clustered Stacked Vertical Bar Series',
  component: ClusteredStackedVerticalBarChart
}, {
  name: 'Stacked Vertical Rect Series (histogram)',
  component: StackedHistogram
}, {
  name: 'Horizontal Rect Series',
  component: Histogram
}, {
  name: 'Heatmap Series',
  component: HeatmapChart,
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/series/heatmap-series.js',
  docsLink: 'http://uber.github.io/react-vis/#/documentation/xy-plot-series/heatmap-series'
}, {
  name: 'Contour Series',
  component: ContourSeriesExample
}];

const BASIC_COMPONENTS = [{
  name: 'Custom Size and Margin',
  component: WidthHeightMarginChart
}, {
  name: 'Custom scales',
  component: CustomScales
}, {
  name: 'Custom GridLines',
  component: GridLinesChart
}, {
  name: 'Circular Gridlines',
  component: FauxScatterplotChart,
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/plot/circular-grid-lines.js',
  docsLink: 'http://uber.github.io/react-vis/#/documentation/xy-plot/grids'
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
