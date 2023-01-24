## Borders

Sometimes when modifying the domain of the XYPlot it can be useful to enforce a border, so that some components appear, and others do not. One way to do this is to use the `Borders` component. It is a simple component that creates rectangles the directly correspond to the margins of the plot.

<!-- INJECT:"GradientExampleWithLink" -->

For example, a set up like this:

```jsx
<XYPlot xDomain={[1.2, 3]} yDomain={[11, 26]} width={300} height={300}>
  <AreaSeries
    data={[
      {x: 1, y: 10, y0: 1},
      {x: 2, y: 25, y0: 5},
      {x: 3, y: 15, y0: 3}
    ]}/>
  <Borders style={{
    bottom: {fill: '#fff'},
    left: {fill: '#fff'},
    right: {fill: '#fff'},
    top: {fill: '#fff'}
  }}/>
  <XAxis />
  <YAxis />
  <AreaSeries
    data={[
      {x: 1, y: 5, y0: 6},
      {x: 2, y: 20, y0: 11},
      {x: 3, y: 10, y0: 9}
    ]}/>
</XYPlot>
```

would cause the first area series to be truncated underneath the borders, while the second one would not be! This level of granular border control can be useful if you are using multiple kinds of series, for instance if you have a mark series that you wish to show the entire mark for, and a line series that you are alright with truncating at the border.

## API Reference

#### className (optional)

Type: `String`

A class name to apply to each of the borders, as well as the root border container. It will be enumerates on top the borders using suffixes, eg if className={"my-cool-class"} the top rectangle will have a class name "my-cool-class-top".

#### style (optional)

Type: `Object`

You can pass a style object to your Hint component to apply your own styles. See [style](style.md)
```jsx
<Borders style={{
  bottom: {fill: '#fff'},
  left: {fill: '#fff'},
  right: {fill: '#fff'},
  top: {fill: '#fff'}
}}/>
```

Because border its made up of four individual rectangular components (there being four borders on an XYPlot) it is advisable to specify styles for all four rectangles. This can be done using either the style object or css-classes. Alternatively, if all the borders should be treated the same, this can be achieved by supplying an all object to style. This can be then over-ridden:

```jsx
<Borders style={{
  all: {fill: '#fff'}
  bottom: {fill: '#0f0'}
}}/>
```
