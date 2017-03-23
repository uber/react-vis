## Grids

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
Horizontal position of the grid lines in pixels. **Already set by default**, but can be overriden by the user.

#### top (optional)
Type: `number`  
Vertical position of the grid lines in pixels. **Already set by default**, but can be overriden by the user.

#### width (optional)
Type: `number`  
Width of the grid lines in pixels. **Already set by default**, but can be overriden by the user.

#### height (optional)
Type: `number`  
Height of the grid lines in pixels. **Already set by default**, but can be overriden by the user.

#### animation (optional)
See the [XYPlot](xy-plot.md)'s `animation` section for more information.
