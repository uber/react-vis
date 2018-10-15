## ContourSeries

The contour series allows for the easy creation of contour density plots. These can be more effective for visualizing heat map data than a rectangular heat map! Given a number of points in a space the relative contour lines are computed, so as to simplify the output into a more legible format!

<!-- INJECT:"ContourSeriesExampleWithLink" -->

The ContourSeries expects a similar data input as would be fed to either the MarkSeries or the HeatmapSeries. It can be as easy as just providing a well formatted data prop (an array of object containing numerically valued x and y keys), or more complex such as below:

```javascript
<XYPlot
  xDomain={[40, 100]}
  yDomain={[1.5, 8]}
  width={600}
  height={300}>
  <ContourSeries
    animation
    className="contour-series-example"
    style={{
      stroke: '#125C77',
      strokeLinejoin: 'round'
    }}
    colorRange={[
      '#79C7E3',
      '#FF9833'
    ]}
    data={data}/>
</XYPlot>
```

## API reference

#### animation (optional)
See the [XYPlot](xy-plot.md)'s `animation` section for more information.

#### bandwidth (optional)
A parameter that directly maps into d3-contour's bandwidth parameter. See the [docs for more](https://github.com/d3/d3-contour#density_bandwidth)

#### className (optional)

Type: `string`

Provide an additional class name for the series.

#### data

Type: `Array<Object>`

Array of data for the series. Follows the usual pattern of an array of objects formatted with x and y coordinates, [{x: 0, y: 0}, ...].

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
