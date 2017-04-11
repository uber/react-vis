import React, {Component} from 'react';

import {showCase} from '../index';
const {
  AnimatedSunburst,
  ArcSeriesExample,
  BasicSunburst,
  ClockExample
} = showCase;

class SunburstSection extends Component {
  render() {
    return (
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
    );
  }
}

export default SunburstSection;
