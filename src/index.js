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

export {default as AbstractSeries} from 'plot/series/abstract-series';
export {default as LineSeries} from 'plot/series/line-series';
export {default as LineSeriesCanvas} from 'plot/series/line-series-canvas';
export {
  default as HorizontalBarSeries
} from 'plot/series/horizontal-bar-series';
export {
  default as HorizontalBarSeriesCanvas
} from 'plot/series/horizontal-bar-series-canvas';
export {default as VerticalBarSeries} from 'plot/series/vertical-bar-series';
export {
  default as VerticalBarSeriesCanvas
} from 'plot/series/vertical-bar-series-canvas';
export {default as VerticalRectSeries} from 'plot/series/vertical-rect-series';
export {
  default as VerticalRectSeriesCanvas
} from 'plot/series/vertical-rect-series-canvas';
export {
  default as HorizontalRectSeries
} from 'plot/series/horizontal-rect-series';
export {
  default as HorizontalRectSeriesCanvas
} from 'plot/series/horizontal-rect-series-canvas';
export {default as LabelSeries} from 'plot/series/label-series';
export {default as PolygonSeries} from 'plot/series/polygon-series';
export {default as RectSeries} from 'plot/series/rect-series';
export {default as RectSeriesCanvas} from 'plot/series/rect-series-canvas';
export {default as MarkSeries} from 'plot/series/mark-series';
export {default as MarkSeriesCanvas} from 'plot/series/mark-series-canvas';
export {default as WhiskerSeries} from 'plot/series/whisker-series';
export {default as HeatmapSeries} from 'plot/series/heatmap-series';
export {default as HexbinSeries} from 'plot/series/hexbin-series';
export {default as ContourSeries} from 'plot/series/contour-series';
export {default as CustomSVGSeries} from 'plot/series/custom-svg-series';
export {default as AreaSeries} from 'plot/series/area-series';
export {default as ArcSeries} from 'plot/series/arc-series';
export {default as LineMarkSeries} from 'plot/series/line-mark-series';
export {
  default as LineMarkSeriesCanvas
} from 'plot/series/line-mark-series-canvas';
export {default as Hint} from 'plot/hint';
export {default as Borders} from 'plot/borders';
export {default as Crosshair} from 'plot/crosshair';
export {default as XYPlot} from 'plot/xy-plot';
export {default as DecorativeAxis} from 'plot/axis/decorative-axis';
export {default as XAxis} from 'plot/axis/x-axis';
export {default as YAxis} from 'plot/axis/y-axis';
export {default as CircularGridLines} from 'plot/circular-grid-lines';
export {default as GridLines} from 'plot/grid-lines';
export {default as GradientDefs} from 'plot/gradient-defs';
export {default as VerticalGridLines} from 'plot/vertical-grid-lines';
export {default as HorizontalGridLines} from 'plot/horizontal-grid-lines';
export {default as Voronoi} from 'plot/voronoi';
export {default as Highlight} from 'plot/highlight';

export {default as DiscreteColorLegend} from 'legends/discrete-color-legend';
export {
  default as SearchableDiscreteColorLegend
} from 'legends/searchable-discrete-color-legend';
export {
  default as ContinuousColorLegend
} from 'legends/continuous-color-legend';
export {default as ContinuousSizeLegend} from 'legends/continuous-size-legend';

export {default as Treemap} from 'treemap';
export {default as RadialChart} from 'radial-chart';
export {default as RadarChart} from 'radar-chart';
export {default as ParallelCoordinates} from 'parallel-coordinates';
export {default as Sankey} from 'sankey';
export {default as Sunburst} from 'sunburst';

export {
  makeHeightFlexible,
  makeVisFlexible,
  makeWidthFlexible,
  FlexibleXYPlot,
  FlexibleWidthXYPlot,
  FlexibleHeightXYPlot
} from './make-vis-flexible';

export {default as AxisUtils} from 'utils/axis-utils';
export {default as ScaleUtils} from 'utils/scales-utils';
