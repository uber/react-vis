import React from 'react';

import {showCase} from '../index';
import {REACTVIS_BASE_URL} from '../showcase-links';
import {mapSection} from '../showcase-components/showcase-utils';

const {SimpleTreemap, TreemapExample} = showCase;

const TREEMAPS = [
  {
    name: 'Simple Treemap',
    component: SimpleTreemap,
    componentName: 'SimpleTreemap',
    docsLink:
      'http://uber.github.io/react-vis/documentation/other-charts/treemap',
    sourceLink: `${REACTVIS_BASE_URL}/treemap/index.js`
  },
  {
    name: 'Animated Treemap',
    component: TreemapExample,
    componentName: 'TreemapExample'
  }
];

function TreemapShowcase() {
  return (
    <article id="treemaps">
      <h1>Treemap</h1>
      {TREEMAPS.map(mapSection)}
    </article>
  );
}

export default TreemapShowcase;
