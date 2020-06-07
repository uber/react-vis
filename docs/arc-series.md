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
