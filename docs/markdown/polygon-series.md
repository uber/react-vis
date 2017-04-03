## PolygonSeries:

<!-- INJECT:"TriangleExample" -->

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

#### color
Type: `string`
The color for all elements in the series, this property will be over-ridden by color specified in the data attribute.

#### className (optional)
Type: `string`
Provide an additional class name for the series.

#### data
Type: `Array<Object>`
Array of data for the series. See above data format reference.

#### onNearestX (optional)
Type: `function(value, {event, innerX, index})`  
A callback function which is triggered each time when the mouse pointer gets close to some X value.
Callback is triggered with two arguments. `value` is the data point, `info` object has following properties:
- `innerX` is the left position of the value;
- `index` is the index of the data point in the array of data;
- `event` is the event object.

#### onSeriesMouseOver (optional)
Type: `function(d, {event})`  
`mouseover` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.

#### onSeriesMouseOut (optional)
Type: `function(d, {event})`  
`mouseout` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.  

#### onSeriesClick (optional)
Type: `function(d, {event})`  
`click` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.  

#### style
Type: `object`
Paths accept a ton of different styles, so rather than prescribe every single one we just accept a general grab bag pf the styles. check out the [w3](https://www.w3schools.com/graphics/svg_path.asp) page for more details.
