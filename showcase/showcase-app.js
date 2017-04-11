import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {showCase} from './index';
const {
  ComplexChart,
  LineChart,
  LineMarkChart,
  BarChart,
  StackedVerticalBarChart,
  StackedHorizontalBarChart,
  ClusteredStackedVerticalBarChart,
  StackedHistogram,
  AnimationExample,
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

  BasicSunburst,
  ClockExample,
  AnimatedSunburst,

  SimpleRadialChart,
  DonutChartExample,
  CustomRadiusRadialChart,
  ArcSeriesExample,

  BasicSankeyExample,
  VoronoiSankeyExample,

  VerticalDiscreteColorLegendExample,
  HorizontalDiscreteColorLegendExample,
  SearchableDiscreteColorLegendExample,
  ContinuousColorLegendExample,
  ContinuousSizeLegendExample
} = showCase;

class App extends Component {
  render() {
    const {forExample} = this.props;
    return (
      <main>

        {!forExample && (<header>
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
        </header>)}
        <article id="plots">
          <h1>Plots</h1>
          {!forExample && (<section>
            <ComplexChart />
          </section>)}
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
            <ScatterplotChart />
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
            <h3>Clustered Stacked Vertical Bar Series</h3>
            <ClusteredStackedVerticalBarChart />
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
          <section>
            <h3>Circular Gridlines</h3>
            <FauxScatterplotChart />
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
          <section>
            <h3>Dynamic Crosshair Scatterplot</h3>
            <p>Move your mouse over the chart to see the point.</p>
            <DynamicCrosshairScatterplot />
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
            <h3>Polygon Example</h3>
            <TriangleExample />
          </section>
          <section>
            <h3>Voronoi Line Chart</h3>
            <VoronoiLineChart />
          </section>
          <section>
            <h3>Animation Example</h3>
            <AnimationExample />
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
        <article id="sunbursts">
          <h1>Sunbursts</h1>
          <section>
            <h3>Arc Series Example</h3>
            <ArcSeriesExample />
          </section>
          <section>
            <h3>Basic Sunburst</h3>
            <BasicSunburst />
          </section>
          <section>
            <h3>Clock</h3>
            <ClockExample />
          </section>
          <section>
            <h3>Animated Sunburst</h3>
            <AnimatedSunburst />
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
  }
}

App.propTypes = {
  forExample: PropTypes.bool
};

export default App;
