<p align="right">
  <a href="https://npmjs.org/package/react-vis">
    <img src="https://img.shields.io/npm/v/react-vis.svg?style=flat-square" alt="version" />
  </a>
  <a href="https://travis-ci.org/uber/react-vis">
    <img src="https://img.shields.io/travis/uber/react-vis/master.svg?style=flat-square" alt="build" />
  </a>
  <a href="https://coveralls.io/github/uber/react-vis">
    <img src="https://img.shields.io/coveralls/uber/react-vis.svg?style=flat-square" alt="build" />
  </a>
  <a href="https://npmjs.org/package/react-vis">
    <img src="https://img.shields.io/npm/dm/react-vis.svg?style=flat-square" alt="downloads" />
  </a>
  <a href="http://starveller.sigsev.io/uber/react-vis">
    <img src="http://starveller.sigsev.io/api/repos/uber/react-vis/badge" alt="stars" />
  </a>
</p>

<h1 align="center">react-vis | <a href="http://uber.github.io/react-vis/examples/showcases/axes">Demos</a> | <a href="http://uber.github.io/react-vis/documentation/getting-started/creating-a-new-react-vis-project">Docs</a></h1>

<h5 align="center">A COMPOSABLE VISUALIZATION SYSTEM</h5>

![demo](docs/assets/react-vis.gif?raw=true)

## Overview

A collection of react components to render common data visualization charts, such as **line/area/bar charts**, **heat maps**, **scatterplots**, **contour plots**, **pie and donut charts**, **sunbursts**, **radar charts**, **parallel coordinates**, and **tree maps**.

Some notable features:

- Simplicity. `react-vis` doesn't require any deep knowledge of data visualization libraries to start building your first visualizations.
- Flexibility. `react-vis` provides a set of basic building blocks for different charts. For instance, separate X and Y axis components. This provides a high level of control of chart layout for applications that need it.
- Ease of use. The library provides a set of defaults which can be overridden by the custom user's settings.
- Integration with React. `react-vis` supports the React's lifecycle and doesn't create unnecessary nodes.

## Usage

Install react-vis via npm.

    npm install react-vis --save

Include the built main CSS file in your HTML page or via SASS:
```sass
@import "~react-vis/dist/style";
```

You can also select only the styles you want to use. This helps minimize the size of the outputted CSS. Here's an example of importing only the legends styles:
```sass
@import "~react-vis/dist/styles/legends";
```

Import the necessary components from the library...

```jsx
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';
```

&hellip; and add the following code to your `render` function:

```jsx
<XYPlot
  width={300}
  height={300}>
  <HorizontalGridLines />
  <LineSeries
    data={[
      {x: 1, y: 10},
      {x: 2, y: 5},
      {x: 3, y: 15}
    ]}/>
  <XAxis />
  <YAxis />
</XYPlot>
```

If you're working in a non-node environment, you can also directly include the bundle and compiled style using basic html tags.

```html
<link rel="stylesheet" href="https://unpkg.com/react-vis/dist/style.css">
<script type="text/javascript" src="https://unpkg.com/react-vis/dist/dist.min.js"></script>
```

The global `reactVis` object will now be available for you to play around.

You can checkout these example CodePens:
[#1](https://codepen.io/Apercu/pen/mmLOpY?editors=0010),
[#2](https://codepen.io/jckr/pen/oWZPJe?editors=0010),
[#3](https://codepen.io/jckr/pen/BRpReQ?editors=0010) or
[#4](https://codepen.io/jckr/pen/aWmRGx?editors=0010)

## More information

Take a look at the [folder with examples](showcase/examples/) or check out some docs:

- Common concepts:
  * [Scales and Data](docs/scales-and-data.md) about how the attributes can be adjusted.
  * [Animations](docs/animation.md) about how to tweak animations in the library.
- Components:
  * [XYPlot](docs/xy-plot.md) about orthogonal charts.
  * [RadialChart](docs/radial-chart.md) about radial charts.
  * [Treemap](docs/treemap.md) about making tree maps.
  * [Sankey](docs/sankey.md) about making sankey diagrams.
  * [Radar Chart](docs/radar-chart.md) about making radar charts.
  * [Parallel Coordinates](docs/parallel-coordinates.md) about making parallel coordinate charts.
  * [Sunbursts](docs/sunburst.md) about making sunburst diagrams.
  * [Legends](docs/legends.md) about the legends.

## Development

To develop on this component, install the dependencies and then build and watch the static files:

    npm install && npm run start

Once complete, you can view the component's example in your browser (will open automatically).
Any changes you make to the example code will run the compiler to build the files again.

To lint your code, run the tests, and create code coverage reports:

    npm run full-test

## Requirements

react-vis makes use of ES6 array methods such as [`Array.prototype.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find). If you make use of react-vis, in an environment without these methods, you'll see errors like `TypeError: Server rendering error: Object x,y,radius,angle,color,fill,stroke,opacity,size has no method 'find'`. You can use [`babel-polyfill`](https://babeljs.io/docs/usage/polyfill/) to polyfill these methods.
