import React from 'react';
import {mapSection} from '../showcase-components/showcase-utils';
import {showCase} from '../index';
const {
  ContinuousColorLegendExample,
  ContinuousSizeLegendExample,
  HorizontalDiscreteColorLegendExample,
  HorizontalDiscreteCustomPalette,
  SearchableDiscreteColorLegendExample,
  SearchableDiscreteColorLegendHoverExample,
  VerticalDiscreteColorLegendExample
} = showCase;
/* eslint-disable max-len */
const DISCRETE_LEGENDS = [
  {
    name: 'Vertical legend',
    component: VerticalDiscreteColorLegendExample,
    componentName: 'VerticalDiscreteColorLegendExample'
  },
  {
    name: 'Horizontal legend with stroke styles',
    component: HorizontalDiscreteColorLegendExample,
    componentName: 'HorizontalDiscreteColorLegendExample'
  },
  {
    name: 'Custom palette with hover interaction',
    component: HorizontalDiscreteCustomPalette,
    componentName: 'HorizontalDiscreteCustomPalette'
  },
  {
    name: 'Discrete color legend with search',
    component: SearchableDiscreteColorLegendExample,
    componentName: 'SearchableDiscreteColorLegendExample'
  },
  {
    name: 'Discrete color legend with search and hover',
    component: SearchableDiscreteColorLegendHoverExample,
    componentName: 'SearchableDiscreteColorLegendHoverExample'
  }
];
/* eslint-enable max-len */

const CONTINOUS_COLOR_LEGEND = [
  {
    name: 'Default legend',
    component: ContinuousColorLegendExample,
    componentName: 'ContinuousColorLegendExample'
  }
];

const CONTINOUS_SIZE_LEGEND = [
  {
    name: 'Default legend',
    component: ContinuousSizeLegendExample,
    componentName: 'ContinuousSizeLegendExample'
  }
];

function LegendsExample() {
  return (
    <article id="legends">
      <h1>Legends</h1>
      <h2>Discrete color legend</h2>
      {DISCRETE_LEGENDS.map(mapSection)}
      <h2>Continuous color legend</h2>
      {CONTINOUS_COLOR_LEGEND.map(mapSection)}
      <h2>Continuous size legend</h2>
      {CONTINOUS_SIZE_LEGEND.map(mapSection)}
    </article>
  );
}

export default LegendsExample;
