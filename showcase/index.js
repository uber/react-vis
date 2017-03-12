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

import React from 'react';
import ReactDOM from 'react-dom';
import document from 'global/document';

import ComplexChart from './plot/complex-chart';
import LineChart from './plot/line-chart';
import LineMarkChart from './plot/linemark-chart';
import BarChart from './plot/bar-chart';
import StackedVerticalBarChart from './plot/stacked-vertical-bar-chart';
import StackedHorizontalBarChart from './plot/stacked-horizontal-bar-chart';
import StackedHistogram from './plot/stacked-histogram';
import AreaChart from './plot/area-chart';
import AreaChartElevated from './plot/area-chart-elevated';
import ScatteplotChart from './plot/scatterplot';
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
import SyncedCharts from './plot/synced-charts';
import TimeChart from './plot/time-chart';
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

import '../src/styles/examples.scss';

export const App = (
  <main>

    <header>
      <div className="header-contents">
        <a className="header-logo" href="#">react-vis</a>
        <nav>
          <li><a href="#plots">Plots</a></li>
          <li><a href="#radial-charts">Radial Charts</a></li>
          <li><a href="#treemaps">Treemaps</a></li>
          <li><a href="#legends">Legends</a></li>
          <li><a href="#sankeys">Sankeys</a></li>
        </nav>
      </div>
    </header>

    <article id="plots">
      <h1>Plots</h1>
      <section>
        <ComplexChart />
      </section>
      <h2>Series Types</h2>
      <section>
        <h3>Line Series</h3>
        <LineChart />
      </section>
      <section>
        <h3>LineMark Series</h3>
        <LineMarkChart />
      </section>
      <section>
        <h3>Mark Series</h3>
        <ScatteplotChart />
      </section>
      <section>
        <h3>Area Series</h3>
        <AreaChart />
      </section>
      <section>
        <h3>Area Series With vertical offset</h3>
        <AreaChartElevated />
      </section>
      <section>
        <h3>Bar Series</h3>
        <BarChart />
      </section>
      <section>
        <h3>Stacked Horizontal Bar Series</h3>
        <StackedHorizontalBarChart />
      </section>
      <section>
        <h3>Stacked Vertical Bar Series</h3>
        <StackedVerticalBarChart />
      </section>
      <section>
        <h3>Stacked Vertical Rect Series (histogram)</h3>
        <StackedHistogram />
      </section>
      <section>
        <h3>Heatmap Series</h3>
        <HeatmapChart />
      </section>
      <h2>Basic Components</h2>
      <section>
        <h3>Custom Size and Margin</h3>
        <WidthHeightMarginChart />
      </section>
      <section>
        <h3>Custom scales</h3>
        <CustomScales />
      </section>
      <section>
        <h3>Custom GridLines</h3>
        <GridLinesChart />
      </section>
      <h2>Axes</h2>
      <section>
        <h3>Custom Axes Orientation</h3>
        <CustomAxesOrientation />
      </section>
      <section>
        <h3>Custom Axis</h3>
        <CustomAxisChart />
      </section>
      <section>
        <h3>Turned axis labels</h3>
        <AxisWithTurnedLabels />
      </section>
      <h2>Tooltips</h2>
      <section>
        <h3>Static Hints</h3>
        <StaticHints />
      </section>
      <section>
        <h3>Dynamic Hints</h3>
        <p>Move mouse over the point to see the hint.</p>
        <DynamicHints />
      </section>
      <section>
        <h3>Dynamic Simple Edge Hints</h3>
        <p>Mouse over point. Hint appears on different edges.<br/>
          Left margin enables first point to show w/o break.</p>
        <DynamicSimpleEdgeHints />
      </section>
      <section>
        <h3>Dynamic Simple Top Edge Hints</h3>
        <p>Mouse over point.<br/>
          horizontalAlign=ALIGN.AUTO,<br/>
          verticalAlign=ALIGN.TOP_EDGE <br/>
          Hint pinned to top edge, pole moves<br/>
          along edge, hint box on right of pole<br/>
          for first 2 data points and left otherwise.</p>
        <DynamicSimpleTopEdgeHints />
      </section>
      <section>
        <h3>Dynamic Programmatic Right Edge Hints</h3>
        <p>Mouse over point.<br/>
          getAlignStyle method returns style object<br/>
          with right and top CSS props set (pinned<br/>
          right edge and at y position) </p>
        <DynamicProgrammaticRightEdgeHints />
      </section>
      <section>
        <h3>Dynamic Complex Edge Hints</h3>
        <p>Mouse over point. <br/>
          Hint uses flex, css to show hint and pole<br/>
          from point to outside plot edge (css for<br/>
          margin values).</p>
        <DynamicComplexEdgeHints />
      </section>
      <section>
        <h3>Static Crosshair</h3>
        <StaticCrosshair />
      </section>
      <section>
        <h3>Dynamic Crosshair</h3>
        <p>Move your mouse over the chart to see the point.</p>
        <DynamicCrosshair />
      </section>
      <h2>Miscellaneous</h2>
      <section>
        <h3>Synced Charts</h3>
        <SyncedCharts />
      </section>
      <section>
        <h3>Time Chart</h3>
        <TimeChart />
      </section>
      <section>
        <h3>Voronoi Line Chart</h3>
        <VoronoiLineChart />
      </section>
    </article>
    <article id="radial-charts">
      <h1>Radial Chart</h1>
      <section>
        <h3>Simple Radial Chart</h3>
        <SimpleRadialChart />
      </section>
      <section>
        <h3>Simple Donut Chart</h3>
        <DonutChartExample />
      </section>
      <section>
        <h3>Custom Radius</h3>
        <CustomRadiusRadialChart />
      </section>
    </article>

    <article id="treemaps">
      <h1>Treemap</h1>
      <section>
        <h3>Simple Treemap</h3>
        <SimpleTreemap />
      </section>
      <section>
        <h3>Animated Treemap</h3>
        <TreemapExample />
      </section>
    </article>

    <article id="legends">
      <h1>Legends</h1>
      <h2>Discrete color legend</h2>
      <section>
        <h3>Vertical legend</h3>
        <VerticalDiscreteColorLegendExample />
      </section>
      <section>
        <h3>Horizontal legend</h3>
        <HorizontalDiscreteColorLegendExample />
      </section>
      <section>
        <h3>Discrete color legend with search</h3>
        <SearchableDiscreteColorLegendExample />
      </section>
      <h2>Continuous color legend</h2>
      <section>
        <h3>Default legend</h3>
        <ContinuousColorLegendExample />
      </section>
      <h2>Continuous size legend</h2>
      <section>
        <h3>Default legend</h3>
        <ContinuousSizeLegendExample />
      </section>
    </article>

    <article id="sankeys">
      <h1>Sankeys</h1>
      <section>
        <h3>Basic</h3>
        <BasicSankeyExample />
      </section>
      <section>
        <h3>With Voronoi Selection</h3>
        <VoronoiSankeyExample />
      </section>
    </article>

  </main>
);

const el = document.createElement('div');
document.body.appendChild(el);

ReactDOM.render(App, el);

export const showCase = {
  ComplexChart,
  LineChart,
  LineMarkChart,
  BarChart,
  StackedVerticalBarChart,
  StackedHorizontalBarChart,
  StackedHistogram,
  AreaChart,
  AreaChartElevated,
  ScatteplotChart,
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
  SyncedCharts,
  TimeChart,
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
