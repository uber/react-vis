## PolygonSeries:

<!-- INJECT:"TriangleExampleWithLink" -->

The polygon series allows users to specify arbitrary polygons in coordinates. This may seem un-useful, but it allows for
easy creation of radar charts, fancy mark series dots, and any variety of additional things you might need polygons for!

```javascript
<XYPlot
  width={300}
  height={300}>
  <XAxis />
  <YAxis />
  <PolygonSeries
    className="polygon-series-example"
    data={myData}/>
</XYPlot>
```

Each series corresponds to exactly **one** svg path. It is perfectly okay to many series to express many polygons!

## Data format Reference

Like other series, it is required that the data be an array of objects, formatted like so:


```javascript
const myData = [
  {x: 0, y: 0},
  {x: 1, y: 0},
  {x: 0, y: 1}
]
```

Which would render a triangle.

#### x

Type: `number`

The x position in coordinates of the box to be used.

#### y

Type: `number`

The y position in coordinates of the box to be used.


## Series API Reference

#### animation (optional)
See the [XYPlot](xy-plot.md)'s `animation` section for more information.

#### className (optional)

Type: `string`

Provide an additional class name for the series.

#### color

Type: `string`

The color for all elements in the series, this property will be over-ridden by color specified in the data attribute. See [colors](colors.md)

#### data

Type: `Array<Object>`

Array of data for the series. See above data format reference.

#### style

Type: `object`

Paths accept a ton of different styles, so rather than prescribe every single one we just accept a general grab bag pf the styles. check out the [w3](https://www.w3schools.com/graphics/svg_path.asp) page for more details and the [style] documentation (style.md).

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

#### onSeriesClick (optional)

Type: `function(d, {event})`

`click` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property. See [interaction](interaction.md)

#### onSeriesMouseOut (optional)

Type: `function(d, {event})`

`mouseout` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an

#### onSeriesMouseOver (optional)

Type: `function(d, {event})`

`mouseover` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property. See [interaction](interaction.md)
object with the only `event` property. See [interaction](interaction.md)

#### onSeriesRightClick (optional)

Type: `function(d, {event})`

`right-click` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property. See [interaction](interaction.md)
