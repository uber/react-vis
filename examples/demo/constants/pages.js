function generatePath(tree) {
  if (Array.isArray(tree)) {
    tree.forEach(branch => generatePath(branch));
  }
  if (tree.children) {
    generatePath(tree.children);
  }
  if (tree.name) {
    tree.path = tree.name.match(/(([A-Z]|^)[a-z]+|\d+)/g).join('-').toLowerCase();
  }
  return tree;
}

import ComplexChartExample from '../../complex-chart/complex-chart-example';
import Candlestick from '../../candlestick/candlestick-example';
export const examplePages = generatePath([
  {
    name: 'Candlestick',
    content: {
      pageType: 'example',
      component: Candlestick
    }
  },
  {
    name: 'Complex Chart',
    content: {
      pageType: 'example',
      component: ComplexChartExample
    }
  }
]);
