## Cartesian Grids

<!-- INJECT:"CustomAxisChartWithLink" -->

`VerticalGridLines` and `HorizontalGridLines` show a grid inside the chart. Here is a short example:

```jsx
<XYPlot
  width={300}
  height={300}>
  <VerticalGridLines />
  <HorizontalGridLines />
</XYPlot>
```

Currently both components have following properties:

#### tickTotal (optional)

Type: `number`

Total number of lines on the grid. Already set by default, depends on the size of the grid. Similar to the `tickTotal()` method of d3-axis.

#### tickValues (optional)

Type: `Array<*>`

An array of values (not coordinates!) that where the lines should be shown. Similar to the `tickValues()` method of d3-axis.

#### left (optional)

Type: `number`

Horizontal position of the grid lines in pixels. **Already set by default**, but can be overridden by the user.

#### top (optional)

Type: `number`

Vertical position of the grid lines in pixels. **Already set by default**, but can be overridden by the user.

#### width (optional)

Type: `number`

Width of the grid lines in pixels. **Already set by default**, but can be overridden by the user.

#### height (optional)

Type: `number`

Height of the grid lines in pixels. **Already set by default**, but can be overridden by the user.

#### animation (optional)
See the [XYPlot](xy-plot.md)'s `animation` section for more information.

#### style (optional)

Type: `object`

An CSS object that will style these gridlines.

## Polar Grids

<!-- INJECT:"FauxScatterplotChartWithLink" -->

`CircularGridLines` allows you to draw circular grid lines. This might be useful for a polar scatterplot, as shown above, or a radar chart or any of a wide host of additional contexts. Usage example

```
<XYPlot
  margin={margin}
  xDomain={[-3, 3]}
  yDomain={[-3, 3]}
  width={WIDTH}
  height={HEIGHT}>
  <CircularGridLines />
  <XAxis top={(HEIGHT - margin.top) / 2}/>
  <YAxis left={(WIDTH - margin.left - margin.right) / 2}/>
  <MarkSeries
    strokeWidth={2}
    sizeRange={[5, 15]}
    data={data.map(row => ({
      ...row,
      x: Math.cos(row.theta) * row.r,
      y: Math.sin(row.theta) * row.r
    }))}/>
</XYPlot>
```

It can often be useful to specify the x and y domains on the surrounding XYPLot. CircularGridLines accepts all of the same props as the cartesian grids, but also accepts two more:

#### centerX (optional)

Type: `number`

The left-right value in coordinates of where the circles should be centered.

#### centerY (optional)

Type: `number`

The top-bottom value in coordinates of where the circles should be centered.

#### rRange (optional)
Type:[`number`, `number`]
This allows users to specify the exact pixel range over which they wish their rings to appear.

#### style (optional)

Type: `object`

An CSS object that will style these gridlines. See [style](style.md)

