## Gradient

Sometimes it is useful to style our svg components using gradients. The way that this is done in React-vis is by making use of the GradientDefs component, which is a simple wrapper on the svg <defs> tag.


<!-- INJECT:"GradientExampleWithLink" -->
<!-- INJECT:"GradientPieWithLink" -->

Simply write gradient commands as you would normally as children of the GradientDefs component, and reference them from your series!

```javascript
<XYPlot width={300} height={300}>
  <GradientDefs>
    <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stopColor="red" stopOpacity={0.4}/>
      <stop offset="100%" stopColor="blue" stopOpacity={0.3} />
    </linearGradient>
  </GradientDefs>
  <AreaSeries
    color={'url(#CoolGradient)'}
    data={[
      {x: 1, y: 10, y0: 1},
      {x: 2, y: 25, y0: 5},
      {x: 3, y: 15, y0: 3}
    ]}/>
</XYPlot>
```

This approach works with both types of gradients (Linear and circular gradients)! The biggest gotcha is that react doesn't play nice the style prop that is normally specified on the gradientTags, so it is best to specify each property directly on the component as above.


<!-- INJECT:"TriangleExampleWithLink" -->

## Component API Reference

#### className (optional)

Type: `string`

Provide an additional class name for the series.
