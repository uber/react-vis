## v1.9.2
- we removed the check-stylesheets warnings.
- it's now possible to pass better styling options for radial charts labels. It's also possible to position axis titles along the axis.
- react-motion and react minimal versions have been updated. 

---

## v1.0.0 Breaking changes

We recently made a major jump to version v1, which naturally includes some breaking changes. Specifically these include

*Table is deprecated*: There are other substantially better tables in the ecosystem, so we decided to stick to what we do best, charts and plots.
*Stylesheet has been moved*: the stylesheet for react-vis can now be found within the dist folder, so simply modify your style import to be:

```
@import './node_modules/react-vis/dist/main';
```

*Default Opacity*: The default opacity behavior has been modified. Previously, react-vis asserted you had a linear scale with range [0.1, 1] and place your value within that range. Now react-vis presents a literal-scale by default. Check your opacities to make sure they are correct.
*tickSizeInner & tickSizeOuter have been reversed*: the names of these props on the axes component have been switched. We feel this arrangement offers a more natural way to interact with the plot.
*ALIGN.TOP_RIGHT was removed from hint.js*: this case did not match the orientation scheme followed by this component so was removed.

### v0.10.1

In this release we release a new chart type, a large repo refactor, address a variety of bugs, and a host of additional features!

- **New Chart**: Type: Sankey Diagram: this chart type allows users visualize data flows and transfers. We are initially releasing this chart in alpha, so that we can gather feedback, and iterate to make the best chart that we can! Check out the docs here here!

- **Bug Fix**: Fix numerous bugs on the radial plot, including mouse interaction issues, incorrect domains, and props falling out of sync

- **Refactor**: We reorganized the way that we are keeping/organizing our repo, installed yarn, added webpack for the examples. (Pro tip, if you are having trouble running the examples after upgrading rm -rf your dist)

- **Feature**: Allow custom crosshair orientation

- **Feature**: Added interaction listeners for the tree map

### v0.9.0

This release addresses a couple of bugs and improves our dep tree. The only psuedo-breaking change is to the layout of radial plot. The way that it now works is that the pie is centered within the given width/height and then allowed to grow to an innerWidth/innerHeight that is computed from the margins and the width/height.

- Bug: Modify margin system for radial chart
- Improvement: Support for classname on legends
- Chore: Remove duplicated styles
- Bug: Add default props to classname for axis
- Chore: Update deps, fix lint errors

### v0.8.0
This release adds two new props (and set of illustrative examples) to Hint component: ```align``` and ```getAlignStyle```. ```align``` (replacing ```orientation``` prop) is an object with two props &mdash; ```horizontal``` and ```vertical``` &mdash; and set of values that support existing and new hint placement:
  a) around a data point in one of four quadrants (imagine the point bisected by two axes &mdash; vertical, horizontal &mdash; creating 4 quadrants around a data point).
  b) **New**: pin to an edge of chart/plot area and position along that edge using data point's other dimension value.

Developers wanting total control can use the ```getAlignStyle(align, x, y)``` function that returns an inline style object with one or more of the following props (```left, right, top, bottom```).

The ```orientation``` prop is supported for backwards compatibility but will be deprecated in future release.

See the following figure explaining the two props  (```horizontal, vertical```) for the ```align``` prop object.
![react-vis-hint](https://cloud.githubusercontent.com/assets/2983206/21572148/f1529198-ce8a-11e6-8dc3-ef5f320ab9a1.png)

### v0.7.0
This release adds a new series: rectSeries. Rect series operates similarly to barSeries: they consist of a series of rectangles of various size that be stacked, but with one key difference. Where the bar series operates on the assumption of an ordinal axis, rect series operates on an assumption of a continuous one. This allows users to specify the positions of the edges of their rectangles!

![alt text](https://cloud.githubusercontent.com/assets/6854312/21075697/47f1bbfa-becd-11e6-9f67-9c1ab5ad5e83.png "example histogram")

Rect series are great for histograms, as they allow you to exactly specify the bounds of buckets. They can be accessed via VerticalRectSeries and HorizontalRectSeries. Check out the examples for more details. This is non breaking change, and can be dropped in immediately.


### v0.6.8
- Feature: Export Abstract series and the rest of the functions in scale utils.
- Feature: Add specific class names to x and y axes

### v0.6.6

- Improvement: added line smoothing via d3-shape curve functions ([#185](https://github.com/uber/react-vis/pull/185)).
- Improvement: Expose GridLines, AxisLines, and ScaleUtils to export
- Improvement: Add className prop to all series
- Documentation: Expand tree map example
- Documentation: Add elevated area chart example

### 0.6.4

- Bugfix: Fixed the issue with numeric titles in legends ([#154](https://github.com/uber/react-vis/pull/154)).

### 0.6.3

- Bugfix: fix the broken event listeners for radial charts ([#150](https://github.com/uber/react-vis/issues/150));
- Bugfix: compatibility fix: do not treat `null` and `undefined` in scale props as existing values ([#149](https://github.com/uber/react-vis/issues/149)).

### 0.6.2

* Feature: added a new `tickLabelAngle` property that rotates the tick label ([see the documentation](docs/xy-plot.md#ticklabelangle-optional) for details).
* Improvement: added a little bit of examples for the axes.
* Bugfix: fixed misplaced axis title when orientation is set to `'top'` or `'right'` ([#146](https://github.com/uber/react-vis/issues/146)).

### 0.6.1

* Bugfix: axis is misplaced when `orientation` is set to `'right'`([#143](https://github.com/uber/react-vis/issues/143)).

### 0.6

#### TL;DR

New legends (sic!), new animations, faster rendering of components, no d3 in actual rendering process, new examples and more.

#### Breaking changes

* `animation` property works differently: duration is removed in favor of stiffness, damping and precision. Please refer to the documentation for the latest changes.
* `undefined` and `null` values of important scale-related attributes for domains and ranges are now treated as real values (and not ignored anymore).

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
* The API of axes (`XAxis` and `YAxis`) was significantly changed:
  * [the API of axes](docs/xy-plot.md#axes) is now (almost) compatible to the API of 'd3-axis'.
  * `labelFormat` and `labelValues` attributes for the axes are **removed**: similar results can be done achieved when `tickFormat` and `tickValues` attributes are used (see the [the updated documentation for axes](docs/xy-plot.md#axes) for more details).
  * `tickFormat` function is now gets only **one (value) argument instead of two (value and index)**.
* The API of grids (`VerticalGridLines` and `HorizontalGridLines`) was significantly changed: it partially replicates the API of the axes.  Please refer to [the updated documentation ](docs/xy-plot.md#grids) for more detail.

#### Non-breaking changes

* Bugfix: `margin` for the radial and ortogonal chart is now able to receive partial objects (e. g.`<XYPlot margin={{left: 20}}>` instead of margins for each side) and numbers (e.g. `<XYPlot margin={20}>`)
* Bugfix: `makeVisFlexible` doesn't fail anymore (see [#118](https://github.com/uber-common/react-vis/issues/118)).
* Minor bugfixes and improvements.

Please find [full change log here](https://github.com/uber/react-vis/releases).
