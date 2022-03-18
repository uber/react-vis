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
## Animation

Animation makes your charts feel physical, it makes them feel alive, shoot it makes them feel l33t. `react-vis` offers a simple portal into the [react-motion](https://github.com/chenglou/react-motion) animation system by exposing a simple animation prop on most components! This prop accepts three types of values:

*Booleans*: if true is present then `react-vis` will use the `no-wobble` preset (see below)

*Strings*: react-motion offers several different motion presets that cover most use cases. To access them set your animation prop to one of [noWobble, gentle, wobbly, stiff].

<!-- INJECT:"AnimationExampleWithLink" -->

*Objects*: react-motion expects an object formatting like `{damping: NUMBER, stiffness: NUMBER}`, and if you want to give us an object like that, we will hand it direct to react-motion. You can also pass an object with `{nonAnimatedProps: ['foo', 'bar']}` to prevent those props from being interpolated by d3-interpolator.

<!-- INJECT:"TreemapExampleWithLink" -->

The above example has `animation: {damping: 9, stiffness: 300}`!

**NOTE** In Jsx the presence of the animation prop is enough to trigger an animation, eg

```javascript
<MarkSeries
  data={nodes}
  animation
  colorType={'category'}
  stroke={'#ddd'}
  strokeWidth={2}
  colorRange={colors}
  />
```

Will be treated as true. If you want to include the animation prop but not have animation be engaged, you need to use animation={null}!
## Axes

<!-- INJECT:"CustomAxesOrientationWithLink" -->

`XAxis` and `YAxis` shows are responsible for the axis in the chart. They can be used simply

```javascript
<XYPlot
  width={300}
  height={300}>
  <XAxis />
  <YAxis />
  <MarkSeries data={myData}/>
</XYPlot>
```

Which will automatically interpolate across the relevant domains of the data (ie it will present reasonable values for x and y). It can also be used to create more complex axes

<!-- INJECT:"CustomAxesWithLink" -->

Which is produced via

```javascript
<XYPlot width={300} height={300}>
  <XAxis top={0} hideLine tickValues={[0, 1, 3, 4, 5]} title="X"/>
  <XAxis tickFormat={v => `Value is ${v}`} tickLabelAngle={-90} />
  <YAxis hideTicks/>
  <YAxis left={50} tickFormat={v => v * v}/>
  <YAxis hideLine left={150} tickFormat={v => WORDS[v]}/>
  <MarkSeries data={[{x: 0, y: 0}, {x: 5, y: 5}]} opacity={0} opacityType="linear"/>
</XYPlot>
```

For greater control over the specific styling and placement of the axis label, please see [ChartLabel](chart-label.md).

## API Reference

#### title (optional)

Type: `string`

Shows the title for the axis.

#### orientation (optional)

Type: `'top'|'left'|'bottom'|'right'`

The position of the axis inside the chart.
By default **it is already set** to `'bottom'` for `XAxis` and to `'left'` for `YAxis`. Similar to how the axis are oriented in d3-axis.

#### position (optional)

Type: `'end'|'middle'|'start'`

The position of the title relative to the axis. This value is set to `'end'` by default (i.e. towards the left of a horizontal axis, towards the top of a vertical axis.)

#### tickTotal (optional)

Type: `number`

Total number of ticks on the axis. Already set by default. Similar to the `tickTotal()` method of d3-axis.

#### tickValues (optional)

Type: `Array<*>`

An array of values (not coordinates!) that where the ticks should be shown. Similar to the `tickValues()` method of d3-axis.

#### tickFormat (optional)

Type: `function(value, index, scale, tickTotal)`

Format function for the tick label. Similar to the `tickFormat()` method of d3-axis. Typically the value that is returned is a string or a number, however this function also supports rendering SVG React elements. To wit, I could have formatting function like

```javascript
function myFormatter(t, i) {
  return (<tspan>
    <tspan x="0" dy="1em">MY VALUE</tspan>
    <tspan x="0" dy="1em">{t}</tspan>
  </tspan>);
}
```

Or you can customize the tick formatting by calling the `tickFormat()` function on the d3-scale by yourself and pass additional formatting parameters (e.g s for SI-prefix).
```javascript
function mySIPrefixFormatter(value, index, scale, tickTotal) {
  return `${scale.tickFormat(tickTotal, 's')(value)}Wh`;// -> e.g. 1.2kWh
}
```

**Note!** The return value will be wrapped with a `<text>` node if it's a string, `<tspan>`, or `<textPath>`. In all other cases the returned element will replace the `<text>` node. In case it's a custom React element it will also receive two additional props: `containerWidth` and `tickCount`. This way you can e.g. render a `<div>` to truncate long labels:

```javascript
const MyLabel = props => (
  <foreignObject>
    <div
      xmlns="http://www.w3.org/1999/xhtml"
      style={{
        width: props.containerWidth / props.tickCount, overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}
    >
      {props.children}
    </div>
  </foreignObject>
);

function myFormatter(value) {
  return <MyLabel>{value}</MyLabel>;
}

<XAxis tickFormat={myFormatter} />
```

<!-- INJECT:"CustomAxisTickElement" -->

#### tickSize (optional)

Type: `number`

Default: `6`

Tick size for the axis. Sets both inner and outer sizes of the tick line. Similar to the `tickSize()` method of d3-axis.

#### tickSizeOuter (optional)

Type: `number`

Default: `null`

Tick size for the axis. Sets the outer size of the tick line. Similar to the `tickSizeOuter()` method of d3-axis.

NOTE: 1.0.0 and onwards now properly draws outer tick using this value. Previously, this value affected the drawing of inner tick.

#### tickSizeInner (optional)

Type: `number`

Default: `null`

Tick size for the axis. Sets the inner size of the tick line. Similar to the `tickSizeInner()` method of d3-axis.

NOTE: v1.0.0+ properly draws inner tick using this value. Previously, this value affected the drawing of outer tick.

#### tickPadding (optional)

Type: `number`

Default: `2`

Distance between the tick and the text of the tick in pixels. Similar to the `tickPadding()` method of d3-axis.

#### tickLabelAngle (optional)

Type: `number`

Default: `0`

The angle of the tick label. Can be used to fit the long labels of the axis without truncation.

#### left (optional)

Type: `number`

Horizontal position of the axis in pixels. **Already set by default**, but can be overridden by the user.

#### top (optional)

Type: `number`

Vertical position of the axis in pixels. **Already set by default**, but can be overridden by the user.

#### width (optional)

Type: `number`

Width of the axis in pixels. **Already set by default**, but can be overridden by the user.

#### height (optional)

Type: `number`

Height of the axis in pixels. **Already set by default**, but can be overridden by the user.

#### animation (optional)
See the [XYPlot](xy-plot.md)'s `animation` section for more information.

#### style (optional)

Type: `object`

An object that contains CSS properties with which the axis component can be entirely re-styled.
As the Axis component is composite, it is possible to style its different parts individually. See [style](style.md)

The various parts of the axis can be styled by passing an object to the `line`, `ticks`, `text` and `title` properties:

```jsx
<XAxis title="X Axis" style={{
  line: {stroke: '#ADDDE1'},
  ticks: {stroke: '#ADDDE1'},
  text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
}}/>
```
# Sunbursts

Sunbursts are a powerful way to demonstrate part to whole relationships. While they certainly have the many of easily criticized problems of pie charts, they allow for
at a glance understanding of deeply nested systems. This could be useful for understanding for funnels problems or distributions of nested groups (eg how does my cities performance compare to other cities in my country?).

<!-- INJECT:"BasicSunburstWithLink" -->

The `Sunburst` is a thin data processing wrapper on an XYPlotted [ArcSeries](arc-series.md), it generates highly re-stylable SVG! Any props that are available in the arc series are also available here. Additionally it copies the data format of the treemap, so if you have data prepped to drop into the tree map, you can use that same data to get a sunburst.

## Usage

Import the `Sunburst` component:
```jsx
import {Sunburst} from 'react-vis';
```

Add the following code to your render function:
```jsx
<Sunburst
  hideRootNode
  colorType="literal"
  data={data}
  height={300}
  width={350}/>
```

Like other systems that make use of d3's hierarchy layout system we ask that our data be presented to us in a tree like structure.
Here's a slice of the famous d3-flare dataset:


```javascript
const myData = {
 "title": "analytics",
 "color": "#12939A",
 "children": [
  {
   "title": "cluster",
   "children": [
    {"title": "AgglomerativeCluster", "color": "#12939A", "size": 3938},
    {"title": "CommunityStructure", "color": "#12939A", "size": 3812},
    {"title": "HierarchicalCluster", "color": "#12939A", "size": 6714},
    {"title": "MergeEdge", "color": "#12939A", "size": 743}
   ]
  },
  {
   "title": "graph",
   "children": [
    {"title": "BetweennessCentrality", "color": "#12939A", "size": 3534},
    {"title": "LinkDistance", "color": "#12939A", "size": 5731},
    {"title": "MaxFlowMinCut", "color": "#12939A", "size": 7840},
    {"title": "ShortestPaths", "color": "#12939A", "size": 5914},
    {"title": "SpanningTree", "color": "#12939A", "size": 3416}
   ]
  },
  {
   "title": "optimization",
   "children": [
    {"title": "AspectRatioBanker", "color": "#12939A", "size": 7074}
   ]
  }
 ]
}
```

First, note the recursive tree relationship: each node has a title, and an array of children.
This pattern continues until we reach the leaves, where we declare the size of the leaves. This value is rolled up, so that
the "cluster" node has  3938 + 3812 + 6714 + 743 = 15207 size units.

### Adding annotations

Tooltips and other helpful annotations can be added to the sunburst diagram by providing those elements as children. For instance, if we wanted to add a tooltip to the above Sunburst, this could be done by adding a [Hint](hint.md) component as a child.

```jsx
<Sunburst
  hideRootNode
  colorType="literal"
  data={data}
  height={300} 
  width={350}>
  <Hint value={hoveredValue} />
</Sunburst>
```

Where `hoveredValue` is an appropriately curated coordinate value. See the [sunburst-with-tooltips](https://github.com/uber/react-vis/blob/master/packages/showcase/sunbursts/sunburst-with-tooltips.js) code for more details.

## API Reference

#### width

Type: `number`

Width of the component.

#### height

Type: `number`

Height of the component.

#### data

Type: `Object`

The data for the component. The `data` property is a tree-like structure.
Each point consists of following properties:

* `title`

  Type: `string`

  The title to show inside the cell. Might be a string or a React component.
* `size`

  Type: `number`

  The relative size of the cell.
* `color` (optional)

  Type: `number` or `string`

  The value to visualize the color with.
* `label` (optional)

  Type: `string`

  The label to be attached for the current node.
* `labelStyle` (optional)

  Type: `object`

  The style of the attached label. Example `{labelStyle: {fontSize: 15}, ...}`
* `dontRotateLabel` (optional)

  Type: `boolean`

  Don't rotate this label
* `children` (optional)

  Type: `Array`

  The children for the leaf.

<!-- INJECT:"SunburstWithTooltipsWithLink" -->

#### hideRootNode (optional)

Type: `boolean`

Simple boolean on whether or not to show the root node of the tree.

#### children (optional)

Type: `react components`

Sunburst can accept react components as children if you wish to annotate your diagram.

#### animation (optional)

Type: `boolean|Object`

Please refer to [Animation](animation.md) doc for more information.

<!-- INJECT:"AnimatedSunburstWithLink" -->

#### onValueClick (optional)

Type: `function`

- Should accept arguments (arc node, domEvent)

Pass in a function that will be called on click on a given arc.

#### onValueRightClick (optional)

Type: `function`

- Should accept arguments (arc node, domEvent)

Pass in a function that will be called on right click on a given arc.

#### onValueMouseOver (optional)

Type: `function`

- Should accept arguments (arc node, domEvent)

Pass in a function that will be called on mouseEnter on a given arc.

#### onValueMouseOut (optional)

Type: `function`

- Should accept arguments (arc node, domEvent)

Pass in a function that will be called on mouseOut on a given arc.

#### padAngle (optional)

Type: `number|function`

The padding to be applied between arcs.
## Color

Color can be set and affected in many ways in React-vis.
The main principles are:
* sensible defaults - your chart should look good even if you don't do anything;
* respect of specificity - you can change things at a high level (ie <XYPlot /> component) but override this at the series level and, when relevant, at the mark level.
* flexibility - everything down to the humble tick can be colored and recolored.

### Setup

In this document, let's look at how different color choices affect 3 different mini charts.
Each chart in the doc is made of 3 series with x going from 0 to 9 and random values of y between 0 and 10. The left-most chart is made of VerticalBarSeries, the middle one is made of 3 LineSeries, and the right-most one is made of MarkSeries.

So it goes like this:

```jsx
<XYPlot height={200} width={200}>
  <VerticalBarSeries data={series1}/>
  <VerticalBarSeries data={series2}/>
  <VerticalBarSeries data={series3}/>
</XYPlot>
<XYPlot height={200} width={200}>
  <LineSeries data={series1}/>
  <LineSeries data={series2}/>
  <LineSeries data={series3}/>
</XYPlot>
<XYPlot height={200} width={200}>
  <MarkSeries data={series1}/>
  <MarkSeries data={series2}/>
  <MarkSeries data={series3}/>
</XYPlot>
```

### Cases

We do nothing:

<!-- INJECT:"SensibleDefaultsWithLink" -->

With no color instruction, colors are automatically set by series according to the default react-vis palette, which is:

<!-- INJECT:"ReactVis5WithLink" -->

We specify color in XYPlot

```jsx
<XYPlot height={200} width={200} color="red">
  <VerticalBarSeries data={series1}/>
  <VerticalBarSeries data={series2}/>
  <VerticalBarSeries data={series3}/>
</XYPlot>
<XYPlot height={200} width={200} stroke="red">
  <LineSeries data={series1}/>
  <LineSeries data={series2}/>
  <LineSeries data={series3}/>
</XYPlot>
<XYPlot height={200} width={200} color="red">
  <MarkSeries data={series1}/>
  <MarkSeries data={series2}/>
  <MarkSeries data={series3}/>
</XYPlot>
```

<!-- INJECT:"ColorInXYPlotWithLink" -->

Without any further instruction, all the series are red. Note that in the case of LineSeries, we have to use stroke instead of color for this effect to work.

We specify color by series

The next step is passing colors to by series. When we do that, we add a color prop to each series component:

```jsx
<LineSeries data={series1} color="1" />
<LineSeries data={series2} color="red" />
```

How this color information is going to be treated depends on a number of factors.

Color scales

Once it's passed through series, color works like a [scale](scales-and-data.md); in other words, it transforms data into a visual representation.
There are several types of scales.

A linear scale works with a range of numerical values on one hand ("domain"), and two colors on the other hand ("range"). If given a numerical value in the domain, it transforms it into a color in the range depending on how far into the domain that value was. If given the minimum value of the domain, the scale will return the first color of the range. If given the maximum value of the domain, it will return the second color of the range. And if given a value in between, it will return an interpolation between these two colors - the closer that value is from the minimum, the more it will look like the first color, and the closer it is to the maximum, the more it will look like the second. Else, it's a proportional mix of the two.

For example, if a domain is [0, 1] and the range is ['black', 'white'], 0 will become 'black', 1 will become 'white', and 0.2 will become '#333333' (20% between black and white)

The linear scale can be extended to work with multi-point domains and range. If you pass 3 (ordered) values to the domain, and 3 values to the range, when given a data point, the scale will figure out which segment of the domain this data point corresponds to, and will match it with the corresponding segment of the range.

If our domain is [0, 1, 2] and our range is now ['black', 'white', 'blue'], 0.2 will still be '#333333' (20% between the first 2 values), but 1.5 will become '#8080ff' (halfway between white and blue)

A categorical color scale associates a discrete number of values (also called domain) to a discrete number of colors (also called range). One big difference is that the values can be number or strings.
For instance, if a categorical color scale has the domain: ['yes', 'maybe', 'no'] and the range ['blue', 'yellow', 'red'], it will transform 'yes' into 'blue' and 'no' into 'red'. There will be no interpolation. If it finds a value which is not in its domain, it will return undefined (which will be represented in black).

Finally, the literal color scale just returns whatever is provided as is. With a literal color scale, we can have color names in the dataset, and they will be used without transformation.

Categorical colors at series level

<!-- INJECT:"CategoryColorAtSeriesLevelWithLink" -->

For this example, the XYPlot props are:

```jsx
<XYPlot height={200} width={200}
  colorType="category"
  colorDomain={[0, 1, 2]}
  colorRange={myPalette}
>
  <VerticalBarSeries data={series1} color={0} />
  <VerticalBarSeries data={series2} color={1} />
  <VerticalBarSeries data={series3} color={2} />
</XYPlot>
<XYPlot height={200} width={200}
  colorType="category"
  colorDomain={[0, 1, 2]}
  colorRange={myPalette}
>
  <LineSeries data={series1} color={0} />
  <LineSeries data={series2} color={1} />
  <LineSeries data={series3} color={2} />
</XYPlot>
<XYPlot height={200} width={200}
  colorType="category"
  colorDomain={[0, 1, 2]}
  colorRange={myPalette}
>
  <MarkSeries data={series1} color={0} />
  <MarkSeries data={series2} color={1} />
  <MarkSeries data={series3} color={2} />
</XYPlot>
```

As you can see, __using categorical color at the series level doesn't work for bar charts or scatterplots__. It does for line charts though.

Linear colors at series level

<!-- INJECT:"LinearColorAtSeriesLevelWithLink" -->

```jsx
<XYPlot height={200} width={200}
  colorType="linear"
  colorDomain={[0, 1, 2]}
  colorRange={myPalette}
>
  <VerticalBarSeries data={series1} color={0} />
  <VerticalBarSeries data={series2} color={1} />
  <VerticalBarSeries data={series3} color={2} />
</XYPlot>
<XYPlot height={200} width={200}
  colorType="linear"
  colorDomain={[0, 1, 2]}
  colorRange={myPalette}
>
  <LineSeries data={series1} color={0} />
  <LineSeries data={series2} color={1} />
  <LineSeries data={series3} color={2} />
</XYPlot>
<XYPlot height={200} width={200}
  colorType="linear"
  colorDomain={[0, 1, 2]}
  colorRange={myPalette}
>
  <MarkSeries data={series1} color={0} />
  <MarkSeries data={series2} color={1} />
  <MarkSeries data={series3} color={2} />
</XYPlot>
```

Likewise, __using linear color at the series level only works for line charts__.

Literal colors at series level

<!-- INJECT:"LiteralColorAtSeriesLevelWithLink" -->

```jsx
<XYPlot height={200} width={200}>
  <VerticalBarSeries data={series1} color="#cd3b54" />
  <VerticalBarSeries data={series2} color="#59b953" />
  <VerticalBarSeries data={series3} color="#ba4fb9" />
</XYPlot>
<XYPlot height={200} width={200}>
  <LineSeries data={series1} color="#cd3b54" />
  <LineSeries data={series2} color="#59b953" />
  <LineSeries data={series3} color="#ba4fb9" />
</XYPlot>
<XYPlot height={200} width={200}>
  <LineSeries data={series1} color="#cd3b54" />
  <LineSeries data={series2} color="#59b953" />
  <LineSeries data={series3} color="#ba4fb9" />
</XYPlot>
```

However, setting color at the series level works for all kinds of charts. It's not even necessary to specify a color type, a domain or a range.

We specify color information at mark level

For this second series of charts, we are going to specify color information inside of our dataset (ie the series which will be passed to the props "data").
Previously, our datasets only included x and y information:
```js
const series1 = [
  {x: 0, y: 2},
  {x: 1, y: 6},
  ...
];
```
Now, they will have a color information as well.
* For our categorical examples, that color value will be a random integer between 0 and 10.
* For our linear examples, that color value will be a random number between 0 and 10 (not necessarily an integer).
* Finally, for our literal example, the color information will be the name of a color in hex format.


Categorical colors at mark level
<!-- INJECT:"CategoryColorAtMarkLevelWithLink" -->

```jsx
<XYPlot height={200} width={200} colorType="category">
  <VerticalBarSeries data={seriesWithColor1} />
  <VerticalBarSeries data={seriesWithColor2} />
  <VerticalBarSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorType="category">
  <LineSeries data={seriesWithColor1} />
  <LineSeries data={seriesWithColor2} />
  <LineSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorType="category">
  <MarkSeries data={seriesWithColor1} />
  <MarkSeries data={seriesWithColor2} />
  <MarkSeries data={seriesWithColor3} />
</XYPlot>
```

So what happens here?

For line charts, __nothing!__ They ignore colors at mark level. So they behave just like the default case (as if we passed no color information at all)

For the 2 other charts, marks are colored according to the default extended palette:

<!-- INJECT:"ReactVis20WithLink" -->

Here, I have specified the colorType prop at the XYPlot level. I could have done so at the series level, inside of each series component (it cascades down). However, I haven't specified a colorRange or a colorDomain.

It's going to use the default extended palette as the color range. We'll override this in the next example. As for domain, it's going to associate the first color value it finds in the dataset with the first color of the palette, the second distinct color it finds with the second color of the palette, and so on and so forth.
With this syntax, we'll render marks which have different color information in different colors, but we don't control which color. If we want to control which color a specific value is going to be associated with, we have to pass a colorDomain.

Categorical colors at mark level, custom palette
<!-- INJECT:"CategoryColorAtMarkLevelCustomPaletteWithLink" -->

```jsx
<XYPlot height={200} width={200} colorType="category" colorRange={myPalette}>
  <VerticalBarSeries data={seriesWithColor1} />
  <VerticalBarSeries data={seriesWithColor2} />
  <VerticalBarSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorType="category" colorRange={myPalette}>
  <LineSeries data={seriesWithColor1} />
  <LineSeries data={seriesWithColor2} />
  <LineSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorType="category" colorRange={myPalette}>
  <MarkSeries data={seriesWithColor1} />
  <MarkSeries data={seriesWithColor2} />
  <MarkSeries data={seriesWithColor3} />
</XYPlot>
```

This time, I'm passing a custom palette:

<!-- INJECT:"CustomPaletteWithLink" -->

Behavior for line chart is still identical, but the colors are different for our bar charts and scatterplots. As I'm not passing a color domain, I still don't control which value will be associated with which color - not super important since my color values are random numbers. But if order matters, a colorDomain is required.

Linear colors at mark level, default palette

<!-- INJECT:"LinearColorAtMarkLevelNoPaletteWithLink" -->

```jsx
<XYPlot height={200} width={200}>
  <VerticalBarSeries data={seriesWithColor1} />
  <VerticalBarSeries data={seriesWithColor2} />
  <VerticalBarSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200}>
  <LineSeries data={seriesWithColor1} />
  <LineSeries data={seriesWithColor2} />
  <LineSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200}>
  <MarkSeries data={seriesWithColor1} />
  <MarkSeries data={seriesWithColor2} />
  <MarkSeries data={seriesWithColor3} />
</XYPlot>
```

The linear color scale is the default color scale. So, to get that behavior, we don't need to specify this colorType in XYPlot. Its associated color range was conceived by someone who really likes orange:

<!-- INJECT:"ContinuousWithLink" -->

I haven't specified the color range either. React-Vis will compute it by looking at the minimum and maximum value associated with color in all the series of a given XYPlot, and use that as the domain.

The line charts are still unaffected.

Linear colors at mark level, custom palette

<!-- INJECT:"LinearColorAtMarkLevelWithLink" -->

```jsx
<XYPlot height={200} width={200} colorRange={['#c7e9c0', '#00441b']}>
  <VerticalBarSeries data={seriesWithColor1} />
  <VerticalBarSeries data={seriesWithColor2} />
  <VerticalBarSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorRange={['#c7e9c0', '#00441b']}>
  <LineSeries data={seriesWithColor1} />
  <LineSeries data={seriesWithColor2} />
  <LineSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorRange={['#c7e9c0', '#00441b']}>
  <MarkSeries data={seriesWithColor1} />
  <MarkSeries data={seriesWithColor2} />
  <MarkSeries data={seriesWithColor3} />
</XYPlot>
```

Here's the same code, but we define the color range. This green palette comes from ColorBrewer.

Literal colors at mark level, default palette

<!-- INJECT:"LiteralColorAtMarkLevelWithLink" -->

```jsx
<XYPlot height={200} width={200} colorType="literal"}>
  <VerticalBarSeries data={seriesWithColor1} />
  <VerticalBarSeries data={seriesWithColor2} />
  <VerticalBarSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorType="literal"}>
  <LineSeries data={seriesWithColor1} />
  <LineSeries data={seriesWithColor2} />
  <LineSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorType="literal"}>
  <MarkSeries data={seriesWithColor1} />
  <MarkSeries data={seriesWithColor2} />
  <MarkSeries data={seriesWithColor3} />
</XYPlot>
```

Finally, we can pass literal color names in our dataset from our custom palette. The line charts are still not affected.

### Going beyond

Independently control fill and stroke

The line chart series (LineSeries) is only a line, but most other series (AreaSeries, ArcSeries, BarSeries, HeatmapSeries, HexbinSeries, MarkSeries, RectSeries and their derivatives, including LineMarkSeries) involve 2D shapes that have both a fill color and a stroke color.

In SVG, those correspond to the fill and the stroke css properties (fillStyle and strokeStyle in canvas).

When we pass color information, we set both the fill and stroke. However, we can set them independently by using "fill" or "stroke" instead of color.

As of this writing, ContourSeries and PolygonSeries don't follow this model and their color can only be controlled by "color".

<!-- INJECT:"CategoryColorAtMarkLevelFixedStrokeWithLink" -->

```jsx
<XYPlot height={200} width={200} colorType="category" stroke="#f70">
  <VerticalBarSeries data={seriesWithColor1} />
  <VerticalBarSeries data={seriesWithColor2} />
  <VerticalBarSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorType="category" stroke="#f70">
  <LineSeries data={seriesWithColor1} />
  <LineSeries data={seriesWithColor2} />
  <LineSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorType="category" stroke="#f70">
  <LineSeries data={seriesWithColor1} />
  <LineSeries data={seriesWithColor2} />
  <LineSeries data={seriesWithColor3} />
</XYPlot>
```

Here, we set a stroke value at the XYPlot level for all of our charts. What happens?

The bar chart outerbox is now of that color,

The line series are now represented in that color - this takes over the default behavior,

The scatterplot dots are also now surrounded with that color.

Note that in the case of a LineMarkSeries (a combination of a LineSeries and a MarkSeries) the stroke property will control both the color of the line and the stroke of the marks. If you want a different color, you can just instead create a LineSeries and a MarkSeries with the same data:

<!-- INJECT:"LineSeriesMarkSeriesWithLink" -->

```jsx
<XYPlot height={200} width={600}>
  <LineSeries data={series1} color={myPalette[0]} />
  <MarkSeries data={series1} color={myPalette[0]} stroke="white" />
  <LineSeries data={series2} color={myPalette[1]} />
  <MarkSeries data={series2} color={myPalette[1]} stroke="white" />
  <LineSeries data={series3} color={myPalette[2]} />
  <MarkSeries data={series3} color={myPalette[2]} stroke="white" />
</XYPlot>
```

Here, I want my dots to have a white outline.
Why did I specify the color of each of my series? You might have to scroll all the way to the top for the answer! If I had done nothing all the colors of my series would have been taken from the default palette for each new series. So the first line series would have had the first color, then the first mark series would have had the _second_ color... and so on and so forth. By specifying a color, we are guaranteeing that the dots and the lines have the same color.

Using styles

We can pass style information to anything - XYPlot, series, mark - and override the look and feel of that element. Styles don't have to be static objects - they can be computed at run time. Styles are a different way to control colors. While using the color prop, or a color property in a dataset, can be much more concise, everything can be affected by styles - including non-mark elements such as ticks or gridlines. See [style](style.md) for more info.

Using specificity

We've seen that we can set color information at the plot level, at the series level and at the mark level. But what happens when we do it at several levels at the same time? The most specific wins.

If you need to color one element (say, one mark) differently from all the others, you can specify color at a higher level (say, the series or the plot) and only pass color information to the exception, rather than pass color information to all elements.

<!-- INJECT:"ColorSpecificityWithLink" -->

```jsx
  <XYPlot {...defaultXYPlotProps} color="#12939A" colorType="literal">
    <VerticalBarSeries data={seriesWithOneElementColored} />
  </XYPlot>
  <XYPlot {...defaultXYPlotProps} stroke="#e5e5e5" strokeType="literal">
    <LineSeries data={series1} />
    <LineSeries data={series2} />
    <LineSeries data={series3} stroke="#FF9833"/>
  </XYPlot>
  <XYPlot {...defaultXYPlotProps} color="#12939A" colorType="literal" stroke="white" >
    <MarkSeries data={series1} />
    <MarkSeries data={series2} />
    <MarkSeries data={seriesWithOneElementColored} color="#4fb79b"/>
  </XYPlot>

```

Notes:

* For the line series, which behave differently than other series, you must use stroke instead of color for this to work.
* For the scatterplot series, I'm using specificity twice: there's a color at the plot level, overridden by a color at the first series level, overridden by a color on the 7th mark of the series.

Using gradients

Why use a boring solid color when you can use gradients? We're not sure either! Once you define gradients (see [gradients](gradients.md)) you can use them instead of color (or fill, or stroke) at the series level.

<!-- INJECT:"GradientChartsWithLink" -->

```jsx
  const gradient = (<GradientDefs>
    <linearGradient
        id="myGradient"
        gradientUnits="userSpaceOnUse"
        x1="0" y1="0" x2="200" y2="200">
        <stop offset="10%" stopColor="#c6e48b" />
        <stop offset="33%" stopColor="#7bc96f" />
        <stop offset="66%" stopColor="#239a3b" />
        <stop offset="90%" stopColor="#196127" />
    </linearGradient>
  </GradientDefs>);
  return (<div style={{display: 'flex'}}>
    <XYPlot height={200} width={200}>
      {gradient}
      <VerticalBarSeries data={series1} color={'url(#myGradient)'} />
    </XYPlot>
    <XYPlot height={200} width={200}>
      {gradient}
      <LineSeries data={series1} color={'url(#myGradient)'} />
    </XYPlot>
    <XYPlot height={200} width={200}>
      {gradient}
      <MarkSeries data={series1} color={'url(#myGradient)'} />
    </XYPlot>
  </div>)
```

Note that I'm using the userSpaceOnUse gradient unit, so the colors are set independently of the size of the object. I'm borrowing the colors of the gradient from the ones used on the activity sparklines in GitHub.
# Radial chart

`RadialChart` is responsible for creating pie and donut charts. While this kind of chart is easy to overlook as insignificant, intentionally confusing, or almost always replaceable with a treemap; they can be useful for quickly showing small groups. People don't understand angles very well [(such is our biology)](https://www.interaction-design.org/literature/book/the-encyclopedia-of-human-computer-interaction-2nd-ed/data-visualization-for-human-perception), but over the last hundred years we have seen a lot of pie charts! This has caused us to become intimately familiar with them.

<!-- INJECT:"CustomRadiusRadialChartWithLink" -->

We can leverage this familiarity to quickly transmit information to our reader. The best type of information to display in this way (in our opinion) is groups of less 6 or so. More than that becomes pretty hard to compare and the reader just sees visual noise. The radial chart is easy to deploy:

```jsx

<RadialChart
  data={myData}
  width={300}
  height={300} />
```

The radial chart accepts children if you wish to give it them. This can be useful for adding tooltips, for example:

<!-- INJECT:"DonutChartExampleWithLink" -->


## Data format Reference


Radial chart has a very similar API to the arc series, but with even fewer requirements. To wit the data can be as simple as


```javascript
const myData = [{angle: 1}, {angle: 5}, {angle: 2}]
```

Or as complex as

[
  {angle: 1, radius: 10},
  {angle: 2, label: 'Super Custom label', subLabel: 'With annotation', radius: 20},
  {angle: 5, radius: 5, label: 'Alt Label'},
  {angle: 3, radius: 14},
  {angle: 5, radius: 12, subLabel: 'Sub Label only', className: 'custom-class'}
];

#### angle

Type: `number`

The only required property for the data, this determines the angular size of each wedge.

#### radius

Type: `number`

The distance between the origin and the outside of the arc. This values is scaled linearly by default

#### label

Type: `string`

The label to show next to the wedge.

#### subLabel

Type: `string`

The subLabel to show next to the wedge. This can be used for annotations to the top label.

#### color (optional)

Type: `string|number`

The color of a box in the series. By default the color is interpreted as number to be scaled to a color range. This can be over-ridden by providing the prop colorType="literal" to the series itself. This property can also be defined on the series level.

#### style (optional)

Type: `object`

SVG paths (which is what the arc series is made up of) have numerous manipulable properties, so rather than trying to prescribe all of them as props we offer a port to let you style it for yourself. This overrides the series level version of this property.

#### className (optional)

Type: `string`

The className to be added to an individual arc in the series.

#### padAngle (optional)

Type: `number|function`

The padding to be applied between arcs. See above donut chart for an example of a padded angle.

## Api

##### angleDomain, angleRange, angleType

Scale properties for the `angle` scale. The `angle` property _should be_ passed in the data, otherwise the chart won't be shown.
Please refer to [Scales and Data](scales-and-data.md) for more information about scales.

##### animation (optional)

Type: `boolean|Object`

Please refer to [Animation](animation.md) doc for more information.

##### className (optional)


Type: `string`

DOM classNames to be added to the wrapper component.

##### colorDomain, colorRange, colorType

Scale properties for the `color` scale. If `color` property is not passed in the data object, each new section of the chart gets the next color (e. g. the `'category'` scale is applied).
Please refer to [Scales and Data](scales-and-data.md) for more information about scales.

##### data


Type: `Array<Object>`

Array of data for the series. See above data format reference.

##### fillDomain, fillRange, fillType

Scale properties for the `fill` scale. If `fill` property is not passed in the data object, color scale is used instead.
Please refer to [Scales and Data](scales-and-data.md) for more information about scales.

##### height (required, pixels)

#### innerRadius

Type: `number` in pixels

If radius is not set on the data then this can be used to set the innerRadius for all of the rows. This can be useful for building donut charts.

##### width (required, pixels)

##### labelsAboveChildren

Type: `boolean`

Whether or not to position the labels on top of the children. This can be useful if you have circular gridline and you want your labels to be legible on top of your grids.

##### labelsRadiusMultiplier

Type: `number`

How far the labels should be from the center of the chart as a function of the radius of the chart. If not specified, the default value of 1.1 is used (slightly outside of the chart).
Note that the property is labelsRadiusMultiplier (labels plural, not labelRadiusMultiplier)

##### labelsStyle

Type: 'Object'

A style object specifically for the labels.
Note that the property is labelsStyle (labels plural, not labelStyle)

##### margin (optional, pixels)

Type: `Object`

Default: `{left: 40, right: 40, top: 10, bottom: 10}`

#### radius

Type: `number` in pixels

If radius is not set on the data then this can be used to set the radius for all of the rows.

##### showLabels (optional)

Type: `boolean`

Whether or not to show the labels specified in the data

##### strokeDomain, strokeRange, strokeType

Scale properties for the `stroke` scale. If `stroke` property is not passed in the data object, stroke is _not_ visualized.
Please refer to [Scales and Data](scales-and-data.md) for more information about scales.
## ArcSeries:

<!-- INJECT:"ArcSeriesExampleWithLink" -->

The arc series allows users to specify arbitrary arcs in the plane! This is useful for making pie charts, sunbursts, and anything else circular.

```javascript
<XYPlot
  xDomain={[-5, 5]}
  yDomain={[-5, 5]}
  width={300}
  height={300}>
  <ArcSeries
    animation
    radiusType={'literal'}
    center={{x: -2, y: 2}}
    data={myData}
    colorType={'literal'}/>
</XYPlot>
```

A key point: XYPlot infers the necessary x and y domains by converting the angular coordinates to cartesian. If you want to guarantee a centered plot it is advisable to set the x and y domain's yourself, as above.

## Data format Reference

Arc series works a little bit different than other series. The most natural language to describe arcs is using polar coordinates, so we allow
users to write just that:

```javascript
const myData = [
  {angle0: 0, angle: Math.PI / 4, opacity: 0.2, radius: 2, radius0: 1},
  {angle0: PI / 4, angle: 2 * PI / 4, radius: 3, radius0: 0},
  {angle0: 2 * PI / 4, angle: 3 * PI / 4, radius: 2, radius0: 0},
  {angle0: 3 * PI / 4, angle: 4 * PI / 4, radius: 2, radius0: 0},
  {angle0: 4 * PI / 4, angle: 5 * PI / 4, radius: 2, radius0: 0},
  {angle0: 0, angle: 5 * PI / 4, radius: 1.1, radius0: 0.8}
]
```

angle0 describes the start of the arc in radians, and angle describes the end of the arc, again in radians. radius0 describes the inner distance from the origin, while radius describes the outer distance to the origin. It is recommended to provide all four of these quantities to format your arcs well.

#### angle0

Type: `number`

The start position of the arc in radians. This quantity is returned literally by default.

#### angle

Type: `number`

The end position of the arc in radians. This quantity is returned literally by default.

#### radius0

Type: `number`

The distance between the origin and the inside of the arc. This values is scaled linearly by default

#### radius

Type: `number`

The distance between the origin and the outside of the arc. This values is scaled linearly by default

#### radiusDomain

Type: `array of numbers`

The domain over which the radius is scaled. This can be an essential element in getting your arcs to look right, the automatic inference for the prop tends to be somewhat inaccurate, so it is highly encourage that you set it for your self as appropriate. For example: [0, 3]. See the code for ArcSeriesExample for more.

#### color (optional)

Type: `string|number`

The color of an arc in the series. By default, the color is interpreted as number to be scaled to a color range. This can be over-ridden by providing the prop colorType="literal" to the series itself. This property can also be defined on the series level. See [colors](colors.md)

#### fill (optional)

Type: `string|number`

The inner color of an arc in the series. If `fill` and `color` are provided, `fill` will override `color`. By default, the color is interpreted as number to be scaled to a color range. This can be over-ridden by providing the prop fillType="literal" to the series itself. This property can also be defined on the series level. See [colors](colors.md)

#### stroke (optional)

Type: `string|number`

The outer color of an arc in the series (i.e. its outline). If `stroke` and `color` are provided, `stroke` will override `color`. By default, the color is interpreted as number to be scaled to a color range. This can be over-ridden by providing the prop strokeType="literal" to the series itself. This property can also be defined on the series level. See [colors](colors.md)

#### opacity (optional)

Type: `string|number`

Default: 1

The opacity of an arc in the series, from 0 (transparent) to 1 (opaque).

#### padAngle (optional)

Type: `number|function`

The padding to be applied between arcs.

<!-- INJECT:"ClockExampleWithLink" -->

## Series API Reference

#### animation (optional)
See the [XYPlot](xy-plot.md)'s `animation` section for more information.

#### center

Type: `Object` of the form `{x, y}`, where x and y are in coordinates

This allows users to specify the origin of their arcs.

#### color

Type: `string|number`

The color for all elements in the series, this property will be over-ridden by color specified in the data attribute.

#### className (optional)

Type: `string`

Provide an additional class name for the series.

#### data

Type: `Array<Object>`

Array of data for the series. See above data format reference.

#### fill

Type: `string|number`

The inner color for all elements in the series, this property will be over-ridden by color specified in the data attribute.

#### opacity

Type: `string|number`

The opacity for all elements in the series, this property will be over-ridden by color specified in the data attribute.

#### stroke

Type: `string|number`

The outer color for all elements in the series, this property will be over-ridden by color specified in the data attribute.

#### style (optional)

Type: `object`

SVG paths (which is what the arc series is made up of) have numerous manipulable properties, so rather than trying to prescribe all of them as props we offer a port to let you style it for yourself.

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
<ArcSeries
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
<ArcSeries
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
<ArcSeries
...
  onSeriesMouseOver={(event)=>{
    // does something on mouse over
    // you can access the value of the event
  }}
```

#### onSeriesRightClick

Type: `function`

Default: none

This handler fires when the user right-clicks somewhere on a series, and provides the corresponding event. Unlike onClick, it doesn't pass a specific datapoint.

```jsx
<ArcSeries
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
<ArcSeries
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
<ArcSeries
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
<ArcSeries
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
<ArcSeries
...
  onValueRightClick={(datapoint, event)=>{
    // does something on right click
    // you can access the value of the event
  }}
```
## Crosshair

<!-- INJECT:"DynamicCrosshairWithLink" -->

`Crosshair` is a tooltip for multiple values at the same time. Its purpose is to combine several values with the similar X coordinate in one tooltip. Crosshair is automatically aligned by the x coordinate depending on what values are passed.
In case if custom representation of crosshair is needed, the component is able to wrap the user's JSX. In this case no CSS is applied to that. Here's a short example:

```jsx
<Crosshair values={myValues}>
  <div style={{background: 'black'}}>
    <h3>Values of crosshair:</h3>
    <p>Series 1: {myValues[0].x}</p>
    <p>Series 2: {myValues[1].x}</p>
  </div>
</Crosshair>
```

#### className (optional)

Type: `string`

Provide an additional class name for the series.

#### itemsFormat (optional)

Type: `function`

The function that formats the list of items for the crosshair. Receives the list of data points, should return an array of objects containing `title` and `value` properties.
_Note: please pass custom contents in case if you need different look for the crosshair._

#### style (optional)

Type: `object`

An object that contains objects of CSS properties with which the component can be entirely re-styled.
As the Crosshair is composed of several elements, it is possible to provide style objects for any and all parts of the tree. See [style](style.md)
Most generally, there are three top level keys: `line`, `title`, and `box`. These in turn lead to their corresponding style objects.

#### titleFormat (optional)

Type: `function`

The function that formats the title for the crosshair. Receives the list of data points, should return an object containing `title` and `value` properties.
_Note: please pass custom contents in case if you need different look for the crosshair._

#### values

Type: `Array<Object>`

The array of data points to show the crosshair at. Crosshair will automatically align to the horizontal position of the points passed there.
# Sankey

Sankey diagrams are a form of graph that allows for the easy communication of flows and other transferal processes.

<!-- INJECT:"EnergySankeyWithLink" -->

### Usage

```jsx
import {Sankey} from 'react-vis';

const nodes = [{name: 'a'}, {name: 'b'}, {name: 'c'}];
const links = [
  {source: 0, target: 1, value: 10},
  {source: 0, target: 2, value: 20},
  {source: 1, target: 2, value: 20}
];

<Sankey
  nodes={nodes}
  links={links}
  width={200}
  height={200}
/>
```

### Api

##### width (required, pixels)
##### height (required, pixels)

<!-- INJECT:"BasicSankeyWithLink" -->

##### nodes (required)

Type: `Object`

An array of objects matching the following shape:

```
{
  name: String,
  color: String,
  opacity: Number,
  key: String
}
```

The name will be displayed as a label next to its node.

All these fields are optional.

##### links (required)

Type: `Object`

An array of objects matching the following shape, where both `source` and `target`
are the indexes of the nodes they intent to represent, and `value` that would
match the height of the path link.

```
{
  // required
  source: Number,
  target: Number,
  value: Number,
  // optional
  color: String,
  opacity: Number,
  key: String
}
```

##### margin (pixels)

Type: either number or {top: Number, left: Number, right: Number, bottom: Number}

The margin that will applied around the edge of the diagram.

##### nodeWidth (optional)

Type: `Number`(pixels)

Defaults: `10`.

Width of the nodes.

##### nodePadding (optional)

Type: `Number`(pixels)

Defaults: `10`.

Padding between each node.

##### align (optional)

Type: `String`, one of  `justify`, `center`, `left`, `right`

Defaults: `justify`.

The alignment used for the sankey, see above for an example.

##### layout (optional)

Type: `Number`

Defaults: `50`.

The number of passes the sankey algorithm will do in order to arrange positioning.

##### hasVoronoi (optional)

Type: `Boolean`

Defaults: `false`

Determine if the node selection will be done using a voronoi or not. Although less
precise, it can help providing a better interactive experience to the user.

<!-- INJECT:"VornoiSankeyWithLink" -->

##### hideLabels (optional)

Type: `Boolean`

Defaults: `false`.

Hide the display of the node names if specified to true.


#### labelRotation (optional)

Type: `Number`

Default: `0`
Rotate the angle of the labels in the sankey

##### onValueClick (optional)

Type: `function`

Default: noop
This handler is triggered either when the user clicks on a node. Callback when clicking a node, or the voronoi assigned to this node, pass the node.
```jsx
<Sankey
...
  onValueClick={(datapoint, event)=>{
    // does something on click
    // you can access the value of the event
  }}
```


##### onValueMouseOver (optional)

Type: `function`

Default: noop
This handler is triggered either when the user hovers over a node. Callback when clicking a node, or the voronoi assigned to this node, pass the node.
```jsx
<Sankey
...
  onValueClick={(datapoint, event)=>{
    // does something on click
    // you can access the value of the event
  }}
```

##### onValueMouseOut (optional)

Type: `function`

Default: noop
This handler is triggered either when the users mouse leaves a node. Callback when clicking a node, or the voronoi assigned to this node, pass the node.
```jsx
<Sankey
...
  onValueClick={(datapoint, event)=>{
    // does something on click
    // you can access the value of the event
  }}
```


#### onLinkClick (optional)

Type: `function`

Default noop
This handler is triggered when the user clicks on a link. Callback accepts the data point associated with this link as well as the click event.
```jsx
<Sankey
  onLinkClick={(linkdata, event)=>{
    // does something on click
    // you can access the value of the event
  }}
/>
```

#### onLinkMouseOver (optional)

Type: `function`

Default noop
This handler is triggered when the user's mouse hovers over a link. Callback accepts the data point associated with this link as well as the click event.
```jsx
<Sankey
  onLinkMouseOver={(linkdata, event)=>{
    // does something on mouseover
    // you can access the value of the event
  }}
/>
```

#### onLinkMouseOut (optional)

Type: `function`

Default noop
This handler is triggered when the user's exits a link. Callback accepts the data point associated with this link as well as the click event.
```jsx
<Sankey
  onLinkMouseOut={(linkdata, event)=>{
    // does something on mouseout
    // you can access the value of the event
  }}
/>
```

#### style (optional)

Type: `object`

An object that contains CSS properties with which the axis component can be entirely re-styled.
As the Sankey is composite of several composite elements, it is possible to provide style objects for any and all parts of the tree. See [style](style.md)
Most generally, there are three top level components `labels`, `links`, and `rects`. These in turn lead to their corresponding to style objects. As an example, here is the default style object for the Sankey:

```jsx
<Sankey data={mydata} style={{
  labels: {},
  links: {},
  rects: {}
}}/>
```

##### children (optional)
Type: `Node` (Based on React.PropTypes.node: Anything that can be rendered: numbers, strings, elements or an array (or fragment) containing these types.)


Allows to render additional children at the inner XYPlot used by the Sankey. See the [XYPlot](xy-plot.md)'s for more general information on children.
This is especially useful for rendering of Hints within a Sankey (since the must be rendered inside the XYPlot).
```jsx
<Sankey
  nodes={nodes}
  links={links}
  width={200}
  height={200}
  >
  <Hint x={x} y={y} value={myValue}/>
</Sankey>
```
(See sample [Sankey - With hint (for links)](examples/showcases/sankeys-showcase.md) at showcase for more details.)
