## Clip

Depending on the data and domain, sometimes the series in the plot will extend into the axis. This can either be solved with a [Border](border.md), or the elements can be clipped.

To have the rendered series, clipped you will need to set up a `clipPath` and tell the series to use it.

As seen below, the `clipPath` can be created with the `ContentClipArea` component, and its `id` can be referenced by the components that want to be clipped.

```jsx
<XYPlot>
  <ContentClipArea id="clip" />
  <LineSeries style={{clipPath: 'url(#clip)'}} />
</XYPlot>
```



## API Reference

#### id (optional)

Type: `String`

The id to assign to the `clipArea`. If not provided, this will default to `content-area`
