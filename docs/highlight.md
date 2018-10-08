## Highlight

The highlight component enables use interaction via direct manipulation of chart through dragging and brushing. This component is stateful and can maintain a notion of a dragged box. It can be applied either in two directions or in one!

<!-- INJECT:"ZoomableChartExampleWithLink" -->

It is quite easy to drop this functionality into an existing chart, for example:

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
    drag
    enableX={false}
    onBrush={area => this.setState({filter: area})}
    onDrag={area => this.setState({filter: area})}/>
</XYPlot>
```

An important point to notice here is that direction responsiveness (the thing that makes calling on brush and on drag return meaningful values) is OPT OUT. VERY IMPORTANT! See examples for more details.


<!-- INJECT:"DragableChartExampleWithLink" -->

In drag mode (activated by including the prop drag) you are able to drag a selection box around in the chart space. When putting this shape you first execute a drag action to define the size of the box and then are able to move it around. See above and below for examples.

<!-- INJECT:"BidirectionDragChartWithLink" -->

When designing your listeners it is important to be mindful the lifecycle of this component as there are a lot of edge cases. To wit, if you NOT using drag mode then the life cycle will always be brushStart > brush > brushEnd. While if you are in drag mode it will be brushStart > brush > brushEnd when you are making the box and then dragStart > drag > dragEnd while dragging the box.

The biggest gotchas revolve around click to clear type events. In order to implement this, make sure to include an on End listener to set update your state. In click events there isn't a middle state between start and end because your user does not move the mouse. Be aware! See the code for the examples for more details.

It is important to note that brushing over non-continuous scales is not supported! Specifically this means that you can not brush over category or ordinal scales.



## API Reference

<!-- INJECT:"SelectionPlotExampleWithLink" -->


#### className (optional)

Type: `String`

Add css class to Voronoi container

#### drag (optional)

Type: `Boolean`

Enable dragging interactions

#### enableX (optional)

Type: `Boolean`

Defaults to `true`
Enable brushing and dragging in the x direction

#### enableY (optional)

Type: `Boolean`

Defaults to `true`
Enable brushing and dragging in the y direction

#### highlightX (optional)

Type: `String or Number`

Defaults to left edge
Position in x coordinate space to place the left edge of the highlight bar.

#### highlightY (optional)

Type: `String or Number`

Defaults to top edge
Position in y coordinate space to place the top edge of the highlight bar.

#### highlightHeight (optional)

Type: `Number`

Defaults to full height
The height of highlight bar in pixels.

#### highlightWidth (optional)

Type: `Number`

Defaults to full width
The width of highlight bar in pixels.

#### onBrushStart (optional)

Type: `Function`

Function called on the start of brushing.

#### onBrush (optional)

Type: `Function`

Function called on the start of brushing.

#### onBrushEnd (optional)

Type: `Function`

Function called on the start of brushing.

#### onDragStart (optional)

Type: `Function`

Function called on the start of dragging.

#### onDrag (optional)

Type: `Function`

Function called on the start of dragging.

#### onDragEnd (optional)

Type: `Function`

Function called on the start of dragging.
