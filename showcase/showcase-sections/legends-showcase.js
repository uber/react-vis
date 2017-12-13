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
/* eslint-disable max-len */
const DISCRETE_LEGENDS = [{
  name: 'Vertical legend',
  component: VerticalDiscreteColorLegendExample,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/legends/vertical-discrete-color.js'
}, {
  name: 'Horizontal legend',
  component: HorizontalDiscreteColorLegendExample,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/legends/horizontal-discrete-color.js'
}, {
  name: 'Custom palette with hover interaction',
  component: HorizontalDiscreteCustomPalette,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/legends/horizontal-discrete-custom-palette.js'
}, {
  name: 'Discrete color legend with search',
  component: SearchableDiscreteColorLegendExample,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/legends/searchable-discrete-color.js'
}];
/* eslint-enable max-len */

const CONTINOUS_COLOR_LEGEND = [{
  name: 'Default legend',
  component: ContinuousColorLegendExample,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/legends/continuous-color.js'
}];

const CONTINOUS_SIZE_LEGEND = [{
  name: 'Default legend',
  component: ContinuousSizeLegendExample,
  exampleLink: 'https://github.com/uber/react-vis/blob/master/showcase/legends/continuous-size.js'
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
