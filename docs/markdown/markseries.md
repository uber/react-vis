## MarkSeries & MarkSeriesGL

<!-- INJECT:"ScatterplotChart" -->

The Markseries allows users to embed discrete information in pairs of continuous variables,
that is make scatterplots. Deploying a markseries is super easy:

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

react-vis offers two different types of MarkSeries, one that renders SVG and one that renders WebGL.
The SVG mode is accessed by using the normal `MarkSeries`, just as above, while the WebGL mode is used by simply calling
`MarkSeriesGL` instead of `MarkSeries`. Important tip! It is most effective to hover over your points using onNearestXY rather
than onValueMouseOver.

<!-- INJECT:"ScatterplotGLChart" -->

**NOTE**: using the GL version of this layer disables animation

## API

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

#### onNearestX (optional)
Type: `function(value, info)`  
A callback function which is triggered each time when the mouse pointer gets close to some X value.
Callback is triggered with two arguments. `value` is the data point, `info` object has following properties:
- `innerX` is the left position of the value;
- `index` is the index of the data point in the array of data;
- `event` is the event object.

#### onNearestXY (optional)
Type: `function(value, info)`
A callback function which is triggered on mousemove and returns the closest point vased on the voronoi layout.
Callback is triggered with two arguments. `value` is the data point, `info` object has following properties:
- `innerX` is the horizontal position of the value;
- `innerY` is the vertical position of the value;
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

## MarkSeriesGL API Additions

In addition to the above api the GL version of markSeries exposes several additional props.

#### seriesId (REQUIRED)
Type: `string`
This string is used by deck.gl to identify which layer is being requested to render.

#### outline (optional)
Type: `Boolean`
This boolean determines whether or not to switch to the outline mode for the markes
