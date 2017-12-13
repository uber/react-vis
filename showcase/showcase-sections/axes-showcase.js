import React, {Component} from 'react';

import {mapSection} from '../showcase-components/showcase-utils';
import {showCase} from '../index';
const {
  AxisOn0,
  AxisWithTurnedLabels,
  CustomAxes,
  CustomAxisChart,
  CustomAxesOrientation,
  DecorativeAxisCrissCross,
  DynamicComplexEdgeHints,
  DynamicCrosshair,
  DynamicCrosshairScatterplot,
  DynamicHints,
  DynamicProgrammaticRightEdgeHints,
  DynamicSimpleEdgeHints,
  DynamicSimpleTopEdgeHints,
  PaddedAxis,
  ParallelCoordinatesExample,
  StaticCrosshair,
  StaticHints
} = showCase;

/* eslint-disable max-len */
const AXES = [{
  name: 'Axis on 0',
  component: AxisOn0,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/axes/axis-on-0.js'
}, {
  name: 'Custom Axes Orientation',
  component: CustomAxesOrientation,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/axes/custom-axes-orientation.js'
}, {
  name: 'Custom Axis',
  component: CustomAxisChart,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/axes/custom-axis.js'
}, {
  name: 'Even more Custom Axes',
  component: CustomAxes,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/axes/custom-axes.js'
}, {
  name: 'Turned axis labels',
  component: AxisWithTurnedLabels,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/plot/axis-with-turned-labels'
}, {
  name: 'Unpadded Axis vs Padded Axis',
  component: PaddedAxis,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/axes/padded-axis.js'
}];

const TOOLTIPS = [{
  name: 'Static Hints',
  component: StaticHints,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/axes/static-hints.js'
}, {
  name: 'Dynamic Hints',
  comment: 'Move mouse over the point to see the hint.',
  component: DynamicHints,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/axes/dynamic-hints.js'
}, {
  name: 'Dynamic Simple Edge Hints',
  comment: 'Mouse over point. Hint appears on different edges. Left margin enables first point to show w/o break.',
  component: DynamicSimpleEdgeHints,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/axes/dynamic-simple-edge-hints.js'
}, {
  name: 'Dynamic Simple Top Edge Hints',
  comment: 'Mouse over point. horizontalAlign=ALIGN.AUTO, verticalAlign=ALIGN.TOP_EDGE  Hint pinned to top edge, pole moves along edge, hint box on right of pole for first 2 data points and left otherwise.',
  component: DynamicSimpleTopEdgeHints,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/axes/dynamic-simple-topedge-hints.js'
}, {
  name: 'Dynamic Programmatic Right Edge Hints',
  comment: 'Mouse over point. getAlignStyle method returns style object with right and top CSS props set (pinned right edge and at y position)',
  component: DynamicProgrammaticRightEdgeHints,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/axes/dynamic-programmatic-rightedge-hints.js'
}, {
  name: 'Dynamic Complex Edge Hints',
  comment: 'Mouse over point. Hint uses flex, css to show hint and pole from point to outside plot edge (css for margin values).',
  component: DynamicComplexEdgeHints,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/axes/dynamic-complex-edge-hints.js'
}, {
  name: 'Static Crosshair',
  component: StaticCrosshair,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/axes/static-crosshair.js'
}, {
  name: 'Dynamic Crosshair',
  comment: 'Move your mouse over the chart to see the point.',
  component: DynamicCrosshair,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/axes/dynamic-crosshair.js'
}, {
  name: 'Dynamic Crosshair Scatterplot',
  comment: 'Move your mouse over the chart to see the point.',
  component: DynamicCrosshairScatterplot,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/axes/dynamic-crosshair-scatterplot.js'
}];
/* eslint-enable max-len */
const DECORATIVE_AXES = [{
  name: 'Diagonal Axes',
  component: DecorativeAxisCrissCross,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/axes/decorative-axes-criss-cross.js'
}, {
  name: 'Parallel Coordinates',
  component: ParallelCoordinatesExample,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/axes/parallel-coordinates-example.js'
}];

class AxesShowcase extends Component {
  render() {
    return (
      <article id="axes">
        <h2>Axes</h2>
        {AXES.map(mapSection)}
        <h2>Tooltips</h2>
        {TOOLTIPS.map(mapSection)}
        <h2>DecorativeAxis</h2>
        {DECORATIVE_AXES.map(mapSection)}
      </article>
    );
  }
}

export default AxesShowcase;
