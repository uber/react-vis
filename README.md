# react-vis
![Demo of XYPlot](docs/assets/react-vis.gif?raw=true)

See the live demo at http://uber-common.github.io/react-vis/

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

### 0.2

#### Breaking changes

* `BarSeries` component was split into `VerticalBarSeries` and `HorizontalBarSeries`; no `orientation` property is needed anymore.
* All bar series are aligned to `0` by default. The value can be modified with `[scale-name]BaseValue` property.
* Alignment of the `Hint` component was fixed: now `topleft` orientation aligns it to the top left corner, but not to the bottom right.

### Non-breaking changes:

* Static getters for `displayName` were removed (interverring with livereactload).
* More tests were added.
