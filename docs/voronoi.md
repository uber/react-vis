## Voronoi

Voronoi diagrams are useful for making a chart interactive by creating target areas for events like hover and click.

<!-- INJECT:"VoronoiLineChartWithLink" -->

```jsx
<Voronoi
    extent={[[0, 0], [200, 200]]}
    nodes={[{x: 0, y: 10}, {x: 1, y: 5}, {x: 3, y: 3}, {x: 4, y: 1}, {x: 5, y: 6}]}
    x={d => x(d.x)}
    y={d => y(d.y)}
/>
```

## API Reference


<!-- INJECT:"DynamicCrosshairScatterplotWithLink" -->

#### extent

Type: `Array`

Sets the clip extent of the Voronoi layout to the specified bounds. The extent bounds are specified as an array [[x0, y0], [x1, y1]], where x0 is the left side of the extent, y0 is the top, x1 is the right and y1 is the bottom.
Extent should take the dimensions of the accompanying XYPlot into account, so using the plot's width, height and margins: `[[marginLeft, marginTop], [width, height]]`, which coincidentally is the default extent.

#### nodes (required)

Type: `Array`

The array must consist of `{x, y}` objects. These are often identical to the data passed to a series in the accompanying plot.

Each item in the array will create a polygon cell in the resulting Voronoi diagram. Optional properties are:
 - style `Object`
 - className `String`

Example:
```js
[
  { x: 0, y: 10 },
  { x: 1, y: 5, style: { stroke: 'blue' } }
];
```

#### x (optional)

Type: `Function`

Sets the x-coordinate accessor. Often you want to convert the coordinate-values to pixel values like
`x={d => x(d.x)}`. If not provided defaults to wrapping XYPlot's xScale.

#### y (optional)

Type: `Function`

Sets the y-coordinate accessor. Often you want to convert the coordinate-values to pixel values like
`y={d => y(d.y)}`. If not provided defaults to wrapping XYPlot's yScale.

#### onBlur (optional)

Type: `Function`

Add `blur`-event to Voronoi cells

#### onClick (optional)

Type: `Function`

Add `click`-event to Voronoi cells

#### onMouseUp (optional)

Type: `Function`

Add `mouseUp`-event to Voronoi cells

#### onMouseDown (optional)

Type: `Function`

Add `mouseDown`-event to Voronoi cells

#### onHover (optional)

Type: `Function`

Add `hover`-event to Voronoi cells

#### className (optional)

Type: `String`

Add css class to Voronoi container

##### style (optional)

Type: `Object`

Add css styles to Voronoi container

#### polygonStyle (optional)

Type: `Object`

Add css styles to Voronoi cells.

For example:
`polygonStyle={{stroke: 'red'}}`
This will add a red border around cell which is very useful for debugging the Voronoi diagram.
