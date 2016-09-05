# react-vis ![Build Status](https://travis-ci.org/uber/react-vis.svg?branch=master)

![Demo of XYPlot](docs/assets/react-vis.gif?raw=true)

See the live demo at http://uber.github.io/react-vis

## Overview

A collection of react components to render common data visualization charts, such as **line/area/bar charts**, **heat maps**, **scatteplots**, **pie and donut charts**, **tables** with fixed headers and **tree maps**.

Some notable features:

- Simplicity. `react-vis` doesn't require any deep knowledge of data visualization libraries to start building your first visualizations.
- Flexibility. `react-vis` provides a set of basic building blocks for different charts. For instance, separate X and Y axis components. This provides a high level of control of chart layout for applications that need it.
- Ease of use. The library provides a set of defaults which can be overriden by the custom user's settings.
- Integration with React. `react-vis` supports the React's lifecycle and doesn't create unnecessary nodes.

## Usage

Install react-vis via npm.

```shell
npm install react-vis
```

Include the CSS from `./node_modules/react-vis/main` in your HTML page or via SASS:
```sass
@import "./node_modules/react-vis/main";
```

Import the necessary components from the library&hellip;

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

Take a look at the [folder with examples](src/example) or check out some docs:

- Common concepts:
  * [Scales and Data](docs/scales-and-data.md) about how the attributes can be adjusted.
  * [Animations](docs/animation.md) about how to tweak animations in the library.
- Components:
  * [XYPlot](docs/xy-plot.md) about orthogonal charts.
  * [RadialChart](docs/radial-chart.md) about radial charts.
  * [Table](docs/table.md) about table.
  * [Treemap](docs/treemap.md) about making tree maps.
  * [Legends](docs/legends.md) about the legends.

## Development

To develop on this component, install the dependencies and then build and watch the static files:

```
npm install && npm run watch
```

Once complete, you can view the component's example in your browser (will open automatically). Any changes you make to the example code will run the compiler to build the files again.

To lint your code, run the tests, and create code coverage reports:
```
npm test
```

## Change log

### 0.6.1

* Bugfix: axis is misplaced when `orientation` is set to `'right'`([#143](https://github.com/uber/react-vis/issues/143)).

### 0.6

#### TL;DR

New legends (sic!), new animations, faster rendering of components, no d3 in actual rendering process, new examples and more.

#### Breaking changes

* `animation` property works differently: duration is removed in favor of stiffness, damping and precision. Please refer to the documentation for the latest changes.

#### Non-breaking changes

* Feature: added the first version of legends (discrete and continuous color legends, continuous size legend). Please refer to the [docs for legends](docs/legends.md) for more details.
* Improvement: got rid of assigning properties with d3 after rendering, currently all attributes and event listeners are attached using React (and it is faster).
* Improvement: eliminated the use of `d3-selection` and `d3-transition` modules and made the source code smaller.
* Improvement: added some structure into the examples and simplified their source code ([check them out](http://uber.github.com/react-vis)).
* Bugfix: fixed crashing on animation (#114).
* Improvement: `onNearestX` event now returns the index of the selected data point as an attribute (more details [here](docs/xy-plot.md#onnearestx-optional))
* Bugfix: added the donut chart to the list of examples ([#83](https://github.com/uber/react-vis/issues/83)).
* Bugfix: fixed failing bar charts when the number of segments was changed ([#55](https://github.com/uber/react-vis/issues/55)).

### 0.5

#### TL;DR

Upgraded to modular d3, compiled code became smaller, changed the API for axes and grids, fixed several bugs.

#### Breaking changes

* d3-axis is no longer used, the rendering of axes and grids is made by react (and works faster).
* The API of axes (`XAxis` and `YAxis`) was significantly changed: now it is (almost) compatible with the API of d3-axis. Please refer to [the updated documentation for axes](docs/xy-plot.md#axes) for more detail.
* The API of grids (`VerticalGridLines` and `HorizontalGridLines`) was significantly changed: it partially replicates the API of the axes.  Please refer to [the updated documentation ](docs/xy-plot.md#grids) for more detail. 

#### Non-breaking changes

* Bugfix: `margin` for the radial and ortogonal chart is now able to receive partial objects (e. g.`<XYPlot margin={{left: 20}}>` instead of margins for each side) and numbers (e.g. `<XYPlot margin={20}>`)
* Bugfix: `makeVisFlexible` doesn't fail anymore (see [#118](https://github.com/uber-common/react-vis/issues/118)).
* Minor bugfixes and improvements.

Please find [full change log here](https://github.com/uber/react-vis/releases).
