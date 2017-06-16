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
import LineChartCanvas from './plot/line-chart-canvas';
import LineChartWithStyle from './plot/line-chart-with-style';
import LineMarkChart from './plot/linemark-chart';
import BarChart from './plot/bar-chart';
import StackedVerticalBarChart from './plot/stacked-vertical-bar-chart';
import StackedHorizontalBarChart from './plot/stacked-horizontal-bar-chart';
import ClusteredStackedVerticalBarChart from './plot/clustered-stacked-bar-chart';
import StackedHistogram from './plot/stacked-histogram';
import Histogram from './plot/histogram';
import AreaChart from './plot/area-chart';
import AreaChartElevated from './plot/area-chart-elevated';
import ScatterplotChart from './plot/scatterplot';
import FauxScatterplotChart from './plot/faux-radial-scatterplot';
import ScatterplotCanvas from './plot/scatterplot-canvas';
import HeatmapChart from './plot/heatmap-chart';
import WidthHeightMarginChart from './plot/width-height-margin';
import CustomScales from './plot/custom-scales';
import AxisWithTurnedLabels from './plot/axis-with-turned-labels';
import GridLinesChart from './plot/grid';

import CustomAxesOrientation from './axes/custom-axes-orientation';
import CustomAxisChart from './axes/custom-axis';
import CustomAxes from './axes/custom-axes';
import DecorativeAxisCrissCross from './axes/decorative-axes-criss-cross';
import StaticHints from './axes/static-hints';
import DynamicHints from './axes/dynamic-hints';
import DynamicComplexEdgeHints from './axes/dynamic-complex-edge-hints';
import DynamicSimpleEdgeHints from './axes/dynamic-simple-edge-hints';
import DynamicSimpleTopEdgeHints from './axes/dynamic-simple-topedge-hints';
import DynamicProgrammaticRightEdgeHints from './axes/dynamic-programmatic-rightedge-hints';
import DynamicCrosshair from './axes/dynamic-crosshair';
import DynamicCrosshairScatterplot from './axes/dynamic-crosshair-scatterplot';
import PaddedAxis from './axes/padded-axis';
import ParallelCoordinatesExample from './axes/parallel-coordinates-example';
import StaticCrosshair from './axes/static-crosshair';

import VerticalDiscreteColorLegendExample from './legends/vertical-discrete-color';
import HorizontalDiscreteColorLegendExample from './legends/horizontal-discrete-color';
import SearchableDiscreteColorLegendExample from './legends/searchable-discrete-color';
import ContinuousColorLegendExample from './legends/continuous-color';
import ContinuousSizeLegendExample from './legends/continuous-size';
import HorizontalDiscreteCustomPalette from './legends/horizontal-discrete-custom-palette';

import AnimationExample from './misc/animation-example';
import LabelSeriesExample from './misc/label-series-example';
import GradientExample from './misc/gradient-example';
import SyncedCharts from './misc/synced-charts';
import TimeChart from './misc/time-chart';
import TriangleExample from './misc/triangle-example';
import VoronoiLineChart from './misc/voronoi-line-chart';

import SimpleRadialChart from './radial-chart/simple-radial-chart';
import DonutChartExample from './radial-chart/donut-chart';
import CustomRadiusRadialChart from './radial-chart/custom-radius-radial-chart';
import ArcSeriesExample from './radial-chart/arc-series-example';

import BasicRadarChart from './radar-chart/basic-radar-chart';
import AnimatedRadarChart from './radar-chart/animated-radar-chart';

import BasicSunburst from './sunbursts/basic-sunburst';
import ClockExample from './sunbursts/clock-example';
import AnimatedSunburst from './sunbursts/animated-sunburst';

import BasicSankeyExample from './sankey/basic';
import VoronoiSankeyExample from './sankey/voronoi';

import SimpleTreemap from './treemap/simple-treemap';
import TreemapExample from './treemap/dynamic-treemap';

export const showCase = {
  ComplexChart,
  LineChart,
  LineChartCanvas,
  LineChartWithStyle,
  LineMarkChart,
  BarChart,
  StackedVerticalBarChart,
  StackedHorizontalBarChart,
  ClusteredStackedVerticalBarChart,
  StackedHistogram,
  Histogram,
  AnimationExample,
  AreaChart,
  AreaChartElevated,
  FauxScatterplotChart,
  ScatterplotChart,
  ScatterplotCanvas,
  HeatmapChart,
  WidthHeightMarginChart,
  CustomScales,
  CustomAxesOrientation,
  CustomAxisChart,
  AxisWithTurnedLabels,
  GridLinesChart,
  StaticHints,
  DecorativeAxisCrissCross,
  DynamicHints,
  DynamicComplexEdgeHints,
  DynamicSimpleEdgeHints,
  DynamicSimpleTopEdgeHints,
  DynamicProgrammaticRightEdgeHints,
  StaticCrosshair,
  DynamicCrosshair,
  DynamicCrosshairScatterplot,
  PaddedAxis,
  ParallelCoordinatesExample,
  SyncedCharts,
  TimeChart,
  TriangleExample,
  VoronoiLineChart,
  CustomAxes,
  LabelSeriesExample,
  GradientExample,

  SimpleTreemap,
  TreemapExample,

  BasicSunburst,
  ClockExample,
  AnimatedSunburst,

  SimpleRadialChart,
  DonutChartExample,
  CustomRadiusRadialChart,
  ArcSeriesExample,

  AnimatedRadarChart,
  BasicRadarChart,

  BasicSankeyExample,
  VoronoiSankeyExample,

  VerticalDiscreteColorLegendExample,
  HorizontalDiscreteColorLegendExample,
  HorizontalDiscreteCustomPalette,
  SearchableDiscreteColorLegendExample,
  ContinuousColorLegendExample,
  ContinuousSizeLegendExample
};
