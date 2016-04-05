# XYPlot

XYPlot allows you to make line charts, area charts, scatterplots, heat maps, etc with animations and different interactions between them.

Currently following components are used for this purpose:

* [XYPlot](#xyplot) to wrap all the items.
* [Grids](#grids) to show vertical and horizontal grids.
* [Axes](#axes) to show X and Y axis.
* [Different kinds of series](#series) for line/area/bar charts, scatterplots, heat maps, etc.
* [Hints](#hints) to show the selected hints.
* [Crosshair](#crosshair) for crosshairs.

## Usage

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
    color="red"
    data={[
      {x: 1, y: 10},
      {x: 2, y: 5},
      {x: 3, y: 15}
    ]}/>
  <XAxis title="X" />
  <YAxis />
</XYPlot>
```

## Common concepts

XYPlot is a wrapper for series, hints, axes and other components. Most of these components do not require any properties by default, however it is expected that the user will pass the `data` property into each series.

`data` is an array of objects. Each item is some point on the chart. Object may contain following properties:

* `x`
* `y`
* `opacity` (optional)
* `fill` (optional)
* `stroke` (optional)
* `color` (optional, used instead of `fill` and `stroke` if none of them is passed)
* `size` (optional)

If the property is not passed in any of the objects, the property is not visualized. The user can override the way how properties are visualized by passing custom range, domain or type of scales to the series or the entire chart (please see [Series](#series) for more info).

Not all properties can be visualized in each series. Here's a short comparison of them:

|                  | `x` | `y` | `color` | `opacity` | `size` |
|------------------|-----|-----|---------|-----------|--------|
| `LineSeries`     |  +  |  +  | +       |           |        |
| `AreaSeries`     |  +  |  +  | +       |           |        |
| `LinemarkSeries` |  +  |  +  | +       |     +     | +      |
| `MarkSeries`     |  +  |  +  | +       |     +     | +      |
| `BarSeries`      |  +  |  +  | +       |     +     |        |
| `HeatmapSeries`  |  +  |  +  | +       |     +     |        |

## API Reference

### XYPlot

`XYPlot` is a component that wraps series, axis and grids, hints, etc and seamlessly provides necessary dimensions, sizes and scales into its children.  
`XYPlot` may or may not contain axes, grids, hints, crosshairs or series.

#### width
Type: `number`  
Width of the chart. The height should be passed.

#### height
Type: `number`  
Height of the component. The height should be passed.

#### margin (optional)
Type: `Object`  
Default: `{left: 40, right: 40, top: 10, bottom: 10}`
Margin around the chart.

#### stackBy (optional)
Type: `string`  
Stack the chart by the given attribute. If the attribute is `y`, the chart is stacked vertically; if the attribute is `x` then it's stacked horizontally.

```jsx
<XYPlot
  stackBy="y"
  width={300}
  height={300}>
  <LineSeries
    data={[
      {x: 1, y: 10},
      {x: 2, y: 5},
      {x: 3, y: 15}
    ]}/>
  <LineSeries
    data={[
      {x: 1, y: 12},
      {x: 2, y: 21},
      {x: 3, y: 2}
    ]}/>
</XYPlot>
```

#### onMouseLeave (optional)
Type: `function()`  
The function that is triggered each time the mouse leaves the component.

#### onMouseMove (optional)
Type: `function()`  
The function that is triggered each time mouse moves over at the component.

#### onMouseEnter (optional)
Type: `function()`  
The function that is triggered each time the mouse enters the component.

#### animation (optional)
Type: `{duration: number}|boolean`
Default: `false`  
Animation config, which is automatically passed to all children, but can be overrided for the each child.  
If `false` is passed, then the child components *will not be* animated.  
If `true` is passed then the child components *will be* animated with the default settings.  
If an object is passed, then the child components *will be* animated with the given settings.

### Grids

`VerticalGridLines` and `HorizontalGridLines` show a grid inside the chart. Here is a short example:

```jsx
<XYPlot
  width={300}
  height={300}>
  <VerticalGridLines />
  <HorizontalGridLines />
</XYPlot>
```

Currently both components have following properties:

#### values (optional)
Type: `Array(<string|number>)`  
Array of y (for `HorizontalGrid`) or x (for `VerticalGrid`) values to show the gridlines at.

#### animation (optional)
See the [XYPlot](#api-reference)'s `animation` section for more information.

### Axes

`XAxis` and `YAxis` shows are responsible for the axis in the chart. Both of them have following properties:

#### title (optional)
Type: `string`  
Shows the title for the axis.

#### labelFormat (optional)
Type: `string | function | null`  
Label format for a chart.

#### tickFormat (optional)
Type: `string | function | null`  
Format function for a chart.

#### tickSize (optional)
Type: `number`  
Default: `7`  
Tick size.

#### labelValues (optional)
Type: `Array | null`  
The list of values to be shown as labels.

#### tickValues (optional)
Type: `Array | null`  
The list of values to be shown as ticks.

#### animation (optional)
See the [XYPlot](#api-reference)'s `animation` section for more information.


### Series

The library supports several types of series:

* `LineSeries` for lines;
* `AreaSeries` for area charts;
* `MarkSeries` for scatterplots;
* `LineMarkSeries` is a shorthand to place marks (e.g. circles) on lines;
* `BarSeries` for column and bar charts;
* `HeatmapSeries` for heat maps.

Each series provides following API:

#### data
Type: `Array<Object>`
Array of data for the series.

#### x
Type: `number|Object`  
Exact X position of all series points in pixels or a series object.

#### y (optional)  
Type: `number|Object`  
Exact Y position of all series points in pixels or a series object.

#### color (optional)
Type: `string|Object`
Exact color for all series points or a series object.

#### size (optional)
Type: `number|Object`  
Exact size for all series points in pixels or a series object.

#### opacity (optional)
Type: `number|Object`  
Exact opacity for all series points in pixels or a series object.

#### onNearestX (optional)
Type: `function(value, info)`  
A callback function which is triggered each time when the mouse pointer gets close to some X value.
Callback is triggered with two arguments. `value` is the data point, `info` consists of `innerX` (the left position of the value) and `event` (the React event).

#### onValueMouseOver (optional)
Type: `function(d, info)`  
`mouseover` event handler for the elements corresponding separate data points `d` is a data point, `info` is an object with the only `event` property.  
**NOTE**: This event handler is *not* triggered for AreaSeries and LineSeries.

#### onValueMouseOut (optional)
Type: `function(d, info)`  
`mouseout` event handler for the elements corresponding separate data points. `d` is a data point, `info` is an object with the only `event` property.  
**NOTE**: This event handler is *not* triggered for AreaSeries and LineSeries.

#### onSeriesMouseOver (optional)
Type: `function(info)`  
`mouseover` event handler for the entire series. Received `info` object as argument with the only `event` property.

#### onSeriesMouseOut (optional)
Type: `function(info)`  
`mouseout` event handler for the entire series. Received `info` object as argument with the only `event` property.

#### animation (optional)  
See the [XYPlot](#api-reference)'s `animation` section for more information.


### Hint

`Hint` is a simple component that shows tooltips inside the chart. Hint places itself to the place which is set by your data.
In case if custom representation of is needed, the component is also able to wrap custom JSX. Here is a short example:

```jsx
<Hint value={myValue}>
  <div style={background: 'black'}>
    <h3>Value of hint</h3>
    <p>{myValue.x}</p>
  </div>
</Hint>
```

#### value
Type: `Object`  
The data point to show the value at. Hint component will automatically find the place where the data point is and put the hint there.

#### format (optional)
Type: `function`  
Format function for a tooltip. Receives the data point, should return an array of objects containing `title` and `value` properties. Each item of an array is shown on a separate line by default.  
_Note: please pass custom contents in case if you need different look for the hint._

#### orientation (optional)
Type: `(auto|topleft|topright|bottomleft|bottomright)`  
Default: `auto`  
The way to align the hint inside the chart. When `auto` is set the hint is trying to stay inside the bounding box of the chart.
Set the hint to `topleft` if you want to see a "conventional" hint alignment.

### Crosshair

`Crosshair` is a tooltip for multiple values at the same time. Its purpose is to combine several values with the similar X coordinate in one tooltip. Crosshair is automatically aligned by the x coordinate depending on what values are passed.
In case if custom representation of crosshair is needed, the component is able to wrap the user's JSX. In this case no CSS is applied to that. Here's a short example:

```jsx
<Crosshair values={myValues}>
  <div style={background: 'black'}>
    <h3>Values of crosshair:</h3>
    <p>Series 1: {myValues[0].x}</p>
    <p>Series 2: {myValues[1].x}</p>
  </div>
</Crosshair>
```

#### values
Type: `Array<Object>`  
The array of data points to show the crosshair at. Crosshair will automatically align to the horizontal position of the points passed there.

#### formatTitle (optional)
Type: `function`  
The function that formats the title for the crosshair. Receives the list of data points, should return an object containing `title` and `value` properties.  
_Note: please pass custom contents in case if you need different look for the crosshair._

#### formatItems (optional)
Type: `function`  
The function that formats the list of items for the crosshair. Receives the list of data points, should return an array of objects containing `title` and `value` properties.
Note: please pass custom contents in case if you need different look for the crosshair.
