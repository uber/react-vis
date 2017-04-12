import React, {Component} from 'react';

import {showCase} from '../index';
const {
  CustomRadiusRadialChart,
  DonutChartExample,
  SimpleRadialChart
} = showCase;

class RadialShowcase extends Component {
  render() {
    return (
      <article id="radial-charts">
        <h1>Radial Chart</h1>
        <section>
          <h3>Simple Radial Chart</h3>
          <SimpleRadialChart />
        </section>
        <section>
          <h3>Simple Hoverable Donut Chart</h3>
          <DonutChartExample />
        </section>
        <section>
          <h3>Custom Radius</h3>
          <CustomRadiusRadialChart />
        </section>
      </article>
    );
  }
}

export default RadialShowcase;
