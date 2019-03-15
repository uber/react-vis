## ChartLabel

When you are styling your chart sometimes you just want to take complete control of label placements. Maybe you want to annotate something, or maybe you just want to place your axis labels in a very specific place, ChartLabel allos you to do just that. Let's look at an example:

```jsx
<XYPlot width={300} height={300}>
  <HorizontalGridLines />
  <VerticalGridLines />
  <XAxis />
  <YAxis />
  <ChartLabel
    text="X Axis"
    className="alt-x-label"
    includeMargin={false}
    xPercent={0.025}
    yPercent={1.01}
    />

  <ChartLabel
    text="Y Axis"
    className="alt-y-label"
    includeMargin={false}
    xPercent={0.06}
    yPercent={0.06}
    style={{
      transform: 'rotate(-90)',
      textAnchor: 'end'
    }}
    />
  <Line data={[{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 12}]} />
</XYPlot>
```

This usage is the same as using title on the XAxis or YAxis, however it allows us greatly flexibility in terms of styles and placement. It is significantly more verbose than using the basic methods on Axis, but the it allows you to do whatever you want. You could place your axis label in the center! You could make them diagonal or a really big. The world is your oyster.

This element is different then the [LabelSeries](label-series.md) because the elements that it describes ARE NOT data carrying. This element will not affect the computed domain or range. It'll just go where you place it and it won't affect anything else.


## API Reference


#### text

Type: `string`

The content of the label


#### className (optional)

Type: `string`

Provide an additional class name the label.


#### includeMargin (optional)

Type: `Boolean`

Defaults to true

Whether or not to use compute the percentage placement with the margins or not.


#### xPercent

Type: `Number` (between 0 and 1)

Where to place the label on the charts width, expressed as percentage (of the width). If the includeMargin flag is included, then this percentage is of the total width, if not then it is of just the inner chart area.


#### yPercent

Type: `Number` (between 0 and 1)

Where to place the label on the charts height, expressed as percentage (of the height). If the includeMargin flag is included, then this percentage is of the total height, if not then it is of just the inner chart area.


#### style

Type: `object`

The specific styles to apply to the text element of the label. These styles are applied directly to the dom object and are interpreted as SVG styles (as opposed to CSS styles).
