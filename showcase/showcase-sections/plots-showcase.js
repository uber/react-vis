import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {showCase} from '../index';
const {
  AreaChart,
  AreaChartElevated,
  BarChart,
  ClusteredStackedVerticalBarChart,
  ComplexChart,
  CustomScales,
  FauxScatterplotChart,
  GridLinesChart,
  HeatmapChart,
  LineChart,
  LineChartGL,
  LineMarkChart,
  StackedVerticalBarChart,
  StackedHorizontalBarChart,
  StackedHistogram,
  ScatterplotChart,
  ScatterplotGLChart,
  WidthHeightMarginChart
} = showCase;

class PlotsShowcase extends Component {
  render() {
    const {forExample} = this.props;
    return (
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
          <h3>LineMark Series</h3>
          <LineChartGL />
        </section>
        <section>
          <h3>Mark Series</h3>
          <ScatterplotChart />
        </section>
        <section>
          <h3>Mark Series GL</h3>
          <ScatterplotGLChart />
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
      </article>
    );
  }
}

PlotsShowcase.propTypes = {
  forExample: PropTypes.bool
};

export default PlotsShowcase;
