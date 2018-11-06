'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ScaleUtils = exports.AxisUtils = exports.FlexibleHeightXYPlot = exports.FlexibleWidthXYPlot = exports.FlexibleXYPlot = exports.makeWidthFlexible = exports.makeVisFlexible = exports.makeHeightFlexible = exports.Sunburst = exports.Sankey = exports.ParallelCoordinates = exports.RadarChart = exports.RadialChart = exports.Treemap = exports.ContinuousSizeLegend = exports.ContinuousColorLegend = exports.SearchableDiscreteColorLegend = exports.DiscreteColorLegend = exports.Highlight = exports.Voronoi = exports.HorizontalGridLines = exports.VerticalGridLines = exports.GradientDefs = exports.GridLines = exports.CircularGridLines = exports.YAxis = exports.XAxis = exports.DecorativeAxis = exports.XYPlot = exports.Crosshair = exports.Borders = exports.Hint = exports.LineMarkSeriesCanvas = exports.LineMarkSeries = exports.ArcSeries = exports.AreaSeries = exports.CustomSVGSeries = exports.ContourSeries = exports.HexbinSeries = exports.HeatmapSeries = exports.WhiskerSeries = exports.MarkSeriesCanvas = exports.MarkSeries = exports.RectSeriesCanvas = exports.RectSeries = exports.PolygonSeries = exports.LabelSeries = exports.HorizontalRectSeriesCanvas = exports.HorizontalRectSeries = exports.VerticalRectSeriesCanvas = exports.VerticalRectSeries = exports.VerticalBarSeriesCanvas = exports.VerticalBarSeries = exports.HorizontalBarSeriesCanvas = exports.HorizontalBarSeries = exports.LineSeriesCanvas = exports.LineSeries = exports.AbstractSeries = undefined;

var _makeVisFlexible = require('./make-vis-flexible');

Object.defineProperty(exports, 'makeHeightFlexible', {
  enumerable: true,
  get: function get() {
    return _makeVisFlexible.makeHeightFlexible;
  }
});
Object.defineProperty(exports, 'makeVisFlexible', {
  enumerable: true,
  get: function get() {
    return _makeVisFlexible.makeVisFlexible;
  }
});
Object.defineProperty(exports, 'makeWidthFlexible', {
  enumerable: true,
  get: function get() {
    return _makeVisFlexible.makeWidthFlexible;
  }
});
Object.defineProperty(exports, 'FlexibleXYPlot', {
  enumerable: true,
  get: function get() {
    return _makeVisFlexible.FlexibleXYPlot;
  }
});
Object.defineProperty(exports, 'FlexibleWidthXYPlot', {
  enumerable: true,
  get: function get() {
    return _makeVisFlexible.FlexibleWidthXYPlot;
  }
});
Object.defineProperty(exports, 'FlexibleHeightXYPlot', {
  enumerable: true,
  get: function get() {
    return _makeVisFlexible.FlexibleHeightXYPlot;
  }
});

var _abstractSeries = require('./plot/series/abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _lineSeries = require('./plot/series/line-series');

var _lineSeries2 = _interopRequireDefault(_lineSeries);

var _lineSeriesCanvas = require('./plot/series/line-series-canvas');

var _lineSeriesCanvas2 = _interopRequireDefault(_lineSeriesCanvas);

var _horizontalBarSeries = require('./plot/series/horizontal-bar-series');

var _horizontalBarSeries2 = _interopRequireDefault(_horizontalBarSeries);

var _horizontalBarSeriesCanvas = require('./plot/series/horizontal-bar-series-canvas');

var _horizontalBarSeriesCanvas2 = _interopRequireDefault(_horizontalBarSeriesCanvas);

var _verticalBarSeries = require('./plot/series/vertical-bar-series');

var _verticalBarSeries2 = _interopRequireDefault(_verticalBarSeries);

var _verticalBarSeriesCanvas = require('./plot/series/vertical-bar-series-canvas');

var _verticalBarSeriesCanvas2 = _interopRequireDefault(_verticalBarSeriesCanvas);

var _verticalRectSeries = require('./plot/series/vertical-rect-series');

var _verticalRectSeries2 = _interopRequireDefault(_verticalRectSeries);

var _verticalRectSeriesCanvas = require('./plot/series/vertical-rect-series-canvas');

var _verticalRectSeriesCanvas2 = _interopRequireDefault(_verticalRectSeriesCanvas);

var _horizontalRectSeries = require('./plot/series/horizontal-rect-series');

var _horizontalRectSeries2 = _interopRequireDefault(_horizontalRectSeries);

var _horizontalRectSeriesCanvas = require('./plot/series/horizontal-rect-series-canvas');

var _horizontalRectSeriesCanvas2 = _interopRequireDefault(_horizontalRectSeriesCanvas);

var _labelSeries = require('./plot/series/label-series');

var _labelSeries2 = _interopRequireDefault(_labelSeries);

var _polygonSeries = require('./plot/series/polygon-series');

var _polygonSeries2 = _interopRequireDefault(_polygonSeries);

var _rectSeries = require('./plot/series/rect-series');

var _rectSeries2 = _interopRequireDefault(_rectSeries);

var _rectSeriesCanvas = require('./plot/series/rect-series-canvas');

var _rectSeriesCanvas2 = _interopRequireDefault(_rectSeriesCanvas);

var _markSeries = require('./plot/series/mark-series');

var _markSeries2 = _interopRequireDefault(_markSeries);

var _markSeriesCanvas = require('./plot/series/mark-series-canvas');

var _markSeriesCanvas2 = _interopRequireDefault(_markSeriesCanvas);

var _whiskerSeries = require('./plot/series/whisker-series');

var _whiskerSeries2 = _interopRequireDefault(_whiskerSeries);

var _heatmapSeries = require('./plot/series/heatmap-series');

var _heatmapSeries2 = _interopRequireDefault(_heatmapSeries);

var _hexbinSeries = require('./plot/series/hexbin-series');

var _hexbinSeries2 = _interopRequireDefault(_hexbinSeries);

var _contourSeries = require('./plot/series/contour-series');

var _contourSeries2 = _interopRequireDefault(_contourSeries);

var _customSvgSeries = require('./plot/series/custom-svg-series');

var _customSvgSeries2 = _interopRequireDefault(_customSvgSeries);

var _areaSeries = require('./plot/series/area-series');

var _areaSeries2 = _interopRequireDefault(_areaSeries);

var _arcSeries = require('./plot/series/arc-series');

var _arcSeries2 = _interopRequireDefault(_arcSeries);

var _lineMarkSeries = require('./plot/series/line-mark-series');

var _lineMarkSeries2 = _interopRequireDefault(_lineMarkSeries);

var _lineMarkSeriesCanvas = require('./plot/series/line-mark-series-canvas');

var _lineMarkSeriesCanvas2 = _interopRequireDefault(_lineMarkSeriesCanvas);

var _hint = require('./plot/hint');

var _hint2 = _interopRequireDefault(_hint);

var _borders = require('./plot/borders');

var _borders2 = _interopRequireDefault(_borders);

var _crosshair = require('./plot/crosshair');

var _crosshair2 = _interopRequireDefault(_crosshair);

var _xyPlot = require('./plot/xy-plot');

var _xyPlot2 = _interopRequireDefault(_xyPlot);

var _decorativeAxis = require('./plot/axis/decorative-axis');

var _decorativeAxis2 = _interopRequireDefault(_decorativeAxis);

var _xAxis = require('./plot/axis/x-axis');

var _xAxis2 = _interopRequireDefault(_xAxis);

var _yAxis = require('./plot/axis/y-axis');

var _yAxis2 = _interopRequireDefault(_yAxis);

var _circularGridLines = require('./plot/circular-grid-lines');

var _circularGridLines2 = _interopRequireDefault(_circularGridLines);

var _gridLines = require('./plot/grid-lines');

var _gridLines2 = _interopRequireDefault(_gridLines);

var _gradientDefs = require('./plot/gradient-defs');

var _gradientDefs2 = _interopRequireDefault(_gradientDefs);

var _verticalGridLines = require('./plot/vertical-grid-lines');

var _verticalGridLines2 = _interopRequireDefault(_verticalGridLines);

var _horizontalGridLines = require('./plot/horizontal-grid-lines');

var _horizontalGridLines2 = _interopRequireDefault(_horizontalGridLines);

var _voronoi = require('./plot/voronoi');

var _voronoi2 = _interopRequireDefault(_voronoi);

var _highlight = require('./plot/highlight');

var _highlight2 = _interopRequireDefault(_highlight);

var _discreteColorLegend = require('./legends/discrete-color-legend');

var _discreteColorLegend2 = _interopRequireDefault(_discreteColorLegend);

var _searchableDiscreteColorLegend = require('./legends/searchable-discrete-color-legend');

var _searchableDiscreteColorLegend2 = _interopRequireDefault(_searchableDiscreteColorLegend);

var _continuousColorLegend = require('./legends/continuous-color-legend');

var _continuousColorLegend2 = _interopRequireDefault(_continuousColorLegend);

var _continuousSizeLegend = require('./legends/continuous-size-legend');

var _continuousSizeLegend2 = _interopRequireDefault(_continuousSizeLegend);

var _treemap = require('./treemap');

var _treemap2 = _interopRequireDefault(_treemap);

var _radialChart = require('./radial-chart');

var _radialChart2 = _interopRequireDefault(_radialChart);

var _radarChart = require('./radar-chart');

var _radarChart2 = _interopRequireDefault(_radarChart);

var _parallelCoordinates = require('./parallel-coordinates');

var _parallelCoordinates2 = _interopRequireDefault(_parallelCoordinates);

var _sankey = require('./sankey');

var _sankey2 = _interopRequireDefault(_sankey);

var _sunburst = require('./sunburst');

var _sunburst2 = _interopRequireDefault(_sunburst);

var _axisUtils = require('./utils/axis-utils');

var _axisUtils2 = _interopRequireDefault(_axisUtils);

var _scalesUtils = require('./utils/scales-utils');

var _scalesUtils2 = _interopRequireDefault(_scalesUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.AbstractSeries = _abstractSeries2.default; // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

exports.LineSeries = _lineSeries2.default;
exports.LineSeriesCanvas = _lineSeriesCanvas2.default;
exports.HorizontalBarSeries = _horizontalBarSeries2.default;
exports.HorizontalBarSeriesCanvas = _horizontalBarSeriesCanvas2.default;
exports.VerticalBarSeries = _verticalBarSeries2.default;
exports.VerticalBarSeriesCanvas = _verticalBarSeriesCanvas2.default;
exports.VerticalRectSeries = _verticalRectSeries2.default;
exports.VerticalRectSeriesCanvas = _verticalRectSeriesCanvas2.default;
exports.HorizontalRectSeries = _horizontalRectSeries2.default;
exports.HorizontalRectSeriesCanvas = _horizontalRectSeriesCanvas2.default;
exports.LabelSeries = _labelSeries2.default;
exports.PolygonSeries = _polygonSeries2.default;
exports.RectSeries = _rectSeries2.default;
exports.RectSeriesCanvas = _rectSeriesCanvas2.default;
exports.MarkSeries = _markSeries2.default;
exports.MarkSeriesCanvas = _markSeriesCanvas2.default;
exports.WhiskerSeries = _whiskerSeries2.default;
exports.HeatmapSeries = _heatmapSeries2.default;
exports.HexbinSeries = _hexbinSeries2.default;
exports.ContourSeries = _contourSeries2.default;
exports.CustomSVGSeries = _customSvgSeries2.default;
exports.AreaSeries = _areaSeries2.default;
exports.ArcSeries = _arcSeries2.default;
exports.LineMarkSeries = _lineMarkSeries2.default;
exports.LineMarkSeriesCanvas = _lineMarkSeriesCanvas2.default;
exports.Hint = _hint2.default;
exports.Borders = _borders2.default;
exports.Crosshair = _crosshair2.default;
exports.XYPlot = _xyPlot2.default;
exports.DecorativeAxis = _decorativeAxis2.default;
exports.XAxis = _xAxis2.default;
exports.YAxis = _yAxis2.default;
exports.CircularGridLines = _circularGridLines2.default;
exports.GridLines = _gridLines2.default;
exports.GradientDefs = _gradientDefs2.default;
exports.VerticalGridLines = _verticalGridLines2.default;
exports.HorizontalGridLines = _horizontalGridLines2.default;
exports.Voronoi = _voronoi2.default;
exports.Highlight = _highlight2.default;
exports.DiscreteColorLegend = _discreteColorLegend2.default;
exports.SearchableDiscreteColorLegend = _searchableDiscreteColorLegend2.default;
exports.ContinuousColorLegend = _continuousColorLegend2.default;
exports.ContinuousSizeLegend = _continuousSizeLegend2.default;
exports.Treemap = _treemap2.default;
exports.RadialChart = _radialChart2.default;
exports.RadarChart = _radarChart2.default;
exports.ParallelCoordinates = _parallelCoordinates2.default;
exports.Sankey = _sankey2.default;
exports.Sunburst = _sunburst2.default;
exports.AxisUtils = _axisUtils2.default;
exports.ScaleUtils = _scalesUtils2.default;