### Your first chart

We tried to make react-vis syntax as close to the traditional react syntax. You have components which have props and possibly children. 

Every react-vis chart is inside a component called XYPlot, for which a height and a width must be specified:

```jsx
<XYPlot height={300} width = {300} />
```

And all the elements of a chart - series, axes, gridlines, etc. are other components, which will be children of XYPlot.

```jsx
const data = [
  {x: 0, y: 8},
  {x: 1, y: 5},
  {x: 2, y: 4},
  {x: 3, y: 9},
  {x: 4, y: 1},
  {x: 5, y: 7},
  {x: 6, y: 6},
  {x: 7, y: 3},
  {x: 8, y: 2},
  {x: 9, y: 0}
];
<XYPlot height={300} width= {300}>
  <VerticalGridLines />
  <HorizontalGridLines />
  <XAxis />
  <YAxis />
  <LineSeries data={data} />
</XYPlot>
```

And like in traditional react, order matters as components are drawn in order. In the previous example, the gridlines are drawn below the line series, but in this next example, they will be drawn above it.

```jsx
<XYPlot height={300} width= {300}>
  <LineSeries data={data} />
  <VerticalGridLines />
  <HorizontalGridLines />
  <XAxis />
  <YAxis />
</XYPlot>
```

