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

function getDocUrl(filename) {
  return `/markdown/${filename}`;
}

import ComplexChartExample from '../../../examples/complex-chart/complex-chart-example';
import Candlestick from '../../../examples/candlestick/candlestick-example';

export const examplePages = generatePath([
  {
    name: 'Charts',
    children: [{
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
    }]
  }

]);

export const docPages = generatePath([
  {
    name: 'Overview',
    pageType: 'documentation',
    children: [
      {
        name: 'Getting started',
        content: {
          markdown: getDocUrl('tutorials/getting-started.md'),
          pageType: 'documentation'
        }
      },
      {
        name: 'XYPlot',
        content: {
          markdown: getDocUrl('xy-plot.md'),
          pageType: 'documentation'
        }
      },
      {
        name: 'Scales and data',
        content: {
          markdown: getDocUrl('scales-and-data.md'),
          pageType: 'documentation'
        }
      },
      {
        name: 'Legends',
        content: {
          markdown: getDocUrl('legends.md'),
          pageType: 'documentation'
        }
      }
    ]
  },
  {
    name: 'Chart Types',
    children: [
      {
        name: 'Sankey',
        content: {
          markdown: getDocUrl('sankey.md'),
          pageType: 'documentation'
        }
      },
      {
        name: 'Treemap',
        content: {
          markdown: getDocUrl('treemap.md'),
          pageType: 'documentation'
        }
      },
      {
        name: 'RadialChart',
        content: {
          markdown: getDocUrl('radial-chart.md'),
          pageType: 'documentation'
        }
      }
    ]
  }
]);
