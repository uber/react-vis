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

<h1 align="center">react-vis | <a href="http://uber.github.io/react-vis">Demos</a></h1>

<h5 align="center">Data Visualization oriented components</h5>

![demo](docs/assets/react-vis.gif?raw=true)

## Overview

A collection of react components to render common data visualization charts,
such as **line/area/bar charts**, **heat maps**, **scatterplots**, **pie and donut charts**
with fixed headers and **tree maps**.

Some notable features:

- Simplicity. `react-vis` doesn't require any deep knowledge of data visualization libraries to start building your first visualizations.
- Flexibility. `react-vis` provides a set of basic building blocks for different charts. For instance, separate X and Y axis components. This provides a high level of control of chart layout for applications that need it.
- Ease of use. The library provides a set of defaults which can be overriden by the custom user's settings.
- Integration with React. `react-vis` supports the React's lifecycle and doesn't create unnecessary nodes.

## Breaking changes

We recently made a major jump to version v1, which naturally includes some breaking changes. Specifically these include

*Table is deprecated*: There are other substantially better tables in the ecosystem, so we decided to stick to what we do best, charts and plots.
*Stylesheet has been moved*: the stylesheet for react-vis can now be found within the dist folder, so simply modify your style import to be:

```
@import './node_modules/react-vis/dist/main';
```

*Default Opacity*: The default opacity behavior has been modified. Previously, react-vis asserted you had a linear scale with range [0.1, 1] and place your value within that range. Now react-vis presents a literal-scale by default. Check your opacities to make sure they are correct.
*tickSizeInner & tickSizeOuter have been reversed*: the names of these props on the axes component have been switched. We feel this arrangement offers a more natural way to interact with the plot.
*ALIGN.TOP_RIGHT was removed from hint.js*: this case did not match the orientation scheme followed by this component so was removed.

## Usage

Install react-vis via npm.

    npm install react-vis --save

Include the built main CSS file in your HTML page or via SASS:
```sass
@import "./node_modules/react-vis/dist/style";
```

You can also select only the styles you want to use. This helps minimize the size of the outputted CSS. Here's an example of importing only the legends styles:
```sass
@import "./node_modules/react-vis/dist/styles/legends";
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

## More information

Take a look at the [folder with examples](examples/) or check out some docs:

- Common concepts:
  * [Scales and Data](docs/scales-and-data.md) about how the attributes can be adjusted.
  * [Animations](docs/animation.md) about how to tweak animations in the library.
- Components:
  * [XYPlot](docs/xy-plot.md) about orthogonal charts.
  * [RadialChart](docs/radial-chart.md) about radial charts.
  * [Treemap](docs/treemap.md) about making tree maps.
  * [Legends](docs/legends.md) about the legends.

## Development

To develop on this component, install the dependencies and then build and watch the static files:

    npm install && npm run watch

Once complete, you can view the component's example in your browser (will open automatically).
Any changes you make to the example code will run the compiler to build the files again.

To lint your code, run the tests, and create code coverage reports:

    npm test
