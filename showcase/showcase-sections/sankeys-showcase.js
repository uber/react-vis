import React, {Component} from 'react';

import {showCase} from '../index';
const {
  BasicSankeyExample,
  VoronoiSankeyExample
} = showCase;

class SankeysSection extends Component {
  render() {
    return (
      <article id="sankeys">
        <h1>Sankeys</h1>
        <section>
          <h3>Basic</h3>
          <BasicSankeyExample />
        </section>
        <section>
          <h3>With Voronoi Selection</h3>
          <VoronoiSankeyExample />
        </section>
      </article>
    );
  }
}

export default SankeysSection;
