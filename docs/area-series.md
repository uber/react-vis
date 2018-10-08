# AreaSeries

<!-- INJECT:"AreaChartWithLink" -->

In addition to the LineSeries, react-vis offers a similar chart type for area charts.
Like LineSeries, AreaSeries:
- are styled at the series level, not at the mark level.
- can have a curve property for a different interpolation between points.

Unlike LineSeries, AreaSeries:
- have a fill property. By default, the color property affects both the fill color and the outline color of the area charts. However, these two can be set independently,
- don't have an API to style the stroke beyond color. It's still possible to use the style property, though.
- can be stacked,
- do not have a canvas equivalent.

The stroke property of an AreaChart creates an outline around the whole shape of the chart (including to its left, right and bottom.) To create a chart that has a fill, no distinct lines to the left, right or bottom, but a different line style at the top, you may create an area chart with a line chart on top.

## Data format reference

#### x

Type: `number`

Left-to-right position of marks in the series.

#### y

Type: `number`

Top-to-bottom position of the top edge of the series.

#### y0

Type: `number`

Default: `0`

Top-to-bottom position of the bottom edge of the series.

## API Reference

#### color (optional)

Type: `string|number`

Default: see [colors](colors.md)

A color for both the fill and the outline of the area series. Will be overridden by both the fill and the stroke property, if provided.

#### curve (optional)

Type: `string|function`

Default: `null`

Apply the provided or named curve function from the D3 shape library to smooth the line series plot, see [the D3 documentation](https://github.com/d3/d3-shape#curves) for function names and instructions. Providing the function, not the name, will require importing the d3-shape package in order to configure it:

```javascript
// Setting up with only a name
const stringCurveProp = <AreaSeries data={data} curve={'curveMonotoneX'} .../>;

const configuredCurve = d3Shape.curveCatmullRom.alpha(0.5);
const funcCurveProp = <AreaSeries data={data} curve={configuredCurve} .../>;
```

#### data

Type: `Array<Object>`

Array of data for the series. See above data format reference.

#### fill (optional)

Type: `string|number`

Default: see [colors](colors.md)

A color for the fill of the area series. Will override the color property if both are provided.

#### getNull (optional)

Type: `function`

Default: `null`

A function that will be invoked for each data element that will return a boolean that specifies if the data point should be drawn or not. For more information see [the D3 documentation](https://github.com/d3/d3-shape#area_defined).

```javascript
// Only draw datapoints where the y value is not equal to null
<AreaSeries getNull={(d) => d.y !== null} data={data} />
```

#### opacity (optional)

Type: `number`

Default: `1`

Opacity of the area chart from 0 (transparent) to 1 (opaque).

#### stroke (optional)

Type: `string|number`

Default: see [colors](colors.md)

A color for the outline of the area series. Will override the color property if both are provided.

#### style (optional)

Type: `object`

An object which holds CSS properties that will be applied to the SVG element(s) rendered by the series. This allows you to style series beyond the other explicitly defined properties and without having to use CSS classnames and stylesheets. See [style](style.md)

```jsx
<AreaSeries
  data={data}
  style={{strokeDasharray: "2 2"}}
/>
```

### Interaction handlers

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

```jsx
<AreaSeries
...
  onNearestX={(datapoint, event)=>{
  	// does something on mouseover
  	// you can access the value of the event
  }}
```

#### onSeriesClick

Type: `function`

Default: none

This handler fires when the user clicks somewhere on an AreaSeries, and provides the corresponding event. See [interaction](interaction.md)

```jsx
<AreaSeries
...
  onSeriesClick={(event)=>{
  	// does something on click
  	// you can access the value of the event
  }}
```

#### onSeriesMouseOut

Type: `function`

Default: none

This handler fires when the user's mouse cursor leaves an AreaSeries, and provides the corresponding event. See [interaction](interaction.md)

```jsx
<AreaSeries
...
  onSeriesMouseOut={(event)=>{
  	// does something on mouse over
  	// you can access the value of the event
  }}
```

#### onSeriesMouseOver

Type: `function`

Default: none

This handler fires when the user mouses over an AreaSeries, and provides the corresponding event. See [interaction](interaction.md)

```jsx
<AreaSeries
...
  onSeriesMouseOver={(event)=>{
  	// does something on mouse over
  	// you can access the value of the event
  }}
```
