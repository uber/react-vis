import ComplexChartExample from '../../../examples/complex-chart/complex-chart-example';
import Candlestick from '../../../examples/candlestick/candlestick-example';
import StreamgraphExample from '../../../examples/streamgraph/streamgraph-example';
import ForceDirectedGraph from '../../../examples/force-directed-graph/force-directed-example';
import ShowcaseApp from '../../../showcase/showcase-app';
import ResponsiveVis from '../../../examples/responsive-vis/responsive-vis-example';

const generatePath = tree => {
  if (Array.isArray(tree)) {
    tree.forEach(branch => generatePath(branch));
  }
  if (tree.children) {
    generatePath(tree.children);
  }
  if (tree.name) {
    tree.path = updatePathName(tree.name);
  }
  return tree;
};

function updatePathName(name) {
  return name.toLowerCase().replace(/\s/g, '-');
}

const getDocUrl = filename => `markdown/${filename}`;

export const examplePages = generatePath([
  {
    name: 'Charts',
    children: [{
      name: 'Showcase',
      content: {
        pageType: 'example',
        component: ShowcaseApp
      }
    }, {
      name: 'Candlestick',
      content: {
        markdown: getDocUrl('examples/extensibility.md'),
        pageType: 'example',
        component: Candlestick
      }
    }, {
      name: 'Force Directed Graph',
      content: {
        pageType: 'example',
        component: ForceDirectedGraph
      }
    }, {
      name: 'Complex Chart',
      content: {
        pageType: 'example',
        component: ComplexChartExample
      }
    }, {
      name: 'Streamgraph',
      content: {
        pageType: 'example',
        component: StreamgraphExample
      }
    }, {
      name: 'Responsive Vis',
      content: {
        markdown: getDocUrl('examples/responsive-vis.md'),
        pageType: 'example',
        component: ResponsiveVis
      }
    }]
  }

]);

export const docPages = generatePath([
  {
    name: 'Overview',
    pageType: 'documentation',
    children: [{
      name: 'Getting started',
      content: {
        markdown: getDocUrl('tutorials/getting-started.md'),
        filename: 'tutorials/getting-started.md',
        pageType: 'documentation'
      }
    }, {
      name: 'Scales and data',
      content: {
        markdown: getDocUrl('scales-and-data.md'),
        filename: 'scales-and-data.md',
        pageType: 'documentation'
      }
    }, {
      name: 'Legends',
      content: {
        markdown: getDocUrl('legends.md'),
        filename: 'legends.md',
        pageType: 'documentation'
      }
    }, {
      name: 'Animation',
      content: {
        markdown: getDocUrl('animation.md'),
        filename: 'animation.md',
        pageType: 'documentation'
      }
    }]
  },
  {
    name: 'XY-Plot',
    children: [
      {
        name: 'Introduction',
        content: {
          markdown: getDocUrl('xy-plot.md'),
          filename: 'xy-plot.md',
          pageType: 'documentation'
        }
      }, {
        name: 'Series',
        content: {
          markdown: getDocUrl('series.md'),
          filename: 'series.md',
          pageType: 'documentation'
        }
      }, {
        name: 'Crosshair',
        content: {
          markdown: getDocUrl('crosshair.md'),
          filename: 'crosshair.md',
          pageType: 'documentation'
        }
      }, {
        name: 'Grids',
        content: {
          markdown: getDocUrl('grids.md'),
          filename: 'grids.md',
          pageType: 'documentation'
        }
      }, {
        name: 'Hint',
        content: {
          markdown: getDocUrl('hint.md'),
          filename: 'hint.md',
          pageType: 'documentation'
        }
      }, {
        name: 'Axes',
        content: {
          markdown: getDocUrl('axes.md'),
          filename: 'axes.md',
          pageType: 'documentation'
        }
      }
    ]
  },
  {
    name: 'XY Plot Series',
    children: [
      {
        name: 'Line Series',
        content: {
          markdown: getDocUrl('line-series.md'),
          filename: 'line-series.md',
          pageType: 'documentation'
        }
      }, {
        name: 'Bar Series',
        content: {
          markdown: getDocUrl('bar-series.md'),
          filename: 'bar-series.md',
          pageType: 'documentation'
        }
      }, {
        name: 'Polygon Series',
        content: {
          markdown: getDocUrl('polygon-series.md'),
          filename: 'polygon-series.md',
          pageType: 'documentation'
        }
      }, {
        name: 'Heatmap Series',
        content: {
          markdown: getDocUrl('heatmap-series.md'),
          filename: 'heatmap-series.md',
          pageType: 'documentation'
        }
      }, {
        name: 'Mark Series',
        content: {
          markdown: getDocUrl('mark-series.md'),
          filename: 'mark-series.md',
          pageType: 'documentation'
        }
      }, {
        name: 'Arc Series',
        content: {
          markdown: getDocUrl('arc-series.md'),
          filename: 'arc-series.md',
          pageType: 'documentation'
        }
      }
    ]
  },
  {
    name: 'Other Charts',
    children: [
      {
        name: 'Sankey Diagram',
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
        name: 'Radial Chart',
        content: {
          markdown: getDocUrl('radial-chart.md'),
          filename: 'radial-chart.md',
          pageType: 'documentation'
        }
      }
    ]
  }
]);

export const docsRouting = docPages.reduce((res, section) => section.children.reduce((mem, child) => {
  const filename = child.content.filename;
  const pureFilename = filename.slice(0, filename.length - 3);
  const sectionName = updatePathName(section.name);
  res[filename] = `#/documentation/${sectionName}/${pureFilename}`;
  return mem;
}, res), {});
