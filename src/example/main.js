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
import StackedBarChart from './plot/stacked-bar-chart';
import AreaChart from './plot/area-chart';
import ScatteplotChart from './plot/scatterplot';
import HeatmapChart from './plot/heatmap-chart';
import WidthHeightMarginChart from './plot/width-height-margin';
import CustomScales from './plot/custom-scales';
import CustomAxisChart from './plot/custom-axis';
import GridLinesChart from './plot/grid';
import StaticHints from './plot/static-hints';
import DynamicHints from './plot/dynamic-hints';
import StaticCrosshair from './plot/static-crosshair';
import DynamicCrosshair from './plot/dynamic-crosshair';
import SyncedCharts from './plot/synced-charts';
import TimeChart from './plot/time-chart';

import SimpleTreemap from './treemap/simple-treemap';
import TreemapExample from './treemap/dynamic-treemap';

import StaticTable from './table/static-table';
import DynamicTable from './table/dynamic-table';

import SimpleRadialChart from './radial-chart/simple-radial-chart';

import CustomRadiusRadialChart from './radial-chart/custom-radius-radial-chart';

import DiscreteColorLegendExample from './legends/discrete-color';
import SearchableDiscreteColorLegendExample from './legends/searchable-discrete-color';

import {isReactDOMSupported} from '../lib/utils/react-utils';

const examples = (
  <main>
    <header>react-vis</header>
    <article>
      <h1>Chart</h1>
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
        <h3>Bar Series</h3>
        <BarChart />
      </section>
      <section>
        <h3>Stacked Bar Series</h3>
        <StackedBarChart />
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
        <h3>Custom Axis</h3>
        <CustomAxisChart />
      </section>
      <section>
        <h3>Custom GridLines</h3>
        <GridLinesChart />
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

      <h1>Radial Chart</h1>
      <section>
        <h3>Simple Radial Chart</h3>
        <SimpleRadialChart />
      </section>

      <section>
        <h3>Custom Radius</h3>
        <CustomRadiusRadialChart />
      </section>

      <h1>Treemap</h1>
      <section>
        <h3>Simple Treemap</h3>
        <SimpleTreemap />
      </section>
      <section>
        <h3>Animated Treemap</h3>
        <TreemapExample />
      </section>

      <h1>Table</h1>
      <section>
        <h3>Static Table</h3>
        <StaticTable />
      </section>
      <section>
        <h3>Dynamic Table</h3>
        <p>Updates each 5 seconds</p>
        <DynamicTable />
      </section>
      <h1>Legends</h1>
      <section>
        <h3>Discrete color legend</h3>
        <DiscreteColorLegendExample />
      </section>
      <section>
        <h3>Discrete color legend with search</h3>
        <SearchableDiscreteColorLegendExample />
      </section>
    </article>
  </main>
);

// Cannot render to body anymore: react is throwing warnings.
// Adding new element instead.
const el = document.createElement('div');
const render = isReactDOMSupported() ? ReactDOM.render : React.render;
document.body.appendChild(el);
render(examples, el);
