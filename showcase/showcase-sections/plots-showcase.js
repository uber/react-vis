import React from 'react';
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
  DifferenceChart,
  EmptyChart,
  FauxScatterplotChart,
  GridLinesChart,
  HeatmapChart,
  HexHeatmap,
  HexbinSizeExample,
  Histogram,
  LabeledHeatmap,
  LineChart,
  LineChartManyColors,
  LineChartWithStyle,
  LineChartCanvas,
  LineSeriesCanvasNearestXYExample,
  LineMarkChart,
  MixedStackedChart,
  StackedVerticalBarChart,
  StackedHorizontalBarChart,
  StackedHistogram,
  ScatterplotChart,
  ScatterplotCanvas,
  WhiskerChart,
  WidthHeightMarginChart
} = showCase;

const PLOTS = [
  {
    component: LineChart,
    componentName: 'LineChart',
    name: 'Line Series',
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/plot/series/line-series.js',
    docsLink:
      'http://uber.github.io/react-vis/documentation/series-reference/line-series'
  },
  {
    component: LineChartWithStyle,
    componentName: 'LineChartWithStyle',
    name: 'Line Series with style',
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/plot/series/line-series.js',
    docsLink:
      'http://uber.github.io/react-vis/documentation/series-reference/line-series'
  },
  {
    component: LineMarkChart,
    componentName: 'LineMarkChart',
    name: 'LineMark Series',
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/plot/series/line-mark-series.js',
    docsLink:
      'http://uber.github.io/react-vis/documentation/series-reference/line-mark-series'
  },
  {
    component: LineChartCanvas,
    componentName: 'LineChartCanvas',
    name: 'Line Chart Canvas'
  },
  {
    component: LineSeriesCanvasNearestXYExample,
    componentName: 'LineSeriesCanvasNearestXYExample',
    name: 'Line Series Canvas'
  },
  {
    component: LineChartManyColors,
    componentName: 'LineChartManyColors',
    name: 'Line Series With Many Colors'
  },
  {
    component: ScatterplotChart,
    componentName: 'ScatterplotChart',
    name: 'Mark Series',
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/plot/series/mark-series.js',
    docsLink:
      'http://uber.github.io/react-vis/documentation/series-reference/mark-series'
  },
  {
    component: ScatterplotCanvas,
    componentName: 'ScatterplotCanvas',
    name: 'Mark Series Canvas'
  },
  {
    component: WhiskerChart,
    componentName: 'WhiskerChart',
    name: 'Whisker Series',
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/plot/series/whisker-series.js',
    docsLink:
      'http://uber.github.io/react-vis/documentation/series-reference/whisker-series'
  },
  {
    component: AreaChart,
    componentName: 'AreaChart',
    name: 'Area Series',
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/plot/series/area-series.js'
  },
  {
    component: AreaChartElevated,
    componentName: 'AreaChartElevated',
    name: 'Area Series With vertical offset',
    sourceLink:
      'http://uber.github.io/react-vis/documentation/series-reference/area-series'
  },
  {
    component: BarChart,
    componentName: 'BarChart',
    name: 'Bar Series',
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/plot/series/bar-series.js',
    docsLink:
      'http://uber.github.io/react-vis/documentation/series-reference/bar-series'
  },
  {
    component: BigBaseBarChart,
    componentName: 'BigBaseBarChart',
    name: 'Big Base Bar Series'
  },
  {
    component: DifferenceChart,
    componentName: 'DifferenceChart',
    name: 'Difference Bar Series'
  },
  {
    name: 'Stacked Horizontal Bar Series',
    component: StackedHorizontalBarChart,
    componentName: 'StackedHorizontalBarChart'
  },
  {
    name: 'Stacked Vertical Bar Series',
    component: StackedVerticalBarChart,
    componentName: 'StackedVerticalBarChart'
  },
  {
    name: 'Mixed Stacked Series',
    component: MixedStackedChart
  },
  {
    name: 'Clustered Stacked Vertical Bar Series',
    component: ClusteredStackedVerticalBarChart,
    componentName: 'ClusteredStackedVerticalBarChart'
  },
  {
    name: 'Stacked Vertical Rect Series (histogram)',
    component: StackedHistogram,
    componentName: 'StackedHistogram'
  },
  {
    name: 'Horizontal Rect Series',
    component: Histogram,
    componentName: 'Histogram'
  },
  {
    name: 'Heatmap Series',
    component: HeatmapChart,
    componentName: 'HeatmapChart',
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/plot/series/heatmap-series.js',
    docsLink:
      'http://uber.github.io/react-vis/documentation/series-reference/heatmap-series'
  },
  {
    name: 'Hexbin Series',
    component: HexHeatmap,
    componentName: 'HexHeatmap',
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/plot/series/hexbin-series.js',
    docsLink:
      'http://uber.github.io/react-vis/documentation/series-reference/hexbin-series'
  },
  {
    name: 'Hexbin Size',
    component: HexbinSizeExample,
    componentName: 'HexbinSizeExample'
  },
  {
    name: 'Labeled Heatmap',
    component: LabeledHeatmap,
    componentName: 'LabeledHeatmap',
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/plot/series/heatmap-series.js'
  },
  {
    name: 'Contour Series',
    component: ContourSeriesExample,
    componentName: 'ContourSeriesExample'
  },
  {
    name: 'Custom SVG Series',
    component: CustomSVGExample,
    componentName: 'CustomSVGExample'
  },
  {
    name: 'Custom SVG - All The Marks (with tooltips)',
    component: CustomSVGAllTheMarks,
    componentName: 'CustomSVGAllTheMarks'
  },
  {
    name: 'Custom SVG - Root Level Function Definition',
    component: CustomSVGRootLevel,
    componentName: 'CustomSVGRootLevel'
  }
];

const BASIC_COMPONENTS = [
  {
    name: 'Custom Size and Margin',
    component: WidthHeightMarginChart,
    componentName: 'WidthHeightMarginChart'
  },
  {
    name: 'Custom scales',
    component: CustomScales,
    componentName: 'CustomScales'
  },
  {
    name: 'Empty Chart',
    component: EmptyChart,
    componentName: 'EmptyChart'
  },
  {
    name: 'Custom GridLines',
    component: GridLinesChart,
    componentName: 'GridLinesChart'
  },
  {
    name: 'Circular Gridlines',
    component: FauxScatterplotChart,
    componentName: 'FauxScatterplotChart',
    sourceLink:
      'https://github.com/uber/react-vis/blob/master/src/plot/circular-grid-lines.js',
    docsLink:
      'http://uber.github.io/react-vis/documentation/api-reference/grids'
  }
];

function PlotsShowcase(props) {
  const {forExample} = props;
  return (
    <article id="plots">
      <h1>Plots</h1>
      {!forExample && (
        <section>
          <ComplexChart />
        </section>
      )}
      <h2>Series Types</h2>
      {PLOTS.map(mapSection)}
      <h2>Basic Components</h2>
      {BASIC_COMPONENTS.map(mapSection)}
    </article>
  );
}

PlotsShowcase.propTypes = {
  forExample: PropTypes.bool
};

export default PlotsShowcase;
