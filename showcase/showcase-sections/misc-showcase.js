import React, {Component} from 'react';

import {showCase} from '../index';
const {
  AnimationExample,
  LabelSeriesExample,
  SyncedCharts,
  TimeChart,
  TriangleExample,
  VoronoiLineChart
} = showCase;

class MiscShowcase extends Component {
  render() {
    return (
      <article>
        <h2>Miscellaneous</h2>
        <section>
          <h3>Synced Charts</h3>
          <SyncedCharts />
        </section>
        <section>
          <h3>Time Chart</h3>
          <TimeChart />
        </section>
        <section>
          <h3>Polygon Example</h3>
          <TriangleExample />
        </section>
        <section>
          <h3>Voronoi Line Chart</h3>
          <VoronoiLineChart />
        </section>
        <section>
          <h3>Animation Example</h3>
          <AnimationExample />
        </section>
        <section>
          <h3>Label Series Example</h3>
          <LabelSeriesExample />
        </section>
      </article>
    );
  }
}

export default MiscShowcase;
