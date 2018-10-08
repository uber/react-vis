## HeatmapSeries:

<!-- INJECT:"HeatmapChartWithLink" -->

The heatmap series enables users to create a 2d binning of the plane. These series often come in useful in situations when you might be using a scatterplot, but have too many rows of data for the reader to easily understand what is going on. So arises HeatmapSeries!

```javascript
<XYPlot
  width={300}
  height={300}>
  <XAxis />
  <YAxis />
  <HeatmapSeries
    className="heatmap-series-example"
    data={myData}/>
</XYPlot>
```

Another way to think of the heatmap, is as a 2D histogram, where each cell is colored by it's value rather than height-ed or width-ed.

#### Color in heatmaps

<!-- INJECT:"LabeledHeatmap" -->

The Heatmap's color can be manipulated in two data driven ways, first by setting the setting colorRange on the series

```javascript
<HeatmapSeries
  className="heatmap-series-example"
  colorRange={["red", "blue"]}
  data={myData}/>
```

Which assumes that each row of data has a number specifying it's color attribute. Alternatively you can change the scale type of color to allow yourself to specify color of the cell directly:

```javascript
<HeatmapSeries
  colorType="literal"
  data={[
    {x: 1, y: 0, color: "#f00"},
    {x: 1, y: 5, color: "#f00"},
    {x: 1, y: 10, color: "#0f0"}
  ]}/>
```

The color can also usefully be set using a color accessor,
```javascript
<HeatmapSeries
  colorType="literal"
  getColor={d => d.color === 'bad' ? '#f00' : '#0f0'}
  data={[
    {x: 1, y: 0, color: 'bad'},
    {x: 1, y: 5, color: 'bad'},
    {x: 1, y: 10, color: 'good'}
  ]}/>
```

Finally, the color could also be specified on the series itself, however that would probably not be the best use of a heatmap as it would color every cell in the series the same color.

## Data format Reference

Like other series, it is required that the data be an array of objects, formatted like so:


```javascript
const myData = [
  {x: 1, y: 0, color: 10},
  {x: 1, y: 5, color: 10},
  {x: 1, y: 10, color: 6},
  {x: 1, y: 15, color: 7},
  {x: 2, y: 0, color: 12},
  {x: 2, y: 5, color: 2},
  {x: 2, y: 10, color: 1},
  {x: 2, y: 15, color: 12},
  {x: 3, y: 0, color: 9},
  {x: 3, y: 5, color: 2},
  {x: 3, y: 10, color: 6},
  {x: 3, y: 15, color: 12}
]
```

Where x and y are required quantities and additional properties may be stapled on.

#### x

Type: `number`

The x position in coordinates of the box to be used.

#### y

Type: `number`

The y position in coordinates of the box to be used.

#### color (optional)

Type: `string|number`

The color of a box in the series. By default the color is interpreted as number to be scaled to a color range. This can be over-ridden by providing the prop colorType="literal" to the series itself. This property can also be defined on the series level.


## Series API Reference

#### animation (optional)
See the [XYPlot](xy-plot.md)'s `animation` section for more information.

#### color

Type: `string|number`

The color for all elements in the series, this property will be over-ridden by color specified in the data attribute. See [colors](colors.md)

#### className (optional)

Type: `string`

Provide an additional class name for the series.

#### data

Type: `Array<Object>`

Array of data for the series. See above data format reference.

#### fill

Type: `string|number`

The inner color for all elements in the series, this property will be over-ridden by color specified in the data attribute. See [colors](colors.md)

#### opacity

Type: `string|number`

The opacity for all elements in the series, this property will be over-ridden by color specified in the data attribute.

#### stroke

Type: `string|number`

The outer color for all elements in the series, this property will be over-ridden by color specified in the data attribute. See [colors](colors.md)

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

#### onValueMouseOver (optional)

Type: `function(d, {event})`

`mouseover` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.

#### onValueMouseOut (optional)

Type: `function(d, {event})`

`mouseout` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.

#### onValueRightClick (optional)

Type: `function(d, {event})`

`right-click` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.
