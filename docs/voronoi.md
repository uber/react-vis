> This library is deprecated. Please see `DEPRECATED.md`.

# Parallel Coordinates

Parallel Coordinates provide a robust method for displaying many variables simultaneously. It allows for rapid at-a-glance comparisons across a bunch of dimensions. These graphics can effectively be used either with several data rows on a single chart (as below) or as a small multiple. For more information, check out the [Wiki](https://en.wikipedia.org/wiki/Parallel_coordinates), it's got some really neat examples.

<!-- INJECT:"BasicParallelCoordinatesWithLink" -->

Imagine you have a trio of models of cars that you are trying to compare. You're being data driven so you've collected a number of measurements based on a variety of values. You know basic facts about your variables, eg the interior rating a car can have is 7 and the minimum 1. You can use all this information to produce the above chart! Viola! Informed consumer.

<!-- INJECT:"AnimatedParallelCoordinatesWithLink" -->

Just like every other chart and series ParallelCoordinates expects an array of data, each row or object corresponds to a line or polygon (depending on how you have your chart styled). A key caveat for this chart type is that react-vis can not simply infer the variables from each data object that you wish to plot, so we need you to tell us! So enters the domains prop, an array of object specifying the order and behavior of each of the variables. So you have to tell react-vis a little more to get started, but you get a lot more expressiveness. Let's consider some code. You might provide the following object as props to the parallel coordinates chart:

```javascript
const PARALLEL_COORDINATES_PROPS = {
  data: [{
    neatExplosions: 7,
    wow: 10,
    dog: 8,
    sickMoves: 9,
    nice: 7
  }],
  domains: [
    {name: 'nice', domain: [0, 100]},
    {name: 'explosions', domain: [6.9, 7.1], getValue: d => d.neatExplosions},
    {name: 'wow', domain: [0, 11]},
    {name: 'sickMoves', domain: [0, 20]}
  ],
  height: 300,
  width: 400
};
```

In such a case, there would be ONE polygon rendered for four variables (nice/explosions/wow/sickMoves), because those values are listed in the domains prop.

The ParallelCoordinates also features a stateful brushing mode in which your user can brush and drag on the the chart to selected and unselected lines. See the [highlight](highlight.md) component for more details.

<!-- INJECT:"BrushedParallelCoordinatesWithLink" -->

## API Reference
#### data

Type: `arrayOf(Objects)`

Each object must have keys for each of the intended display domains (eg in the above example any input row should have at neatExplosions/wow/dog/sickMoves/nice). Additional a style prop can be provided on the row of the data itself to style the line series that it corresponds to, for instance here's one of the rows from the car example:

```javascript
{
  name: 'Honda',
  mileage: 8,
  price: 6,
  safety: 9,
  performance: 6,
  interior: 3,
  warranty: 9,
  style: {
    strokeWidth: 3,
    strokeDasharray: '2, 2'
  }
}
```

It is not necessary to provide style, but it can be helpful!


#### domains

Type: `arrayOf(Objects)`

The domains allow the user to specify the nature of the variables being plotted. This information is captured in an object formatted like:

```javascript
PropTypes.shape({
  name: PropTypes.string.isRequired,
  getValue: PropTypes.func,
  domain: PropTypes.arrayOf([PropTypes.number]).isRequired,
  tickFormat: PropTypes.func
})
```

Let's looks at each member of the object

- name: generates a member of a labelSeries that shows at the end of the corresponding axis
- getValue: an accessor function that grabs a value from the row being accessed, if this is not provided a default one that uses the name property is used.
- domain: a pair of numbers that are interpolated between. Setting these values correctly is essential for making your graphic legible! Because it is often the case that there will only be one or two data rows in a parallel coordinates, react-vis requires the user to specify the exact domain for each variable. Without which we would be unable to plot the variables well.
- tickFormat: allows the user to provide a formatting function for prettifying the way that axis interpolates between the domain values.

#### width

Type: `number`

Width of the component.

#### height

Type: `number`

Height of the component.

#### margin (optional)

Type: `Object`

Default: `{left: 40, right: 10, top: 10, bottom: 40}`

Margin around the chart.

#### brushing

Type: `Boolean`

Default: false

Enable stateful brushing on parallel coordinates

#### style (optional)

Type: `object`

An object that contains CSS properties with which the axis component can be entirely re-styled.
As the ParallelCoordinates is composite of several composite elements, it is possible to provide style objects for any and all parts of the tree. See [style](style.md)
Most generally, there are three top level components `axes`, `labels`, and `lines`. These in turn lead to their corresponding to style objects. As an example, here is the default style object for the ParallelCoordinates:

```jsx
<ParallelCoordinates data={mydata} style={{
  axes: {
    line: {},
    ticks: {},
    text: {}
  },
  labels: {
    fontSize: 10
  },
  line: {
    strokeOpacity: 1
  },
  deselectedLineStyle: {
    strokeOpacity: 0.1
  }
}}/>
```

If you are using the stateful brushing mode and have filtered out a line then, in addition to the previous styles that were applied to a particular line, deselectedLineStyle will also be applied.

#### animation (optional)

Type: `boolean|Object`

Please refer to [Animation](animation.md) doc for more information.

#### className (optional)

Type: `string`

Provide an additional class name for the series.

#### colorType (optional)

Type: `string`

Specify the type of color scale to be used on the parallel coordinates chart, please refer to [Scales and data](scales-and-data.md) for more information.

#### showMarks (optional)

Type: 'boolean'

Specific whether or not to show the marks on the vertices of the lines

#### tickFormat (optional)

Type: 'function'

Specify the tick format for all axes. Will be over-ridden by tickFormats specified on single domains.
## MarkSeries & MarkSeriesCanvas

<!-- INJECT:"ScatterplotChartWithLink" -->

The MarkSeries allows users to embed discrete information in pairs of continuous variables,
that is make scatterplots. Deploying a MarkSeries is super easy:

```javascript
render() {
  return (
    <XYPlot
      width={300}
      height={300}>
      <MarkSeries
        className="mark-series-example"
        sizeRange={[5, 15]}
        data={myData}/>
    </XYPlot>
  );
```

Just like other series, MarkSeries expects its data to be formatted as an array of objects, like so:

```javascript
const myData = [
  {x: 1, y: 10, size: 30},
  {x: 1.7, y: 12, size: 10},
  {x: 2, y: 5, size: 1},
  {x: 3, y: 15, size: 12},
  {x: 2.5, y: 7, size: 4}
]
```

react-vis offers two different types of MarkSeries, one that renders SVG and one that renders Canvas.
The SVG mode is accessed by using the normal `MarkSeries`, just as above, while the Canvas mode is used by simply calling `MarkSeriesCanvas` instead of `MarkSeries`.

<!-- INJECT:"ScatterplotCanvasWithLink" -->

-**NOTE**: using the Canvas version of this layer disables animation

Mark series can usefully be deployed with voronois for fast and accurate mouse overs!

<!-- INJECT:"DynamicCrosshairScatterplotWithLink" -->

## Data format reference

#### x

Type: `string|number|date`

x will be used to determine the x position of each mark. The format of x depends on what scale is being used - see [Scales and Data](scales-and-data.md)

#### y

Type: `string|number|date`

y will be used to determine the y position of each mark. The format of y depends on what scale is being used - see [Scales and Data](scales-and-data.md)

#### color (optional)

Type: `string|number`

The color of the marks. By default the color is interpreted as number to be scaled to a color range. This can be over-ridden by providing the prop colorType="literal" to the series itself. This property can also be defined on the series level.

#### opacity (optional)

Type: `string|number`

Default: `1`

Opacity of the individual marks, from 0 (transparent) to 1 (opaque). By default opacity is scaled by `literal`, so the exact value provided will be used. This property can also be defined on the series level.

#### stroke (optional)

Type: `string|number`

The color of the outline of the marks. When this value is not provided, the color attribute is used instead. This property can also be defined on the series level.

#### fill (optional)

Type: `string|number`

The color of the inside of the marks. When this value is not provided the color attribute is used instead. This property can also be defined on the series level.

#### size (optional)

Type: `string|number`

Default: `5`

The size of each of the marks.

## API Reference

#### animation (optional)
See the [XYPlot](xy-plot.md)'s `animation` section for more information.

#### className (optional)

Type: `string`

Provide an additional class name for the series.

#### color (optional)

Type: `string|number`

Exact color for all series points or a series object.

#### data

Type: `Array<Object>`

Array of data for the series.

#### fill (optional)

Type: `string|number`

The inner color for all the marks in the series, this property will be over-ridden by fill specified in the data attribute. See [colors](colors.md)

#### opacity (optional)

Type: `string|number`

Exact opacity for all series points in pixels or a series object, from 0 (transparent) to 1 (opaque)

#### size (optional)

Type: `string|number`

Exact size for all series points in pixels or a series object.

#### stroke (optional)

Type: `string|number`

Default: see [colors](colors.md)

A color for the outline of the marks. Will override color if both are provided.

#### strokeWidth (optional)

Type: `string|number`

Default: `1`

The width of the outline of the marks.

## Interaction handlers
#### onNearestX (optional)

Type: `function(value, {event, innerX, index})`

A callback function which is triggered each time the mouse pointer moves. It can access the datapoint of the mark whose x position is the closest to that of the cursor.
Callback is triggered with two arguments. `value` is the data point, `info` object has following properties:
- `innerX` is the left position of the mark;
- `index` is the index of the data point in the array of data;
- `event` is the event object.
See [interaction](interaction.md)

#### onNearestXY (optional)

Type: `function(value, {event, innerX, innerY, index})`

A callback function which is triggered each time the mouse pointer moves. It can access the datapoint of the mark whose position is the closest to that of the cursor.
Callback is triggered with two arguments. `value` is the data point, `info` object has following properties:
- `innerX` is the left position of the mark;
- `innerY` is the top position of the mark;
- `index` is the index of the data point in the array of data;
- `event` is the event object.
See [interaction](interaction.md)

#### onSeriesClick

Type: `function`

Default: none

This handler fires when the user clicks somewhere on a series, and provides the corresponding event. Unlike onClick, it doesn't pass a specific datapoint.

```jsx
<MarkSeries
...
  onSeriesClick={(event)=>{
    // does something on click
    // you can access the value of the event
  }}
```

#### onSeriesMouseOut

Type: `function`

Default: none

This handler fires when the user's mouse cursor leaves a series, and provides the corresponding event. Unlike onValueMouseOut, it doesn't pass a specific datapoint.

```jsx
<MarkSeries
...
  onSeriesMouseOut={(event)=>{
    // does something on mouse over
    // you can access the value of the event
  }}
```

#### onSeriesMouseOver

Type: `function`

Default: none

This handler fires when the user mouses over a series, and provides the corresponding event. Unlike onValueMouseOver, it doesn't pass a specific datapoint.

```jsx
<MarkSeries
...
  onSeriesMouseOver={(event)=>{
    // does something on mouse over
    // you can access the value of the event
  }}
```

#### onSeriesClick

Type: `function`

Default: none

This handler fires when the user right-clicks somewhere on a series, and provides the corresponding event. Unlike onClick, it doesn't pass a specific datapoint.

```jsx
<MarkSeries
...
  onSeriesRightClick={(event)=>{
    // does something on right click
    // you can access the value of the event
  }}
```

#### onValueClick

Type: `function`

Default: none

This handler is triggered either when the user clicks on a mark.
The handler passes two arguments, the corresponding datapoint and the actual event.
```jsx
<MarkSeries
...
  onValueClick={(datapoint, event)=>{
    // does something on click
    // you can access the value of the event
  }}
```

#### onValueMouseOut

Type: `function`

Default: none

This handler is triggered either when the user's mouse leaves a mark.
The handler passes two arguments, the corresponding datapoint and the actual event.
```jsx
<MarkSeries
...
  onValueMouseOut={(datapoint, event)=>{
    // does something on click
    // you can access the value of the event
  }}
```

#### onValueMouseOver

Type: `function`

Default: none

This handler is triggered either when the user's mouse enters a mark.
The handler passes two arguments, the corresponding datapoint and the actual event.
```jsx
<MarkSeries
...
  onValueMouseOver={(datapoint, event)=>{
    // does something on click
    // you can access the value of the event
  }}
```

#### onValueRightClick

Type: `function`

Default: none

This handler is triggered either when the user right-clicks on a mark.
The handler passes two arguments, the corresponding datapoint and the actual event.
```jsx
<MarkSeries
...
  onValueRightClick={(datapoint, event)=>{
    // does something on right click
    // you can access the value of the event
  }}
```
# LineSeries/LineMarkSeries

<!-- INJECT:"LineChartWithLink" -->

react-vis offers two different types of LineSeries, one that renders SVG and one that renders Canvas.
The SVG mode is accessed by using the normal `LineSeries`, just as above, while the Canvas mode is used by simply calling `LineSeriesCanvas` instead of `LineSeries`.

<!-- INJECT:"LineChartCanvasWithLink" -->
-**NOTE**: using the Canvas version of this layer disables animation

## Data format reference

#### x

Type: `number`

Left-to-right position of marks in the series.

#### y

Type: `number`

Top-to-bottom position of the top edge of the series.

## API Reference

#### color (optional)

Type: `string|number`

Default: see [colors](colors.md)

Color of the line series.
By default, you can pass a literal color to the series (i.e. "red" or "#f70"). You can also define a color scale at the top level, and pass a number which will be interpolated by the scale. If nothing is provided, lineSeries will be colored according to react-vis default scale.

#### curve (optional)

Type: `string|function`

Default: `null`

Apply the provided or named curve function from the D3 shape library to smooth the line series plot, see [the D3 documentation](https://github.com/d3/d3-shape#curves) for function names and instructions. Providing the function, not the name, will require importing the d3-shape package in order to configure it:

```javascript
// Setting up with only a name
const stringCurveProp = <LineSeries data={data} curve={'curveMonotoneX'} .../>;

const configuredCurve = d3Shape.curveCatmullRom.alpha(0.5);
const funcCurveProp = <LineSeries data={data} curve={configuredCurve} .../>;
```

#### data

Type: `Array<Object>`

Array of data for the series. See above data format reference.

#### getNull (optional)

Type: `function`

Default: `null`

A function that will be invoked for each data element that will return a boolean that specifies if the data point should be drawn or not. For more information see [the D3 documentation](https://github.com/d3/d3-shape#line_defined).

```javascript
// Only draw datapoints where the y value is not equal to null
<LineSeries getNull={(d) => d.y !== null} data={data} />
```

#### opacity (optional)

Type: `number`

Default: `1`

Opacity of the area chart from 0 (transparent) to 1 (opaque).

#### stroke (optional)

Type: `string|number`

Default: see [colors](colors.md)

A color for the series. Will override color if both are provided.

##### strokeDasharray (optional)

Type: `string`

Specify a custom `stroke-dasharray` attribute which controls the pattern of dashes and gaps used to stroke paths. For the canvas version of this series, this should be an array of values, ala [7, 5].

##### strokeStyle (optional)

Type: `string`

If set to `dashed`, your series will use dashed lines. If set to `solid` or unspecified, your series will use solid lines. See `strokeDasharray` for specifying a custom stroke dash-array value.

##### strokeWidth (optional)

Type: `string|number`

Specifies the width of the line for the series. By default, this is determined by react-vis css (2px).

#### style (optional)

Type: `object`

An object which holds CSS properties that will be applied to the SVG element(s) rendered by the series. This allows you to style series beyond the other explicitly defined properties and without having to use CSS classnames and stylesheets. See [style](style.md)

```jsx
<LineSeries
  data={data}
  style={{strokeLinejoin: "round"}}
/>
```

### Interaction handlers

Note - interacting with a line may be difficult especially with the standard width. To address that, consider:
- the proximity handlers - onNearestX, onNearestXY;
- increasing the width of your line to make it easier to reach with the mouse,
- creating a near-transparent line series with extra width to catch mouse events.

#### onNearestX (optional)

Type: `function(value, {event, innerX, index})`

A callback function which is triggered each time the mouse pointer moves. It can access the datapoint of the mark whose x position is the closest to that of the cursor.
Callback is triggered with two arguments. `value` is the data point, `info` object has following properties:
- `innerX` is the left position of the mark;
- `index` is the index of the data point in the array of data;
- `event` is the event object.
See [interaction](interaction.md)

#### onNearestXY (optional)

Type: `function(value, {event, innerX, innerY, index})`

A callback function which is triggered each time the mouse pointer moves. It can access the datapoint of the mark whose position is the closest to that of the cursor.
Callback is triggered with two arguments. `value` is the data point, `info` object has following properties:
- `innerX` is the left position of the mark;
- `innerY` is the top position of the mark;
- `index` is the index of the data point in the array of data;
- `event` is the event object.
See [interaction](interaction.md)

#### onSeriesClick

Type: `function`

Default: none

This handler fires when the user clicks somewhere on a LineSeries, and provides the corresponding event. See [interaction](interaction.md)

```jsx
<LineSeries
...
  onSeriesClick={(event)=>{
  	// does something on click
  	// you can access the value of the event
  }}
```

#### onSeriesMouseOut

Type: `function`

Default: none

This handler fires when the user's mouse cursor leaves a LineSeries, and provides the corresponding event. See [interaction](interaction.md)

```jsx
LineSeries
...
  onSeriesMouseOut={(event)=>{
  	// does something on mouse over
  	// you can access the value of the event
  }}
```

#### onSeriesMouseOver

Type: `function`

Default: none

This handler fires when the user mouses over a LineSeries, and provides the corresponding event. See [interaction](interaction.md)

```jsx
<LineSeries
...
  onSeriesMouseOver={(event)=>{
  	// does something on mouse over
  	// you can access the value of the event
  }}
```

#### onSeriesRightClick

Type: `function`

Default: none

This handler fires when the user right-clicks somewhere on a LineSeries, and provides the corresponding event. See [interaction](interaction.md)

```jsx
<LineSeries
...
  onSeriesRightClick={(event)=>{
    // does something on click
    // you can access the value of the event
  }}
```
## DecorativeAxis

<!-- INJECT:"ParallelCoordinatesExampleWithLink" -->

In react-vis we try to express all of our components in terms of x and y coordinates. This is splendid and allows to separate a lot of our rendering logic from components! However, sometimes it is necessary to create labels that don't necessarily correspond to the underlying coordinates. For instance in cases of parallel coordinates (above) we want to mark up space in a series of discrete channels to show change across many different variables. To fill this need we use the ```DecorativeAxis``` component!

```javascript
<XYPlot
  xDomain={[0, 1]}
  yDomain={[0, 1]}
  width={300}
  height={300}>
  <DecorativeAxis
    axisStart={{x: 0, y: 0}}
    axisEnd={{x: 1, y: 1}}
    axisDomain={[-10, 100]}
    />
</XYPlot>
```

In the above example we start be setting our domain on the XYPlot (though this would be accomplished automatically if any of it's children had a data prop), and then specified where in the XY space we want our Axis to be (axisStart/axisEnd). Finally we specify the domain that we wish to show across that axis.

<!-- INJECT:"DecorativeAxisCrissCrossWithLink" -->

**WHAT IS THIS FOR** Labeling sections of XY space when we wish the viewer to interpret space in a different way. This could be as part of a Radar chart or radial chart! Or even, the inherently bad Dual Y Axis chart.

**WHAT IS NOT THIS FOR** Using in place of XAxis or YAxis, which should cover most of use cases in which space is being used normally. This type of axis allows for a lot of freedom in it's usage, however that can be dangerous. Most of the time, if you can't get XAxis and YAxis to do what you want, you maybe don't need axes. Be careful!

## API Reference

#### axisStart

Type: `Object`

Specify a start point for the decorativeAxis. It should be expressed in terms of coordinates (not pixels!) as a object like ```{x: 10, y: 1}```

#### axisEnd

Type: `Object`

Specify a start point for the decorativeAxis. It should be expressed in terms of coordinates (not pixels!) as a object like ```{x: 10, y: 1}```

#### axisDomain

Type: `Array`

This array of numbers allows the user to specify the values that will be interpolated across on the axis.

#### tickTotal (optional)

Type: `number`

Total number of ticks on the axis. Already set by default. Similar to the `tickTotal()` method of d3-axis.

#### tickSize (optional)

Type: `number`

Default: `5`

Tick size for the axis. Sets both inner and outer sizes of the tick line. Similar to the `tickSize()` method of d3-axis.

#### tickValue (optional)

Type: `function(*)`

Format function for the tick label. Similar to the `tickFormat()` method of d3-axis.

#### animation (optional)
See the [XYPlot](xy-plot.md)'s `animation` section for more information.

#### style (optional)

Type: `object`

An object that contains CSS properties with which the axis component can be entirely re-styled.
As the Axis component is composite, it is possible to style its different parts individually. See [style](style.md)

The various parts of the axis can be styled by passing an object to the `line`, `ticks`, `text` and `title` properties:

```jsx
<DecorativeAxis style={{
  line: {stroke: '#ADDDE1'},
  ticks: {stroke: '#ADDDE1'},
  text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
}}/>
```
# React-vis

__React-vis__ is a React visualization library. It's been designed with the following principles in mind:

## React-friendly:
React-vis components are designed to work just like other React components. They have properties, children and callbacks. They can be composed. If you can work with React components, you can work with React-Vis.

## High-level and customizable:
You can create complex charts with a minimum amount of code and sensible defaults, however, you can also customize every aspect of your chart.

## Expressive:
React-vis handles a great number of charts, from area charts to treemaps;

## Industry-strong:
React-vis was built to support the many internal tools at Uber.
## Voronoi

Voronoi diagrams are useful for making a chart interactive by creating target areas for events like hover and click.

<!-- INJECT:"VoronoiLineChartWithLink" -->

```jsx
<Voronoi
    extent={[[0, 0], [200, 200]]}
    nodes={[{x: 0, y: 10}, {x: 1, y: 5}, {x: 3, y: 3}, {x: 4, y: 1}, {x: 5, y: 6}]}
    x={d => x(d.x)}
    y={d => y(d.y)}
/>
```

## API Reference


<!-- INJECT:"DynamicCrosshairScatterplotWithLink" -->

#### extent

Type: `Array`

Sets the clip extent of the Voronoi layout to the specified bounds. The extent bounds are specified as an array [[x0, y0], [x1, y1]], where x0 is the left side of the extent, y0 is the top, x1 is the right and y1 is the bottom.
Extent should take the dimensions of the accompanying XYPlot into account, so using the plot's width, height and margins: `[[marginLeft, marginTop], [width, height]]`, which coincidentally is the default extent.

#### nodes (required)

Type: `Array`

The array must consist of `{x, y}` objects. These are often identical to the data passed to a series in the accompanying plot.

Each item in the array will create a polygon cell in the resulting Voronoi diagram. Optional properties are:
 - style `Object`
 - className `String`

Example:
```js
[
  { x: 0, y: 10 },
  { x: 1, y: 5, style: { stroke: 'blue' } }
];
```

#### x (optional)

Type: `Function`

Sets the x-coordinate accessor. Often you want to convert the coordinate-values to pixel values like
`x={d => x(d.x)}`. If not provided defaults to wrapping XYPlot's xScale.

#### y (optional)

Type: `Function`

Sets the y-coordinate accessor. Often you want to convert the coordinate-values to pixel values like
`y={d => y(d.y)}`. If not provided defaults to wrapping XYPlot's yScale.

#### onBlur (optional)

Type: `Function`

Add `blur`-event to Voronoi cells

#### onClick (optional)

Type: `Function`

Add `click`-event to Voronoi cells

#### onMouseUp (optional)

Type: `Function`

Add `mouseUp`-event to Voronoi cells

#### onMouseDown (optional)

Type: `Function`

Add `mouseDown`-event to Voronoi cells

#### onHover (optional)

Type: `Function`

Add `hover`-event to Voronoi cells

#### className (optional)

Type: `String`

Add css class to Voronoi container

##### style (optional)

Type: `Object`

Add css styles to Voronoi container

#### polygonStyle (optional)

Type: `Object`

Add css styles to Voronoi cells.

For example:
`polygonStyle={{stroke: 'red'}}`
This will add a red border around cell which is very useful for debugging the Voronoi diagram.
