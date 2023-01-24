# LineMarkSeries

The Line Mark series is a combination of a LineSeries and a MarkSeries: under the hood, it creates both a LineSeries and a MarkSeries and passes them all of its properties.

<!-- INJECT:"LineMarkChartWithLink" -->

## Data format reference

#### x

Type: `string|number|date`

x will be used to determine the x position of each point on the line. The format of x depends on what scale is being used - see [Scales and Data](scales-and-data.md)

#### y

Type: `string|number|date`

y will be used to determine the y position of each point on the line. The format of y depends on what scale is being used - see [Scales and Data](scales-and-data.md)

#### color (optional)

Type: `string|number`

The color of the line and that of the marks. By default the color is interpreted as number to be scaled to a color range. This can be over-ridden by providing the prop colorType="literal" to the series itself. This property can also be defined on the series level.

#### opacity (optional)

Type: `string|number`

Opacity of the individual box to be rendered. By default opacity is scaled by `literal`, so the exact value provided will be used. This property can also be defined on the series level.

#### stroke (optional)

Type: `string|number`

Stroke affects both the color of the line, and the outline of the marks. When this value is not provided, the color attribute is used instead. This property can also be defined on the series level.

#### fill (optional)

Type: `string|number`

The color of the inside of the marks. When this value is not provided the color attribute is used instead. This property can also be defined on the series level.

#### size (optional)

Type: `string|number`

Default: `5`

The size of each of the marks.

## API Reference

#### curve (optional)

Type: `string|function`

Default: `null`

Apply the provided or named curve function from the D3 shape library to smooth the line series plot, see [the D3 documentation](https://github.com/d3/d3-shape#curves) for function names and instructions. Providing the function, not the name, will require importing the d3-shape package in order to configure it:

```javascript
// Setting up with only a name
const stringCurveProp = <LineMarkSeries data={data} curve={'curveMonotoneX'} .../>;

const configuredCurve = d3Shape.curveCatmullRom.alpha(0.5);
const funcCurveProp = <LineMarkSeries data={data} curve={configuredCurve} .../>;
```

Some, but not all line interpolations have the resulting curve going through the original coordinates of its data points. If not, the LineSeries part of the LineMarkSeries will be detached from the MarkSeries part.

#### fill (optional)

Type: `string|number`

The inner color for all the marks in the series, this property will be over-ridden by fill specified in the data attribute. See [colors](colors.md)

#### getNull (optional)

Type: `function`

Default: `null`

A function that will be invoked for each data element that will return a boolean that specifies if the data point should be drawn or not. For more information see [the D3 documentation](https://github.com/d3/d3-shape#line_defined).

```javascript
// Only draw datapoints where the y value is not equal to null
<LineMarkSeries getNull={(d) => d.y !== null} data={data} />
```

#### stroke (optional)

Type: `string|number`

Default: see [colors](colors.md)

A color for the series. Will override color if both are provided.

##### strokeDasharray (optional)

Type: `string`

Specify a custom `stroke-dasharray` attribute which controls the pattern of dashes and gaps used to stroke paths. This will only affect the LineSeries part of the LineMarkSeries.

##### strokeStyle (optional)

Type: `string`

If set to `dashed`, your series will use dashed lines. If set to `solid` or unspecified, your series will use solid lines. See `strokeDasharray` for specifying a custom stroke dash-array value. This will only affect the LineSeries part of the LineMarkSeries.

##### strokeWidth (optional)

Type: `string|number`

Specifies the width of the line for the series. By default, this is determined by react-vis css (2px). This will affect both the thickness of the Line and the Marks.

#### style (optional)

Type: `object`

An object which holds CSS properties that will be applied to the SVG element(s) rendered by the series. See [style](style.md)This allows you to style series beyond the other explicitly defined properties and without having to use CSS classnames and stylesheets.

```jsx
<LineMarkSeries
  data={data}
  style={{strokeLinejoin: "round"}}
/>
```

`LineMarkSeries` being a composite component (a mix of [LineSeries](line-series.md) and [MarkSeries](mark-series.md)), there are two additional property in the `style` object: `line` and `mark`, which allow you to specify a style for the line or the mark part of the line mark series, respectively.

```jsx
<LineMarkSeries
  data={data}
  lineStyle={{stroke:"red"}}
  markStyle={{stroke:"blue"}}
/>
```

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
<LineMarkSeries
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
<LineMarkSeries
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
<LineMarkSeries
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
<LineMarkSeries
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
<LineMarkSeries
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
<LineMarkSeries
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
<LineMarkSeries
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
<LineMarkSeries
...
  onValueRightClick={(datapoint, event)=>{
    // does something on right click
    // you can access the value of the event
  }}
