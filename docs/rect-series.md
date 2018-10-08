# Rect Series

RectSeries is a generalization of [BarSeries](bar-series.md) which allows users to build a series of rectangles of arbitrary dimensions. Whereas in barSeries, one dimension of the bars is fixed (width for vertical bar series, height for horizontal bar series), in RectSeries, both dimensions can be controlled.

RectSeries can be used to build histograms, icicle charts, or anything really where both height and width matter.

<!-- INJECT:"HistogramWithLink" -->

<!-- INJECT:"StackedHistogramWithLink" -->

Like BarSeries, RectSeries has two wrappers: HorizontalRectSeries and VerticalRectSeries. It also has a canvas version, RectSeriesCanvas (along with HorizontalRectSeriesCanvas and VerticalRectSeriesCanvas).

RectSeries isn't meant to be used directly, however, it's provided as it's being used under the hood by HorizontalRectSeries and VerticalRectSeries.

## Data format Reference

Like other series, it is required that the data be an array of objects, formatted like so:

```javascript
const myData = [
  {x: 0, x0: 1, y: 10, y0: 0},
  {x: 1, x0: 2, y: 5, y0: 0},
  {x: 2, x0: 4, y: 15, y0: 0}
]
```

The main difference with bar series is that it has x0 and y0 properties.

### For HorizontalRectSeries:

#### x (optional)

Type: `string|number|date`

Default: `0`

The value used to compute the x position of _either_ side of the rectangle.

#### x0 (optional)

Type: `string|number|date`

Default: `0`

The value used to compute the x position of the other side of the rectangle.

#### y (optional)

Type: `string|number|date`

Default: `0`

The value used to compute the y position of _the bottom_ of the rectangle.

#### y0 (optional)

Type: `string|number|date`

Default: `0`

The value used to compute the y position of _the top_ of the rectangle.

### For VerticalRectSeries:

#### x (optional)

Type: `string|number|date`

Default: `0`

The value used to compute the x position of _the left_ side of the rectangle.

#### x0 (optional)

Type: `string|number|date`

Default: `0`

The value used to compute the x position of _the right_ side of the rectangle.

#### y (optional)

Type: `string|number|date`

Default: `0`

The value used to compute the y position of _either_ side of the rectangle.

#### y0 (optional)

Type: `string|number|date`

Default: `0`

The value used to compute the y position of the other side of the rectangle.

#### color (optional)

Type: `string|number`

The color of a bar in the series. By default the color is interpreted as number to be scaled to a color range. This can be over-ridden by providing the prop colorType="literal" to the series itself. This property can also be defined on the series level. See [colors](colors.md).

#### opacity (optional)

Type: `number|Object`

Opacity of the individual box to be rendered. By default opacity is scaled by `literal`, so the exact value provided will be used. This property can also be defined on the series level.

#### stroke (optional)

Type: `number|Object`

The color of the outline of the box to be rendered. When this value is not provided the color attribute is used instead. This property can also be defined on the series level. See [colors](colors.md).

#### fill (optional)

Type: `number|Object`

The color of the inside of the box to be rendered. When this value is not provided the color attribute is used instead. This property can also be defined on the series level. See [colors](colors.md).

## Series API Reference

#### animation (optional)
See the [XYPlot](xy-plot.md)'s `animation` section for more information.

#### className (optional)

Type: `string`

Provide an additional class name for the series.

#### color

Type: `string|number`

The color for all elements in the series, this property will be over-ridden by color specified in the data attribute. See [colors](colors.md).

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

#### style

Type: `object`

A list of CSS properties to style the series outside of the explicitly set properties. Note that it will override all other properties (ie fill, stroke, opacity, color). See [style](style.md)

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

#### onValueClick (optional)

Type: `function(d, {event})`

`click` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.

#### onValueMouseOut (optional)

Type: `function(d, {event})`

`mouseout` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.

#### onValueMouseOver (optional)

Type: `function(d, {event})`

`mouseover` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.

#### onValueRightClick (optional)

Type: `function(d, {event})`

`right-click` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.

#### onSeriesClick (optional)

Type: `function({event})`

`click` event handler for the entire series. Receives an object as argument with the `event` property.

#### onSeriesMouseOut (optional)

Type: `function({event})`

`mouseout` event handler for the entire series. Receives an object as argument with the `event` property.

#### onSeriesMouseOver (optional)

Type: `function({event})`

`mouseover` event handler for the entire series. Receives an object as argument with the `event` property.

#### onSeriesRightClick (optional)

Type: `function({event})`

`right-click` event handler for the entire series. Receives an object as argument with the `event` property.
