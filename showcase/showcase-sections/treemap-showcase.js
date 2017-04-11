import React, {Component} from 'react';

import {showCase} from '../index';
const {
  SimpleTreemap,
  TreemapExample
} = showCase;

class TreemapShowcase extends Component {
  render() {
    return (
      <article id="treemaps">
        <h1>Treemap</h1>
        <section>
          <h3>Simple Treemap</h3>
          <SimpleTreemap />
        </section>
        <section>
          <h3>Animated Treemap</h3>
          <TreemapExample />
        </section>
      </article>
    );
  }
}

export default TreemapShowcase;
