// Copyright (c) 2016 Uber Technologies, Inc.
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

export {default as Table} from './lib/table/table';
export {default as Treemap} from './lib/treemap/treemap';

export {default as XYPlot} from './lib/plot/xy-plot';

export {default as LineSeries} from './lib/plot/series/line-series';
export {default as VerticalBarSeries}
  from './lib/plot/series/vertical-bar-series';
export {default as HorizontalBarSeries}
  from './lib/plot/series/horizontal-bar-series';
export {default as MarkSeries} from './lib/plot/series/mark-series';
export {default as HeatmapSeries} from './lib/plot/series/heatmap-series';
export {default as AreaSeries} from './lib/plot/series/area-series';
export {default as LineMarkSeries} from './lib/plot/series/line-mark-series';

export {default as Hint} from './lib/plot/hint';
export {default as Crosshair} from './lib/plot/crosshair';

export {default as XAxis} from './lib/plot/axis/x-axis';
export {default as YAxis} from './lib/plot/axis/y-axis';

export {default as VerticalGridLines} from './lib/plot/vertical-grid-lines';
export {default as HorizontalGridLines} from './lib/plot/horizontal-grid-lines';

export {default as RadialChart} from './lib/radial-chart/radial-chart';

export {default as DiscreteColorLegend}
  from './lib/legends/discrete-color-legend';

export {default as SearchableDiscreteColorLegend}
  from './lib/legends/searchable-discrete-color-legend';

export {default as makeWidthFlexible} from './lib/make-vis-flexible';
