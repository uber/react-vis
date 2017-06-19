## ArcSeries:

<!-- INJECT:"ArcSeriesExample" -->

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

angle0 describes the start of the arc in radians, and angle describes the end of the arc, again in radians. radius0 describes the inner distance from the origin, while radius describes the outer distance to the origin. It is recomended to provide all four of these quantities to format your arcs well.

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

#### color (optional)
Type: `string|number`
The color of a box in the series. By default the color is interpreted as number to be scaled to a color range. This can be over-ridden by providing the prop colorType="literal" to the series itself. This property can also be defined on the series level.

#### style (optional)
Type: `object`
SVG paths (which is what the arc series is made up of) have numerous manipulable properties, so rather than trying to prescribe all of them as props we offer a port to let you style it for yourself. This overrides the series level version of this property.

<!-- INJECT:"ClockExample" -->

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

#### onNearestX (optional)
Type: `function(value, {event, innerX, index})`  
A callback function which is triggered each time when the mouse pointer gets close to some X value.
Callback is triggered with two arguments. `value` is the data point, `info` object has following properties:
- `innerX` is the left position of the value;
- `index` is the index of the data point in the array of data;
- `event` is the event object.

#### onValueMouseOver (optional)
Type: `function(d, {event})`  
`mouseover` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.

#### onValueMouseOut (optional)
Type: `function(d, {event})`  
`mouseout` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.  

#### onValueClick (optional)
Type: `function(d, {event})`  
`click` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.  

#### onSeriesMouseOver (optional)
Type: `function(d, {event})`  
`mouseover` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.

#### onSeriesMouseOut (optional)
Type: `function(d, {event})`  
`mouseout` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.  

#### onSeriesClick (optional)
Type: `function(d, {event})`  
`click` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.  

#### opacity
Type: `string|number`
The opacity for all elements in the series, this property will be over-ridden by color specified in the data attribute.

#### stroke
Type: `string|number`
The outer color for all elements in the series, this property will be over-ridden by color specified in the data attribute.

#### style (optional)
Type: `object`
SVG paths (which is what the arc series is made up of) have numerous manipulable properties, so rather than trying to prescribe all of them as props we offer a port to let you style it for yourself.
