import ComplexChartExample from '../../../examples/complex-chart/complex-chart-example';
import Candlestick from '../../../examples/candlestick/candlestick-example';

const generatePath = tree => {
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
};

const getDocUrl = filename => `/markdown/${filename}`;

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
          filename: 'tutorials/getting-started.md',
          pageType: 'documentation'
        }
      },
      {
        name: 'XYPlot',
        content: {
          markdown: getDocUrl('xy-plot.md'),
          filename: 'xy-plot.md',
          pageType: 'documentation'
        }
      },
      {
        name: 'Axes',
        content: {
          markdown: getDocUrl('axes.md'),
          filename: 'axes.md',
          pageType: 'documentation'
        }
      },
      {
        name: 'Crosshair',
        content: {
          markdown: getDocUrl('crosshair.md'),
          filename: 'crosshair.md',
          pageType: 'documentation'
        }
      },
      {
        name: 'Grids',
        content: {
          markdown: getDocUrl('grids.md'),
          filename: 'grids.md',
          pageType: 'documentation'
        }
      },
      {
        name: 'Hint',
        content: {
          markdown: getDocUrl('hint.md'),
          filename: 'hint.md',
          pageType: 'documentation'
        }
      },
      {
        name: 'Scales and data',
        content: {
          markdown: getDocUrl('scales-and-data.md'),
          filename: 'scales-and-data.md',
          pageType: 'documentation'
        }
      },
      {
        name: 'Legends',
        content: {
          markdown: getDocUrl('legends.md'),
          filename: 'legends.md',
          pageType: 'documentation'
        }
      }
    ]
  },
  {
    name: 'Charts',
    children: [
      {
        name: 'Sankey',
        content: {
          markdown: getDocUrl('sankey.md'),
          filename: 'sankey.md',
          pageType: 'documentation'
        }
      },
      {
        name: 'Treemap',
        content: {
          markdown: getDocUrl('treemap.md'),
          filename: 'treemap.md',
          pageType: 'documentation'
        }
      },
      {
        name: 'RadialChart',
        content: {
          markdown: getDocUrl('radial-chart.md'),
          filename: 'radial-chart.md',
          pageType: 'documentation'
        }
      },
      {
        name: 'Series',
        content: {
          markdown: getDocUrl('series.md'),
          filename: 'series.md',
          pageType: 'documentation'
        }
      },
      {
        name: 'LineChart',
        content: {
          markdown: getDocUrl('line-chart.md'),
          filename: 'line-chart.md',
          pageType: 'documentation'
        }
      }
    ]
  }
]);

export const docsRouting = docPages.reduce((res, section) => section.children.reduce((mem, child) => {
  const filename = child.content.filename;
  const pureFilename = filename.slice(0, filename.length - 3);
  const sectionName = section.name.toLowerCase();
  res[filename] = `#/documentation/${sectionName}/${pureFilename}`;
  return mem;
}, res), {});
