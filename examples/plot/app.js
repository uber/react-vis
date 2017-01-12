// Copyright (c) 2016 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import window from 'global/window';
import document from 'global/document';

import {isReactDOMSupported} from '../../src/utils/react-utils';
import AreaChartElevatedExample from './views/area-chart-elevated-example';
import AreaChartExample from './views/area-chart-example';
import AxisWithTurnedLabelsExample from './views/axis-with-turned-labels-example';
import BarChartExample from './views/bar-chart-example';
import ComplexChartExample from './views/complex-chart-example';
import CustomAxesOrientationExample from './views/custom-axes-orientation-example';
import CustomAxisChartExample from './views/custom-axis-chart-example';
import CustomScalesExample from './views/custom-scales-example';
import DynamicComplexEdgeHintsExample from './views/dynamic-complex-edge-hints-example';
import DynamicCrosshairExample from './views/dynamic-crosshair-example';
import DynamicHintsExample from './views/dynamic-hints-example';
import DynamicProgrammaticRightEdgeHintsExample
  from './views/dynamic-programmatic-rightedge-hints-example';
import DynamicSimpleEdgeHintsExample from './views/dynamic-simple-edge-hints-example';
import DynamicSimpleTopEdgeHintsExample from './views/dynamic-simple-topedge-hints-example';
import GridLinesChartExample from './views/grid-lines-example';
import HeatmapChartExample from './views/heatmap-chart-example';
import LineChartExample from './views/line-chart-example';
import LineMarkChartExample from './views/linemark-chart-example';
import ScatteplotChartExample from './views/scatterplot-example';
import StackedHistogramExample from './views/stacked-histogram-example';
import StackedHorizontalBarChartExample from './views/stacked-horizontal-bar-chart-example';
import StackedVerticalBarChartExample from './views/stacked-vertical-bar-chart-example';
import StaticCrosshairExample from './views/static-crosshair-example';
import StaticHintsExample from './views/static-hints-example';
import SyncedChartsExample from './views/synced-charts-example';
import TimeChartExample from './views/time-chart-example';
import WidthHeightMarginChartExample from './views/width-height-margin-chart-example';
import '../main.scss';
import '../../src/styles/plot.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {width: window.innerWidth};
    window.addEventListener('resize', () => this.setState({width: window.innerWidth}));
  }

  render() {
    return (
      <article id="plots">
        <h1>Plots</h1>
        <section>
          <ComplexChartExample />
        </section>
        <h2>Series Types</h2>
        <section>
          <h3>Line Series</h3>
          <LineChartExample />
        </section>
        <section>
          <h3>LineMark Series</h3>
          <LineMarkChartExample />
        </section>
        <section>
          <h3>Mark Series</h3>
          <ScatteplotChartExample />
        </section>
        <section>
          <h3>Area Series</h3>
          <AreaChartExample />
        </section>
        <section>
          <h3>Area Series With vertical offset</h3>
          <AreaChartElevatedExample />
        </section>
        <section>
          <h3>Bar Series</h3>
          <BarChartExample />
        </section>
        <section>
          <h3>Stacked Horizontal Bar Series</h3>
          <StackedHorizontalBarChartExample />
        </section>
        <section>
          <h3>Stacked Vertical Bar Series</h3>
          <StackedVerticalBarChartExample />
        </section>
        <section>
          <h3>Stacked Vertical Rect Series (histogram)</h3>
          <StackedHistogramExample />
        </section>
        <section>
          <h3>Heatmap Series</h3>
          <HeatmapChartExample />
        </section>
        <h2>Basic Components</h2>
        <section>
          <h3>Custom Size and Margin</h3>
          <WidthHeightMarginChartExample />
        </section>
        <section>
          <h3>Custom scales</h3>
          <CustomScalesExample />
        </section>
        <section>
          <h3>Custom GridLines</h3>
          <GridLinesChartExample />
        </section>
        <h2>Axes</h2>
        <section>
          <h3>Custom Axes Orientation</h3>
          <CustomAxesOrientationExample />
        </section>
        <section>
          <h3>Custom Axis</h3>
          <CustomAxisChartExample />
        </section>
        <section>
          <h3>Turned axis labels</h3>
          <AxisWithTurnedLabelsExample />
        </section>
        <h2>Tooltips</h2>
        <section>
          <h3>Static Hints</h3>
          <StaticHintsExample />
        </section>
        <section>
          <h3>Dynamic Hints</h3>
          <p>Move mouse over the point to see the hint.</p>
          <DynamicHintsExample />
        </section>
        <section>
          <h3>Dynamic Simple Edge Hints</h3>
          <p>Mouse over point. Hint appears on different edges.<br/>
            Left margin enables first point to show w/o break.</p>
          <DynamicSimpleEdgeHintsExample />
        </section>
        <section>
          <h3>Dynamic Simple Top Edge Hints</h3>
          <p>Mouse over point.<br/>
            horizontalAlign=ALIGN.AUTO,<br/>
            verticalAlign=ALIGN.TOP_EDGE <br/>
            Hint pinned to top edge, pole moves<br/>
            along edge, hint box on right of pole<br/>
            for first 2 data points and left otherwise.</p>
          <DynamicSimpleTopEdgeHintsExample />
        </section>
        <section>
          <h3>Dynamic Programmatic Right Edge Hints</h3>
          <p>Mouse over point.<br/>
            getAlignStyle method returns style object<br/>
            with right and top CSS props set (pinned<br/>
            right edge and at y position) </p>
          <DynamicProgrammaticRightEdgeHintsExample />
        </section>
        <section>
          <h3>Dynamic Complex Edge Hints</h3>
          <p>Mouse over point. <br/>
            Hint uses flex, css to show hint and pole<br/>
            from point to outside plot edge (css for<br/>
            margin values).</p>
          <DynamicComplexEdgeHintsExample />
        </section>
        <section>
          <h3>Static Crosshair</h3>
          <StaticCrosshairExample />
        </section>
        <section>
          <h3>Dynamic Crosshair</h3>
          <p>Move your mouse over the chart to see the point.</p>
          <DynamicCrosshairExample />
        </section>
        <h2>Miscellaneous</h2>
        <section>
          <h3>Synced Charts</h3>
          <SyncedChartsExample />
        </section>
        <section>
          <h3>Time Chart</h3>
          <TimeChartExample />
        </section>
      </article>
    );
  }
}

// Cannot render to body anymore: react is throwing warnings. React.render()
// was deprecated in 0.15.0
//
// The following code is boilerplate the make the examples work with React
// 0.14.0 and 0.15.0. Do not use it in your app.
//
// When using >= 0.15.0, render with ReactDOM.render(). Otherwise, use React.render()

const el = document.createElement('div');

const render = isReactDOMSupported() ?
  ReactDOM.render :
  React.render; // eslint-disable-line react/no-deprecated

document.body.appendChild(el);

render(<App />, el);
