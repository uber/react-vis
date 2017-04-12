import React, {Component} from 'react';

import {showCase} from '../index';
import {mapSection} from '../showcase-components/showcase-utils';
const {
  SimpleTreemap,
  TreemapExample
} = showCase;

const TREEMAPS = [{
  name: 'Simple Treemap',
  component: SimpleTreemap,
  docsLink: 'http://uber.github.io/react-vis/#/documentation/other-charts/treemap',
  sourceLink: 'https://github.com/uber/react-vis/blob/master/src/treemap/index.js'
}, {
  name: 'Animated Treemap',
  component: TreemapExample
}];

class TreemapShowcase extends Component {
  render() {
    return (
      <article id="treemaps">
        <h1>Treemap</h1>
        {TREEMAPS.map(mapSection)}
      </article>
    );
  }
}

export default TreemapShowcase;
