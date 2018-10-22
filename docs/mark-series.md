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
