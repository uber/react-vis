## HexbinSeries

The hexbin series enables the easy creation of aggregated and binned data. This can be useful if you have a lot of overlapping data or if you simply want to provide a courser representation of data to your user. Unlike many other series this one performs the aggregation computation, simply provide a scatterplot like collection of data (points in linear x and y space) and your off!


<!-- INJECT:"HexbinSizeExampleWithLink" -->


Points are binned into hexagonal containers, which are then rendered as svg paths. These svg hexes can encode their counts through color and size! It can be particularly effective to pair this series with a [border](borders.md) element.

```javascript
<XYPlot
  xDomain={[40, 100]}
  yDomain={[1.5, 8]}
  width={300}
  getX={d => d.waiting}
  getY={d => d.eruptions}
  onMouseLeave={() => this.setState({hoveredNode: null})}
  height={300}>
  <HexbinSeries
    animation
    className="hexbin-example"
    style={{
      stroke: '#125C77',
      strokeLinejoin: 'round'
    }}
    onValueMouseOver={d => this.setState({hoveredNode: d})}
    colorRange={['white', 'black']}
    radius={radius}
    data={data}/>
</XYPlot>
```

<!-- INJECT:"HexHeatmapWithLink" -->

## API reference

#### animation (optional)

Type: `Boolean`

See the [Animation](animation.md)'s `animation` section for more information.

#### className (optional)

Type: `string`

Provide an additional class name for the series.

#### countDomain (optional)

Type: `Array of two numbers`

Provide the specific counts to the hexagon binning between. If not provided defaults to [0, <max number of cells in a binning>].

#### colorRange (optional)

Type: `Array of two strings`

Provide the colors for hexagons to interpolate between.

#### data

Type: `Array<Object>`

Array of data for the series. Follows the usual pattern of an array of objects formatted with x and y coordinates, [{x: 0, y: 0}, ...].

#### radius

Type: `Number`

The maximum size of the hexagon, specified in pixels.

#### style

Type: `object`

A list of CSS properties to style the series outside of the explicitly set properties. These style elements are applied directly to each individual hexagon. Note that it will override all other properties (ie fill, stroke, opacity, color). See [style](style.md) for more information.

#### sizeHexagonsWithCount

Type: `Boolean`

Size the hexagons based on the number of values in side of the hexagon. Ranges between [0, <radius prop>].

#### xOffset (optional)

Type: `Number`

Default: `0`

Size of aggregation offset form base value, this enables fine tuning along the x axis.

#### yOffset (optional)

Type: `Number`

Default: `0`

Size of aggregation offset form base value, this enables fine tuning along the y axis.

## Interaction handlers
#### onValueClick

Type: `function`

Default: none

This handler is triggered either when the user clicks on a mark.
The handler passes two arguments, the corresponding datapoint and the actual event.
```jsx
<HexbinSeries
...
  onValueClick={(datapoint, event)=>{
    // does something on click
    // you can access the value of the event
  }}
```
It is very important to note that data point is specified in pixels NOT in data coordinates. This can have serious consequences for how interactivity works. See the HexHeatmap example above for a worked example.

#### onValueMouseOut

Type: `function`

Default: none

This handler is triggered either when the user's mouse leaves a mark.
The handler passes two arguments, the corresponding datapoint and the actual event.
```jsx
<HexbinSeries
...
  onValueMouseOut={(datapoint, event)=>{
    // does something on click
    // you can access the value of the event
  }}
```
It is very important to note that data point is specified in pixels NOT in data coordinates. This can have serious consequences for how interactivity works. See the HexHeatmap example above for a worked example.

#### onValueMouseOver

Type: `function`

Default: none

This handler is triggered either when the user's mouse enters a mark.
The handler passes two arguments, the corresponding datapoint and the actual event.
```jsx
<HexbinSeries
...
  onValueMouseOver={(datapoint, event)=>{
    // does something on click
    // you can access the value of the event
  }}
```
It is very important to note that data point is specified in pixels NOT in data coordinates. This can have serious consequences for how interactivity works. See the HexHeatmap example above for a worked example.

#### onValueRightClick

Type: `function`

Default: none

This handler is triggered either when the user right-clicks on a mark.
The handler passes two arguments, the corresponding datapoint and the actual event.
```jsx
<HexbinSeries
...
  onValueRightClick={(datapoint, event)=>{
    // does something on right click
    // you can access the value of the event
  }}
```
It is very important to note that data point is specified in pixels NOT in data coordinates. This can have serious consequences for how interactivity works. See the HexHeatmap example above for a worked example.
