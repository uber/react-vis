## Series

The library supports several types of series:

* [LineSeries](line-series.md) for lines;
* `AreaSeries` for area charts;
* `MarkSeries` for scatterplots;
* [LineMarkSeries](line-series.md) is a shorthand to place marks (e.g. circles) on lines;
* `VerticalBarSeries` for vertical bar charts;
* `HorizontalBarSeries` for horizontal bar charts;
* `HeatmapSeries` for heat maps.

Each series provides following API:

#### data
Type: `Array<Object>`
Array of data for the series.

#### x
Type: `number|Object`  
Exact X position of all series points in pixels or a series object.

#### y (optional)  
Type: `number|Object`  
Exact Y position of all series points in pixels or a series object.

#### color (optional)
Type: `string|Object`
Exact color for all series points or a series object.

#### size (optional)
Type: `number|Object`  
Exact size for all series points in pixels or a series object.

#### opacity (optional)
Type: `number|Object`  
Exact opacity for all series points in pixels or a series object.

#### className (optional)
Type: `string`
Provide an additional class name for the series.

#### onNearestX (optional)
Type: `function(value, info)`  
A callback function which is triggered each time when the mouse pointer gets close to some X value.
Callback is triggered with two arguments. `value` is the data point, `info` object has following properties:
- `innerX` is the left position of the value;
- `index` is the index of the data point in the array of data;
- `event` is the event object.

#### onValueMouseOver (optional)
Type: `function(d, info)`  
`mouseover` event handler for the elements corresponding separate data points `d` is a data point, `info` is an object with the only `event` property.  
**NOTE**: This event handler is *not* triggered for AreaSeries and LineSeries.

#### onValueMouseOut (optional)
Type: `function(d, info)`  
`mouseout` event handler for the elements corresponding separate data points. `d` is a data point, `info` is an object with the only `event` property.  
**NOTE**: This event handler is *not* triggered for AreaSeries and LineSeries.

#### onValueClick (optional)
Type: `function(d, info)`  
`click` event handler for the elements corresponding separate data points. `d` is a data point, `info` is an object with the only `event` property.  
**NOTE**: This event handler is *not* triggered for AreaSeries and LineSeries.

#### onSeriesMouseOver (optional)
Type: `function(info)`  
`mouseover` event handler for the entire series. Received `info` object as argument with the only `event` property.

#### onSeriesMouseOut (optional)
Type: `function(info)`  
`mouseout` event handler for the entire series. Received `info` object as argument with the only `event` property.

#### onSeriesClick (optional)
Type: `function(info)`  
`click` event handler for the entire series. Received `info` object as argument with the only `event` property.

#### animation (optional)  
See the [XYPlot](xy-plot.md)'s `animation` section for more information.
