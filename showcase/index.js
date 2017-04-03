// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import ComplexChart from './plot/complex-chart';
import LineChart from './plot/line-chart';
import LineMarkChart from './plot/linemark-chart';
import BarChart from './plot/bar-chart';
import StackedVerticalBarChart from './plot/stacked-vertical-bar-chart';
import StackedHorizontalBarChart from './plot/stacked-horizontal-bar-chart';
import ClusteredStackedVerticalBarChart from './plot/clustered-stacked-bar-chart';
import StackedHistogram from './plot/stacked-histogram';
import AreaChart from './plot/area-chart';
import AreaChartElevated from './plot/area-chart-elevated';
import ScatterplotChart from './plot/scatterplot';
import FauxScatterplotChart from './plot/faux-radial-scatterplot';
import HeatmapChart from './plot/heatmap-chart';
import WidthHeightMarginChart from './plot/width-height-margin';
import CustomScales from './plot/custom-scales';
import CustomAxesOrientation from './plot/custom-axes-orientation';
import CustomAxisChart from './plot/custom-axis';
import AxisWithTurnedLabels from './plot/axis-with-turned-labels';
import GridLinesChart from './plot/grid';
import StaticHints from './plot/static-hints';
import DynamicHints from './plot/dynamic-hints';
import DynamicComplexEdgeHints from './plot/dynamic-complex-edge-hints';
import DynamicSimpleEdgeHints from './plot/dynamic-simple-edge-hints';
import DynamicSimpleTopEdgeHints from './plot/dynamic-simple-topedge-hints';
import DynamicProgrammaticRightEdgeHints from './plot/dynamic-programmatic-rightedge-hints';
import StaticCrosshair from './plot/static-crosshair';
import DynamicCrosshair from './plot/dynamic-crosshair';
import DynamicCrosshairScatterplot from './plot/dynamic-crosshair-scatterplot';
import SyncedCharts from './plot/synced-charts';
import TimeChart from './plot/time-chart';
import TriangleExample from './plot/triangle-example';
import VoronoiLineChart from './plot/voronoi-line-chart';

import SimpleTreemap from './treemap/simple-treemap';
import TreemapExample from './treemap/dynamic-treemap';

import SimpleRadialChart from './radial-chart/simple-radial-chart';
import DonutChartExample from './radial-chart/donut-chart';
import CustomRadiusRadialChart from './radial-chart/custom-radius-radial-chart';

import BasicSankeyExample from './sankey/basic';
import VoronoiSankeyExample from './sankey/voronoi';

import VerticalDiscreteColorLegendExample from './legends/vertical-discrete-color';
import HorizontalDiscreteColorLegendExample from './legends/horizontal-discrete-color';
import SearchableDiscreteColorLegendExample from './legends/searchable-discrete-color';
import ContinuousColorLegendExample from './legends/continuous-color';
import ContinuousSizeLegendExample from './legends/continuous-size';

export const showCase = {
  ComplexChart,
  LineChart,
  LineMarkChart,
  BarChart,
  StackedVerticalBarChart,
  StackedHorizontalBarChart,
  ClusteredStackedVerticalBarChart,
  StackedHistogram,
  AreaChart,
  AreaChartElevated,
  FauxScatterplotChart,
  ScatterplotChart,
  HeatmapChart,
  WidthHeightMarginChart,
  CustomScales,
  CustomAxesOrientation,
  CustomAxisChart,
  AxisWithTurnedLabels,
  GridLinesChart,
  StaticHints,
  DynamicHints,
  DynamicComplexEdgeHints,
  DynamicSimpleEdgeHints,
  DynamicSimpleTopEdgeHints,
  DynamicProgrammaticRightEdgeHints,
  StaticCrosshair,
  DynamicCrosshair,
  DynamicCrosshairScatterplot,
  SyncedCharts,
  TimeChart,
  TriangleExample,
  VoronoiLineChart,

  SimpleTreemap,
  TreemapExample,

  SimpleRadialChart,
  DonutChartExample,
  CustomRadiusRadialChart,

  BasicSankeyExample,
  VoronoiSankeyExample,

  VerticalDiscreteColorLegendExample,
  HorizontalDiscreteColorLegendExample,
  SearchableDiscreteColorLegendExample,
  ContinuousColorLegendExample,
  ContinuousSizeLegendExample
};
