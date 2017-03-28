# Bar Series

**TLDR**: use bar series to make bar charts, but not histograms.

Bar series allows users to construct charts that contain rectangles that are oriented either left-right or top-bottom. This type of series is generally used to visualize mappings of categorical data to quantitative data. For instance if you had counts of pigeon sightings by season, that would be a perfect bar series (`[{x: 'winter', y: 10}, {x: 'spring', y: 100}, {x: 'summer', y: 10000}, {x: 'fall', y: 10}]`), while if that data was represented as the individual records of your sightings of pigeons (`[{x: May 1st 2pm}, {x: May 12th 1am}]`) you might either want a mark-series (to make a scatterplot) or a rect-series (to make a histogram).

<!-- INJECT:"BarChart" -->

Bar series come in two flavors, `HorizontalBarSeries` and `VerticalBarSeries`. VerticalBarSeries have vertical bars, HorizontalBarSeries have horizontal bars, plain and simple!

<!-- INJECT:"StackedHorizontalBarChart" -->

## Data format Reference

Like other series, it is required that the data be an array of objects, formatted like so:


```javascript
const myData = [
  {x: 'A', y: 10},
  {x: 'B', y: 5},
  {x: 'C', y: 15}
]
```

Where x and y are required quantities and additional properties may be stapled on.

#### x
Type (VerticalBarSeries): `string|number`  
Type (HorizontalBarSeries): `number`
The x position in coordinates of the box to be used. This quantity is treated as a category (at least in VerticalBarSeries) and so considers the exact left-right positioning to be not that important (which is something to watch out for if you are providing exact numbers, in such a case it is better to the rect-series).

#### y
Type (VerticalBarSeries): `number`  
Type (HorizontalBarSeries): `string|number`
The y position in coordinates of the box to be used. For VerticalBarSeries this value is considered a number, and is scaled against it's domain into pixels.

#### color (optional)
Type: `string|number`
The color of a bar in the series. By default the color is interpreted as number to be scaled to a color range. This can be over-ridden by providing the prop colorType="literal" to the series itself. This property can also be defined on the series level.

#### opacity (optional)
Type: `number|Object`  
Opacity of the individual box to be rendered. By default opacity is scaled by `literal`, so the exact value provided will be used. This property can also be defined on the series level.

#### stroke (optional)
Type: `number|Object`  
The color of the outline of the box to be rendered. When this value is not provided the color attribute is used instead. This property can also be defined on the series level.

#### fill (optional)
Type: `number|Object`  
The color of the inside of the box to be rendered. When this value is not provided the color attribute is used instead. This property can also be defined on the series level.

## Series API Reference

#### animation (optional)  
See the [XYPlot](xy-plot.md)'s `animation` section for more information.

#### color
Type: `string|number`
The color for all elements in the series, this property will be over-ridden by color specified in the data attribute.

#### className (optional)
Type: `string`
Provide an additional class name for the series.

### cluster
Supply a clustering key for this series.
When used with the `stackBy` attribute, creates a clustered stacked bar chart. Returning to our pigeon example from earlier, if you had multiple years of pigeon sightings by season and you wanted to compare the season, clustering would be a great way to do that.

<!-- INJECT:"ClusteredStackedVerticalBarChart" -->

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
Type: `function({event})`  
`mouseover` event handler for the entire series. Receives an object as argument with the `event` property.

#### onSeriesMouseOut (optional)
Type: `function({event})`  
`mouseout` event handler for the entire series. Receives an object as argument with the `event` property.

#### onSeriesClick (optional)
Type: `function({event})`  
`click` event handler for the entire series. Receives an object as argument with the `event` property.

#### opacity
Type: `string|number`
The opacity for all elements in the series, this property will be over-ridden by color specified in the data attribute.

#### stroke
Type: `string|number`
The outer color for all elements in the series, this property will be over-ridden by color specified in the data attribute.
