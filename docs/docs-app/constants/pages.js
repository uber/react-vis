const getDocUrl = filename => `markdown/${filename}`;

const generatePath = tree => {
  if (Array.isArray(tree)) {
    tree.forEach(branch => generatePath(branch));
  }
  if (tree.children) {
    tree.children = tree.children.map(page => ({...page, markdown: getDocUrl(page.filename)}));
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

export const examplePages = generatePath([
  {
    name: 'Showcases',
    children: [{
      name: 'Plots',
      filename: 'examples/showcases/plots-showcase.md'
    }, {
      name: 'Axes',
      filename: 'examples/showcases/axes-showcase.md'
    }, {
      name: 'Legends',
      filename: 'examples/showcases/legends-showcase.md'
    }, {
      name: 'Sunbursts',
      filename: 'examples/showcases/sunburst-showcase.md'
    }, {
      name: 'Radial',
      filename: 'examples/showcases/radial-showcase.md'
    }, {
      name: 'Sankeys',
      filename: 'examples/showcases/sankeys-showcase.md'
    }, {
      name: 'Treemaps',
      filename: 'examples/showcases/treemaps-showcase.md'
    }, {
      name: 'Radar Charts',
      filename: 'examples/showcases/radar-chart-showcase.md'
    }, {
      name: 'Misc',
      filename: 'examples/showcases/misc-showcase.md'
    }]
  },
  {
    name: 'Charts',
    children: [{
      name: 'Candlestick',
      filename: 'examples/extensibility.md'
    }, {
      name: 'Force Directed Graph',
      filename: 'examples/building-things-other-than-charts.md'
    }, {
      name: 'Streamgraph',
      filename: 'examples/stream-graph.md'
    }, {
      name: 'Responsive Vis',
      filename: 'examples/responsive-vis.md'
    }, {
      name: 'Zoomable Chart',
      filename: 'examples/zoomable-chart.md'
    }, {
      name: 'Git History',
      filename: 'examples/history-example.md'
    }]
  }
]);

export const docPages = generatePath([
  {
    name: 'Overview',
    children: [{
      name: 'Introduction',
      filename: 'introduction.md'
    }
    // , {
    //  name: 'The Uber Visualization Suite',
    //  content: {
    //    markdown: getDocUrl('suite.md'),
    //    filename: 'suite.md',
    //    pageType: 'documentation'
    // }
    ]
  },
  {
    name: 'Getting started',
    children: [{
      name: 'React-vis in codepen',
      filename: 'getting-started/react-vis-in-codepen.md'
    }, {
      name: 'Installing react-vis',
      filename: 'getting-started/installing-react-vis.md'
    }, {
      name: 'Creating a new react-vis project',
      filename: 'getting-started/new-react-vis-project.md'
    }, {
      name: 'Your first chart',
      filename: 'getting-started/your-first-chart.md'
    }]
  }, {
    name: 'General principles',
    pageType: 'documentation',
    children: [{
      name: 'Scales and data',
      filename: 'scales-and-data.md'
    }, {
      name: 'Colors',
      filename: 'colors.md'
    }, {
      name: 'Interaction',
      filename: 'interaction.md'
    }, {
      name: 'Legends',
      filename: 'legends.md'
    }, {
      name: 'Animation',
      filename: 'animation.md'
    }, {
      name: 'Style',
      filename: 'style.md'
    }]
  },
  {
    name: 'API Reference',
    children: [
      {
        name: 'XY-Plot',
        filename: 'xy-plot.md'
      }, {
        name: 'Series',
        filename: 'series.md'
      }, {
        name: 'Crosshair',
        filename: 'crosshair.md'
      }, {
        name: 'Grids',
        filename: 'grids.md'
      }, {
        name: 'Hint',
        filename: 'hint.md'
      }, {
        name: 'Axes',
        filename: 'axes.md'
      }, {
        name: 'DecorativeAxis',
        filename: 'decorative-axis.md'
      }, {
        name: 'Gradients',
        filename: 'gradients.md'
      }, {
        name: 'Flexible plots',
        filename: 'flexible-plots.md'
      }
    ]
  },
  {
    name: 'Series reference',
    children: [
      {
        name: 'Arc Series',
        filename: 'arc-series.md'
      }, {
        name: 'Area Series',
        filename: 'area-series.md'
      }, {
        name: 'Bar Series',
        filename: 'bar-series.md'
      }, {
        name: 'Contour Series',
        filename: 'contour-series.md'
      }, {
        name: 'Custom SVG Series',
        filename: 'custom-svg-series.md'
      }, {
        name: 'Heatmap Series',
        filename: 'heatmap-series.md'
      }, {
        name: 'Label Series',
        filename: 'label-series.md'
      }, {
        name: 'Line Series',
        filename: 'line-series.md'
      },
      {
        name: 'Line-Mark Series',
        filename: 'line-mark-series.md'
      }, {
        name: 'Mark Series',
        filename: 'mark-series.md'
      }, {
        name: 'Polygon Series',
        filename: 'polygon-series.md'
      }, {
        name: 'Rect Series',
        filename: 'rect-series.md'
      }
    ]
  },
  {
    name: 'Other Charts',
    children: [{
      name: 'Sankey Diagram',
      filename: 'sankey.md'
    }, {
      name: 'Treemap',
      filename: 'treemap.md'
    }, {
      name: 'Radar Chart',
      filename: 'radar-chart.md'
    }, {
      name: 'Radial Chart',
      filename: 'radial-chart.md'
    }, {
      name: 'Sunburst Diagram',
      filename: 'sunburst.md'
    }]
  }
]);

export const docsRouting = docPages.reduce((res, section) => section.children.reduce((mem, child) => {
  const filename = child.filename;
  const pureFilename = filename.slice(0, filename.length - 3);
  const sectionName = updatePathName(section.name);
  res[filename] = `#/documentation/${sectionName}/${pureFilename}`;
  return mem;
}, res), {});
