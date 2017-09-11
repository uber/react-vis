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

import sankey from '../../docs/sankey.md';
import treemap from '../../docs/treemap.md';
import radar from '../../docs/radar-chart.md';
import radial from '../../docs/radial-chart.md';
import sunburst from '../../docs/sunburst.md';

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

export default [{
  name: 'Examples',
  path: '/examples',
  data: [{
    name: 'Showcases',
    children: [{
      name: 'Plots',
      markdown: plotsEx,
    }, {
      name: 'Axes',
      markdown: axesEx,
    }, {
      name: 'Legends',
      markdown: legendsEx,
    }, {
      name: 'Sunbursts',
      markdown: sunburstEx,
    }, {
      name: 'Radial',
      markdown: radialEx,
    }, {
      name: 'Sankeys',
      markdown: sankeyEx,
    }, {
      name: 'Treemaps',
      markdown: treemapEx,
    }, {
      name: 'Radar Charts',
      markdown: radarEx,
    }, {
      name: 'Misc',
      markdown: miscEx,
    }],
  }, {
    name: 'Charts',
    children: [{
      name: 'Candlestick',
      markdown: extensibility,
    }, {
      name: 'Force Directed Graph',
      markdown: otherThings,
    }, {
      name: 'Streamgraph',
      markdown: streamGraph,
    }, {
      name: 'Responsive Vis',
      markdown: responsiveVis,
    }, {
      name: 'Zoomable Chart',
      markdown: zoomableChart,
    }, {
      name: 'Git History',
      markdown: gitHistory,
    }],
  }],
}, {
  name: 'Documentation',
  path: '/documentation',
  data: [{
    name: 'Getting Started',
    children: [{
      name: 'React-vis in codepen',
      markdown: codepen
    }, {
      name: 'Installing react-vis',
      markdown: install,
    }, {
      name: 'Creating a new react-vis project',
      markdown: newProject,
    }, {
      name: 'Your first chart',
      markdown: first,
    }],
  }, {
    name: 'General principles',
    children: [{
      name: 'Scales and data',
      markdown: scalesAndData
    }, {
      name: 'Colors',
      markdown: colors,
    }, {
      name: 'Interaction',
      markdown: interaction,
    }, {
      name: 'Animation',
      markdown: animation,
    }, {
      name: 'Style',
      markdown: style,
    }],
  }, {
    name: 'API Reference',
    children: [
      {
        name: 'XY-Plot',
        markdown: xy,
      }, {
        name: 'Series',
        markdown: series,
      }, {
        name: 'Legends',
        markdown: legends,
      }, {
        name: 'Crosshair',
        markdown: crosshair,
      }, {
        name: 'Grids',
        markdown: grids,
      }, {
        name: 'Hint',
        markdown: hint,
      }, {
        name: 'Axes',
        markdown: axes,
      }, {
        name: 'DecorativeAxis',
        markdown: decorativeAxis,
      }, {
        name: 'Gradients',
        markdown: gradients,
      }, {
        name: 'Flexible plots',
        markdown: flexiblePlots,
      }, {
        name: 'Borders',
        markdown: borders,
      },
    ],
  }, {
    name: 'Series reference',
    children: [
      {
        name: 'Arc Series',
        markdown: arcSeries,
      }, {
        name: 'Area Series',
        markdown: arcSeries,
      }, {
        name: 'Bar Series',
        markdown: barSeries,
      }, {
        name: 'Contour Series',
        markdown: contourSeries,
      }, {
        name: 'Custom SVG Series',
        markdown: customSvgSeries,
      }, {
        name: 'Heatmap Series',
        markdown: heatmapSeries,
      }, {
        name: 'Label Series',
        markdown: labelSeries,
      }, {
        name: 'Line Series',
        markdown: lineSeries,
      }, {
        name: 'Line-Mark Series',
        markdown: lineMarkSeries,
      }, {
        name: 'Mark Series',
        markdown: markSeries,
      }, {
        name: 'Polygon Series',
        markdown: polygonSeries,
      }, {
        name: 'Rect Series',
        markdown: rectSeries,
      }, {
        name: 'Whisker Series',
        markdown: whiskerSeries,
      },
    ],
  }, {
    name: 'Other Charts',
    children: [{
      name: 'Sankey Diagram',
      markdown: sankey,
    }, {
      name: 'Treemap',
      markdown: treemap,
    }, {
      name: 'Radar Chart',
      markdown: radar,
    }, {
      name: 'Radial Chart',
      markdown: radial,
    }, {
      name: 'Sunburst Diagram',
      markdown: sunburst,
    }],
  }],
}]
