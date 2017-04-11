import React, {Component} from 'react';

import {showCase} from '../index';
const {
  ContinuousColorLegendExample,
  ContinuousSizeLegendExample,
  HorizontalDiscreteColorLegendExample,
  SearchableDiscreteColorLegendExample,
  VerticalDiscreteColorLegendExample
} = showCase;

class LegendsExample extends Component {
  render() {
    return (
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
    );
  }
}

export default LegendsExample;
