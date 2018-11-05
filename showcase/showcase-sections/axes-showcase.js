import React from 'react';

import {mapSection} from '../showcase-components/showcase-utils';
import {showCase} from '../index';
const {
  AxisOn0,
  AxisWithTurnedLabels,
  CustomAxes,
  CustomAxisChart,
  CustomAxesOrientation,
  CustomAxisTickFormat,
  CustomAxisTickElement,
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
const AXES = [
  {
    name: 'Axis on 0',
    component: AxisOn0,
    componentName: 'AxisOn0'
  },
  {
    name: 'Custom Axes Orientation',
    component: CustomAxesOrientation,
    componentName: 'CustomAxesOrientation'
  },
  {
    name: 'Custom Axis',
    component: CustomAxisChart,
    componentName: 'CustomAxisChart'
  },
  {
    name: 'Custom axis tick format',
    component: CustomAxisTickFormat
  },
  {
    name: 'Custom axis tick label element',
    component: CustomAxisTickElement
  },
  {
    name: 'Even more Custom Axes',
    component: CustomAxes,
    componentName: 'CustomAxes'
  },
  {
    name: 'Turned axis labels',
    component: AxisWithTurnedLabels,
    componentName: 'AxisWithTurnedLabels'
  },
  {
    name: 'Unpadded Axis vs Padded Axis',
    component: PaddedAxis,
    componentName: 'PaddedAxis'
  }
];

const TOOLTIPS = [
  {
    name: 'Static Hints',
    component: StaticHints,
    componentName: 'StaticHints'
  },
  {
    name: 'Dynamic Hints',
    comment: 'Move mouse over the point to see the hint.',
    component: DynamicHints,
    componentName: 'DynamicHints'
  },
  {
    name: 'Dynamic Simple Edge Hints',
    comment:
      'Mouse over point. Hint appears on different edges. Left margin enables first point to show w/o break.',
    component: DynamicSimpleEdgeHints,
    componentName: 'DynamicSimpleEdgeHints'
  },
  {
    name: 'Dynamic Simple Top Edge Hints',
    comment:
      'Mouse over point. horizontalAlign=ALIGN.AUTO, verticalAlign=ALIGN.TOP_EDGE  Hint pinned to top edge, pole moves along edge, hint box on right of pole for first 2 data points and left otherwise.',
    component: DynamicSimpleTopEdgeHints,
    componentName: 'DynamicSimpleTopEdgeHints'
  },
  {
    name: 'Dynamic Programmatic Right Edge Hints',
    comment:
      'Mouse over point. getAlignStyle method returns style object with right and top CSS props set (pinned right edge and at y position)',
    component: DynamicProgrammaticRightEdgeHints,
    componentName: 'DynamicProgrammaticRightEdgeHints'
  },
  {
    name: 'Dynamic Complex Edge Hints',
    comment:
      'Mouse over point. Hint uses flex, css to show hint and pole from point to outside plot edge (css for margin values).',
    component: DynamicComplexEdgeHints,
    componentName: 'DynamicComplexEdgeHints'
  },
  {
    name: 'Static Crosshair',
    component: StaticCrosshair,
    componentName: 'StaticCrosshair'
  },
  {
    name: 'Dynamic Crosshair',
    comment: 'Move your mouse over the chart to see the point.',
    component: DynamicCrosshair,
    componentName: 'DynamicCrosshair'
  },
  {
    name: 'Dynamic Crosshair Scatterplot',
    comment: 'Move your mouse over the chart to see the point.',
    component: DynamicCrosshairScatterplot,
    componentName: 'DynamicCrosshairScatterplot'
  }
];
/* eslint-enable max-len */
const DECORATIVE_AXES = [
  {
    name: 'Diagonal Axes',
    component: DecorativeAxisCrissCross,
    componentName: 'DecorativeAxisCrissCross'
  },
  {
    name: 'Parallel Coordinates',
    component: ParallelCoordinatesExample,
    componentName: 'ParallelCoordinatesExample'
  }
];

function AxesShowcase(props) {
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

export default AxesShowcase;
