## WhiskerSeries

<!-- INJECT:"WhiskerChartWithLink" -->

WhiskerSeries plots variance "whiskers" for each data point. Often this is used in combination with another series (e.g. a MarkSeries or LineSeries) to represent the variance (or alternately standard deviation) associated with each value. Variance lines can be in the Y dimension, X dimension, or both.

Deploy a WhiskerSeries like this:

```javascript
render() {
  return (
    <XYPlot
      width={300}
      height={300}>
      <WhiskerSeries
        className="whisker-series-example"
        data={myData}/>
    </XYPlot>
  );
```

Just like other series, WhiskerSeries expects its data to be formatted as an array of
objects. These data points may include an `xVariance` property, a `yVariance` property,
or both:

```javascript
const myData = [
  {x: 1, y: 10, xVariance: 4, yVariance: 4},
  {x: 1.7, y: 12, xVariance: 7, yVariance: 7},
  {x: 2, y: 5, xVariance: 3, yVariance: 3},
  {x: 3, y: 15, xVariance: 10, yVariance: 10},
  {x: 2.5, y: 7, xVariance: 4, yVariance: 4}
];
```

WhiskerSeries also accepts a `size` value that specifies an empty "buffer" region.
This is especially useful if you are combining the whiskers with another series, and
the marks of that series include transparent regions. The buffer region prevents
whisker lines from being drawn behind that other mark.

```javascript
const myData = [
  {x: 1, y: 10, size: 30, yVariance: 4},
  {x: 1.7, y: 12, size: 10, yVariance: 7},
  {x: 2, y: 5, size: 1, yVariance: 3},
  {x: 3, y: 15, size: 12, yVariance: 10},
  {x: 2.5, y: 7, size: 4, yVariance: 4}
];
```


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

#### size (optional)

Type: `string|number`

Default: `0`

The size of an empty "buffer" region at the center of each mark.

#### xVariance (optional)

Type: `string|number`

The size of each of the lines in the X dimension. Either xVariance, yVariance, or both should be specified.

#### yVariance (optional)

Type: `string|number`

The size of each of the lines in the Y dimension. Either xVariance, yVariance, or both should be specified.


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

#### opacity (optional)

Type: `string|number`

Exact opacity for all series points in pixels or a series object, from 0 (transparent) to 1 (opaque)

#### size (optional)

Type: `string|number`

Exact size of an empty "buffer" region for all series points in pixels or a series object.

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

This handler fires when the user clicks somewhere on a series, and provides the corresponding event. Unlike onValueClick, it doesn't pass a specific datapoint.

```jsx
<WhiskerSeries
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
<WhiskerSeries
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
<WhiskerSeries
...
  onSeriesMouseOver={(event)=>{
    // does something on mouse over
    // you can access the value of the event
  }}
```

#### onSeriesRightClick

Type: `function`

Default: none

This handler fires when the user right-clicks somewhere on a series, and provides the corresponding event. Unlike onValueRightClick, it doesn't pass a specific datapoint.

```jsx
<WhiskerSeries
...
  onSeriesRightClick={(event)=>{
    // does something on click
    // you can access the value of the event
  }}
```

#### onValueClick

Type: `function`

Default: none

This handler is triggered either when the user clicks on a mark.
The handler passes two arguments, the corresponding datapoint and the actual event.
```jsx
<WhiskerSeries
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
<WhiskerSeries
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
<WhiskerSeries
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
<WhiskerSeries
...
  onValueClick={(datapoint, event)=>{
    // does something on right click
    // you can access the value of the event
  }}
```
