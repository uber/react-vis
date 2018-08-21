import presentation from '../../docs/presentation.md';

import codepen from '../../docs/getting-started/react-vis-in-codepen.md';
import install from '../../docs/getting-started/installing-react-vis.md';
import newProject from '../../docs/getting-started/new-react-vis-project.md';
import first from '../../docs/getting-started/your-first-chart.md';

import scalesAndData from '../../docs/scales-and-data.md';
import colors from '../../docs/colors.md';
import interaction from '../../docs/interaction.md';
import animation from '../../docs/animation.md';
import style from '../../docs/style.md';

import xy from '../../docs/xy-plot.md';
import series from '../../docs/series.md';
import legends from '../../docs/legends.md';
import crosshair from '../../docs/crosshair.md';
import grids from '../../docs/grids.md';
import hint from '../../docs/hint.md';
import axes from '../../docs/axes.md';
import decorativeAxis from '../../docs/decorative-axis.md';
import gradients from '../../docs/gradients.md';
import flexiblePlots from '../../docs/flexible-plots.md';
import borders from '../../docs/borders.md';
import voronoi from '../../docs/voronoi.md';

import arcSeries from '../../docs/arc-series.md';
import areaSeries from '../../docs/area-series.md';
import barSeries from '../../docs/bar-series.md';
import contourSeries from '../../docs/contour-series.md';
import customSvgSeries from '../../docs/custom-svg-series.md';
import heatmapSeries from '../../docs/heatmap-series.md';
import labelSeries from '../../docs/label-series.md';
import lineSeries from '../../docs/line-series.md';
import lineMarkSeries from '../../docs/line-mark-series.md';
import markSeries from '../../docs/mark-series.md';
import polygonSeries from '../../docs/polygon-series.md';
import rectSeries from '../../docs/rect-series.md';
import whiskerSeries from '../../docs/whisker-series.md';

import parallel from '../../docs/parallel-coordinates.md';
import radar from '../../docs/radar-chart.md';
import radial from '../../docs/radial-chart.md';
import sankey from '../../docs/sankey.md';
import sunburst from '../../docs/sunburst.md';
import treemap from '../../docs/treemap.md';

import plotsEx from '../../docs/examples/showcases/plots-showcase.md';
import axesEx from '../../docs/examples/showcases/axes-showcase.md';
import legendsEx from '../../docs/examples/showcases/legends-showcase.md';
import sunburstEx from '../../docs/examples/showcases/sunburst-showcase.md';
import radialEx from '../../docs/examples/showcases/radial-showcase.md';
import sankeyEx from '../../docs/examples/showcases/sankeys-showcase.md';
import treemapEx from '../../docs/examples/showcases/treemaps-showcase.md';
import radarEx from '../../docs/examples/showcases/radar-chart-showcase.md';
import miscEx from '../../docs/examples/showcases/misc-showcase.md';

import extensibility from '../../docs/examples/extensibility.md';
import otherThings from '../../docs/examples/building-things-other-than-charts.md';
import streamGraph from '../../docs/examples/stream-graph.md';
import responsiveVis from '../../docs/examples/responsive-vis.md';
import zoomableChart from '../../docs/examples/zoomable-chart.md';
import gitHistory from '../../docs/examples/history-example.md';

// Ocular searches for links with at least one '/' and replaces them
// with the first route it finds that includes the same markdown name
// (that is error prone, and that's why current Axes links will all
// point to Example Axes page instead of Documentation Axes page)
const fixMarkdownLinks = (markdown) => {
  const markdownLinksRegex = /(?:\(([^()/\n]+\.md)\))/g;
  return markdown.replace(markdownLinksRegex, '(/$1)');
};

export default [
  {
    name: 'Examples',
    path: '/examples',
    data: [
      {
        name: 'Showcases',
        children: [
          {
            name: 'Plots',
            markdown: fixMarkdownLinks(plotsEx)
          },
          {
            name: 'Axes',
            markdown: fixMarkdownLinks(axesEx)
          },
          {
            name: 'Legends',
            markdown: fixMarkdownLinks(legendsEx)
          },
          {
            name: 'Sunbursts',
            markdown: fixMarkdownLinks(sunburstEx)
          },
          {
            name: 'Radial',
            markdown: fixMarkdownLinks(radialEx)
          },
          {
            name: 'Sankeys',
            markdown: fixMarkdownLinks(sankeyEx)
          },
          {
            name: 'Treemaps',
            markdown: fixMarkdownLinks(treemapEx)
          },
          {
            name: 'Radar Charts',
            markdown: fixMarkdownLinks(radarEx)
          },
          {
            name: 'Misc',
            markdown: fixMarkdownLinks(miscEx)
          }
        ]
      },
      {
        name: 'Charts',
        children: [
          {
            name: 'Candlestick',
            markdown: fixMarkdownLinks(extensibility)
          },
          {
            name: 'Force Directed Graph',
            markdown: fixMarkdownLinks(otherThings)
          },
          {
            name: 'Streamgraph',
            markdown: fixMarkdownLinks(streamGraph)
          },
          {
            name: 'Responsive Vis',
            markdown: fixMarkdownLinks(responsiveVis)
          },
          {
            name: 'Zoomable Chart',
            markdown: fixMarkdownLinks(zoomableChart)
          },
          {
            name: 'Git History',
            markdown: fixMarkdownLinks(gitHistory)
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
        markdown: fixMarkdownLinks(presentation)
      },
      {
        name: 'Getting Started',
        children: [
          {
            name: 'React-vis in codepen',
            markdown: fixMarkdownLinks(codepen)
          },
          {
            name: 'Installing react-vis',
            markdown: fixMarkdownLinks(install)
          },
          {
            name: 'Creating a new react-vis project',
            markdown: fixMarkdownLinks(newProject)
          },
          {
            name: 'Your first chart',
            markdown: fixMarkdownLinks(first)
          }
        ]
      },
      {
        name: 'General principles',
        children: [
          {
            name: 'Scales and data',
            markdown: fixMarkdownLinks(scalesAndData)
          },
          {
            name: 'Colors',
            markdown: fixMarkdownLinks(colors)
          },
          {
            name: 'Interaction',
            markdown: fixMarkdownLinks(interaction)
          },
          {
            name: 'Animation',
            markdown: fixMarkdownLinks(animation)
          },
          {
            name: 'Style',
            markdown: fixMarkdownLinks(style)
          }
        ]
      },
      {
        name: 'API Reference',
        children: [
          {
            name: 'XY-Plot',
            markdown: fixMarkdownLinks(xy)
          },
          {
            name: 'Series',
            markdown: fixMarkdownLinks(series)
          },
          {
            name: 'Legends',
            markdown: fixMarkdownLinks(legends)
          },
          {
            name: 'Crosshair',
            markdown: fixMarkdownLinks(crosshair)
          },
          {
            name: 'Grids',
            markdown: fixMarkdownLinks(grids)
          },
          {
            name: 'Hint',
            markdown: fixMarkdownLinks(hint)
          },
          {
            name: 'Axes',
            markdown: fixMarkdownLinks(axes)
          },
          {
            name: 'DecorativeAxis',
            markdown: fixMarkdownLinks(decorativeAxis)
          },
          {
            name: 'Gradients',
            markdown: fixMarkdownLinks(gradients)
          },
          {
            name: 'Flexible plots',
            markdown: fixMarkdownLinks(flexiblePlots)
          },
          {
            name: 'Borders',
            markdown: fixMarkdownLinks(borders)
          },
          {
            name: 'Voronoi',
            markdown: fixMarkdownLinks(voronoi)
          }
        ]
      },
      {
        name: 'Series reference',
        children: [
          {
            name: 'Arc Series',
            markdown: fixMarkdownLinks(arcSeries)
          },
          {
            name: 'Area Series',
            markdown: fixMarkdownLinks(areaSeries)
          },
          {
            name: 'Bar Series',
            markdown: fixMarkdownLinks(barSeries)
          },
          {
            name: 'Contour Series',
            markdown: fixMarkdownLinks(contourSeries)
          },
          {
            name: 'Custom SVG Series',
            markdown: fixMarkdownLinks(customSvgSeries)
          },
          {
            name: 'Heatmap Series',
            markdown: fixMarkdownLinks(heatmapSeries)
          },
          {
            name: 'Label Series',
            markdown: fixMarkdownLinks(labelSeries)
          },
          {
            name: 'Line Series',
            markdown: fixMarkdownLinks(lineSeries)
          },
          {
            name: 'Line-Mark Series',
            markdown: fixMarkdownLinks(lineMarkSeries)
          },
          {
            name: 'Mark Series',
            markdown: fixMarkdownLinks(markSeries)
          },
          {
            name: 'Polygon Series',
            markdown: fixMarkdownLinks(polygonSeries)
          },
          {
            name: 'Rect Series',
            markdown: fixMarkdownLinks(rectSeries)
          },
          {
            name: 'Whisker Series',
            markdown: fixMarkdownLinks(whiskerSeries)
          }
        ]
      },
      {
        name: 'Other Charts',
        children: [
          {
            name: 'Parallel Coordinates',
            markdown: fixMarkdownLinks(parallel)
          },
          {
            name: 'Radar Chart',
            markdown: fixMarkdownLinks(radar)
          },
          {
            name: 'Radial Chart',
            markdown: fixMarkdownLinks(radial)
          },
          {
            name: 'Sankey Diagram',
            markdown: fixMarkdownLinks(sankey)
          },
          {
            name: 'Sunburst Diagram',
            markdown: fixMarkdownLinks(sunburst)
          },
          {
            name: 'Treemap',
            markdown: fixMarkdownLinks(treemap)
          }
        ]
      }
    ]
  }
];
