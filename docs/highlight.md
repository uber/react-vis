## Highlight

The highlight component enables use interaction via direct manipulation of chart through dragging and brushing.

<!-- INJECT:"ZoomableChartExampleWithLink" -->



```jsx
<XYPlot
  width={300}
  height={300}>
  <VerticalGridLines />
  <HorizontalGridLines />
  <XAxis />
  <YAxis />

  <MarkSeries
    className="mark-series-example"
    strokeWidth={2}
    opacity="0.8"
    sizeRange={[5, 15]}
    colorType="literal"
    getColor={d => highlightPoint(d) ? '#EF5D28' : '#12939A'}
    data={data}/>
  <Highlight
    allow={['y', 'x']}
    drag
    onBrush={area => this.setState({filter: area})}
    onDrag={area => this.setState({filter: area})}/>
</XYPlot>
```


<!-- INJECT:"DragableChartExampleWithLink" -->
<!-- INJECT:"BidirectionDragChartWithLink" -->

## API Reference

<!-- INJECT:"SelectionPlotExampleWithLink" -->

### allow (optional)
Type: `One of ['x'] ['y'] ['x', 'y']`
Defaults to ['x', 'y']
Determine what types of dragging and brushing interactions are allowed.

### className (optional)
Type: `String`
Add css class to Voronoi container

### drag (optional)
Type: `Boolean`
Enable dragging interactions

### onBrushStart (optional)
Type: `Function`
Function called on the start of brushing.

### onBrush (optional)
Type: `Function`
Function called on the start of brushing.

### onBrushEnd (optional)
Type: `Function`
Function called on the start of brushing.

### onDragStart (optional)
Type: `Function`
Function called on the start of dragging.

### onDrag (optional)
Type: `Function`
Function called on the start of dragging.

### onDragEnd (optional)
Type: `Function`
Function called on the start of dragging.
