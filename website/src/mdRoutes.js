import codepen from '../../docs/getting-started/react-vis-in-codepen.md';
import install from '../../docs/getting-started/installing-react-vis.md';
import newProject from '../../docs/getting-started/new-react-vis-project.md';
import first from '../../docs/getting-started/your-first-chart.md';

import otherThings from "../../docs/examples/building-things-other-than-charts.md";
import extensibility from "../../docs/examples/extensibility.md";
import responsiveVis from "../../docs/examples/responsive-vis.md";
import irisDashboard from '../../docs/examples/iris-dashboard.md';
import streamGraph from "../../docs/examples/stream-graph.md";

import axesShowcase from "../../docs/examples/showcases/axes-showcase.md";
import legendsShowcase from "../../docs/examples/showcases/legends-showcase.md";
import miscShowcase from "../../docs/examples/showcases/misc-showcase.md";
import plotsShowcase from "../../docs/examples/showcases/plots-showcase.md";
import radarShowcase from "../../docs/examples/showcases/radar-chart-showcase.md";
import radialShowcase from "../../docs/examples/showcases/radial-showcase.md";
import sankeysShowcase from "../../docs/examples/showcases/sankeys-showcase.md";
import sunburstShowcase from "../../docs/examples/showcases/sunburst-showcase.md";
import treemapsShowcase from "../../docs/examples/showcases/treemaps-showcase.md";

import animation from "../../docs/animation.md";
import arcSeries from "../../docs/arc-series.md";
import areaSeries from "../../docs/area-series.md";
import axes from "../../docs/axes.md";
import barSeries from "../../docs/bar-series.md";
import borders from "../../docs/borders.md";
import chartLabel from "../../docs/chart-label.md";
import colors from "../../docs/colors.md";
import contourSeries from "../../docs/contour-series.md";
import crosshair from "../../docs/crosshair.md";
import customSvgSeries from "../../docs/custom-svg-series.md";
import decorativeAxis from "../../docs/decorative-axis.md";
import flexiblePlots from "../../docs/flexible-plots.md";
import gradients from "../../docs/gradients.md";
import grids from "../../docs/grids.md";
import heatmapSeries from "../../docs/heatmap-series.md";
import hexbinSeries from "../../docs/hexbin-series.md";
import highlight from "../../docs/highlight.md";
import hint from "../../docs/hint.md";
import interaction from "../../docs/interaction.md";
import labelSeries from "../../docs/label-series.md";
import legends from "../../docs/legends.md";
import lineMarkSeries from "../../docs/line-mark-series.md";
import lineSeries from "../../docs/line-series.md";
import markSeries from "../../docs/mark-series.md";
import parallel from "../../docs/parallel-coordinates.md";
import polygonSeries from "../../docs/polygon-series.md";
import presentation from "../../docs/presentation.md";
import radar from "../../docs/radar-chart.md";
import radial from "../../docs/radial-chart.md";
import rectSeries from "../../docs/rect-series.md";
import sankey from "../../docs/sankey.md";
import scalesAndData from "../../docs/scales-and-data.md";
import series from "../../docs/series.md";
import style from "../../docs/style.md";
import sunburst from "../../docs/sunburst.md";
import treemap from "../../docs/treemap.md";
import voronoi from "../../docs/voronoi.md";
import whiskerSeries from "../../docs/whisker-series.md";
import xy from "../../docs/xy-plot.md";

const mdRoutes = [
  {
    name: 'Examples',
    path: '/examples',
    data: [
      {
        name: 'Showcases',
        children: [
          {
            name: 'Plots',
            markdown: plotsShowcase
          },
          {
            name: 'Axes',
            markdown: axesShowcase
          },
          {
            name: 'Legends',
            markdown: legendsShowcase
          },
          {
            name: 'Sunbursts',
            markdown: sunburstShowcase
          },
          {
            name: 'Radial',
            markdown: radialShowcase
          },
          {
            name: 'Sankeys',
            markdown: sankeysShowcase
          },
          {
            name: 'Treemaps',
            markdown: treemapsShowcase
          },
          {
            name: 'Radar Charts',
            markdown: radarShowcase
          },
          {
            name: 'Misc',
            markdown: miscShowcase
          }
        ]
      },
      {
        name: 'Charts',
        children: [
          {
            name: 'Candlestick',
            markdown: extensibility
          },
          {
            name: 'Force Directed Graph',
            markdown: otherThings
          },
          {
            name: 'Streamgraph',
            markdown: streamGraph
          },
          {
            name: 'Dynamic Dashboard',
            markdown: irisDashboard
          },
          {
            name: 'Responsive Vis',
            markdown: responsiveVis
          }
        ]
      }
    ]
  },
  {
    name: 'Documentation',
    path: '/documentation',
    data: [
      {
        name: 'Welcome to React-vis',
        markdown: presentation
      },
      {
        name: 'Getting Started',
        children: [
          {
            name: 'React-vis in codepen',
            markdown: codepen
          },
          {
            name: 'Installing react-vis',
            markdown: install
          },
          {
            name: 'Creating a new react-vis project',
            markdown: newProject
          },
          {
            name: 'Your first chart',
            markdown: first
          }
        ]
      },
      {
        name: 'General principles',
        children: [
          {
            name: 'Scales and data',
            markdown: scalesAndData
          },
          {
            name: 'Colors',
            markdown: colors
          },
          {
            name: 'Interaction',
            markdown: interaction
          },
          {
            name: 'Animation',
            markdown: animation
          },
          {
            name: 'Style',
            markdown: style
          }
        ]
      },
      {
        name: 'API Reference',
        children: [
          {
            name: 'XY-Plot',
            markdown: xy
          },
          {
            name: 'Series',
            markdown: series
          },
          {
            name: 'Brushing and Dragging',
            markdown: highlight
          },
          {
            name: 'Legends',
            markdown: legends
          },
          {
            name: 'Crosshair',
            markdown: crosshair
          },
          {
            name: 'Grids',
            markdown: grids
          },
          {
            name: 'Hint',
            markdown: hint
          },
          {
            name: 'Axes',
            markdown: axes
          },
          {
            name: 'ChartLabel',
            markdown: chartLabel
          },
          {
            name: 'DecorativeAxis',
            markdown: decorativeAxis
          },
          {
            name: 'Gradients',
            markdown: gradients
          },
          {
            name: 'Flexible plots',
            markdown: flexiblePlots
          },
          {
            name: 'Borders',
            markdown: borders
          },
          {
            name: 'Voronoi',
            markdown: voronoi
          }
        ]
      },
      {
        name: 'Series reference',
        children: [
          {
            name: 'Arc Series',
            markdown: arcSeries
          },
          {
            name: 'Area Series',
            markdown: areaSeries
          },
          {
            name: 'Bar Series',
            markdown: barSeries
          },
          {
            name: 'Contour Series',
            markdown: contourSeries
          },
          {
            name: 'Custom SVG Series',
            markdown: customSvgSeries
          },
          {
            name: 'Heatmap Series',
            markdown: heatmapSeries
          },
          {
            name: 'Hexbin Series',
            markdown: hexbinSeries
          },
          {
            name: 'Label Series',
            markdown: labelSeries
          },
          {
            name: 'Line Series',
            markdown: lineSeries
          },
          {
            name: 'Line-Mark Series',
            markdown: lineMarkSeries
          },
          {
            name: 'Mark Series',
            markdown: markSeries
          },
          {
            name: 'Polygon Series',
            markdown: polygonSeries
          },
          {
            name: 'Rect Series',
            markdown: rectSeries
          },
          {
            name: 'Whisker Series',
            markdown: whiskerSeries
          }
        ]
      },
      {
        name: 'Other Charts',
        children: [
          {
            name: 'Parallel Coordinates',
            markdown: parallel
          },
          {
            name: 'Radar Chart',
            markdown: radar
          },
          {
            name: 'Radial Chart',
            markdown: radial
          },
          {
            name: 'Sankey Diagram',
            markdown: sankey
          },
          {
            name: 'Sunburst Diagram',
            markdown: sunburst
          },
          {
            name: 'Treemap',
            markdown: treemap
          }
        ]
      }
    ]
  }
];

// Ocular searches for links with at least one '/' and replaces them
// with the first route it finds that includes the same markdown name
// (that is error prone, and that's why current Axes links will all
// point to Example Axes page instead of Documentation Axes page)
const fixMarkdownLinks = markdown => {
  const markdownLinksRegex = /(?:\(([^()/\n]+\.md)\))/g;
  return markdown.replace(markdownLinksRegex, '(/$1)');
};

mdRoutes.forEach(section => {
  section.data.forEach(subsection => {
    if (subsection.markdown) {
      subsection.markdown = fixMarkdownLinks(subsection.markdown);
    } else {
      subsection.children.forEach(child => {
        child.markdown = fixMarkdownLinks(child.markdown);
      });
    }
  });
});

export default mdRoutes;
