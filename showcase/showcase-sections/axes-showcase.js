import React, {Component} from 'react';

import {showCase} from '../index';
const {
  AxisWithTurnedLabels,
  CustomAxisChart,
  CustomAxesOrientation,
  DynamicComplexEdgeHints,
  DynamicCrosshair,
  DynamicCrosshairScatterplot,
  DynamicHints,
  DynamicProgrammaticRightEdgeHints,
  DynamicSimpleEdgeHints,
  DynamicSimpleTopEdgeHints,
  StaticCrosshair,
  StaticHints
} = showCase;

class AxesShowcase extends Component {
  render() {
    return (
      <article id="axes">
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
      </article>
    );
  }
}

export default AxesShowcase;
