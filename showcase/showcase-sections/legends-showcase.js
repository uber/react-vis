import React, {Component} from 'react';
import {mapSection} from '../showcase-components/showcase-utils';
import {showCase} from '../index';
const {
  ContinuousColorLegendExample,
  ContinuousSizeLegendExample,
  HorizontalDiscreteColorLegendExample,
  HorizontalDiscreteCustomPalette,
  SearchableDiscreteColorLegendExample,
  VerticalDiscreteColorLegendExample
} = showCase;

const DISCRETE_LEGENDS = [{
  name: 'Vertical legend',
  component: VerticalDiscreteColorLegendExample
}, {
  name: 'Horizontal legend',
  component: HorizontalDiscreteColorLegendExample
}, {
  name: 'Custom palette',
  component: HorizontalDiscreteCustomPalette
}, {
  name: 'Discrete color legend with search',
  component: SearchableDiscreteColorLegendExample
}];

const CONTINOUS_COLOR_LEGEND = [{
  name: 'Default legend',
  component: ContinuousColorLegendExample
}];

const CONTINOUS_SIZE_LEGEND = [{
  name: 'Default legend',
  component: ContinuousSizeLegendExample
}];

class LegendsExample extends Component {
  render() {
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
}

export default LegendsExample;
