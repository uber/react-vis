## DecorativeAxis

<!-- INJECT:"ParallelCoordinatesExampleWithLink" -->

In react-vis we try to express all of our components in terms of x and y coordinates. This is splendid and allows to separate a lot of our rendering logic from components! However, sometimes it is necessary to create labels that don't necessarily correspond to the underlying coordinates. For instance in cases of parallel coordinates (above) we want to mark up space in a series of discrete channels to show change across many different variables. To fill this need we use the ```DecorativeAxis``` component!

```javascript
<XYPlot
  xDomain={[0, 1]}
  yDomain={[0, 1]}
  width={300}
  height={300}>
  <DecorativeAxis
    axisStart={{x: 0, y: 0}}
    axisEnd={{x: 1, y: 1}}
    axisDomain={[-10, 100]}
    />
</XYPlot>
```

In the above example we start be setting our domain on the XYPlot (though this would be accomplished automatically if any of it's children had a data prop), and then specified where in the XY space we want our Axis to be (axisStart/axisEnd). Finally we specify the domain that we wish to show across that axis.

<!-- INJECT:"DecorativeAxisCrissCrossWithLink" -->

**WHAT IS THIS FOR** Labeling sections of XY space when we wish the viewer to interpret space in a different way. This could be as part of a Radar chart or radial chart! Or even, the inherently bad Dual Y Axis chart.

**WHAT IS NOT THIS FOR** Using in place of XAxis or YAxis, which should cover most of use cases in which space is being used normally. This type of axis allows for a lot of freedom in it's usage, however that can be dangerous. Most of the time, if you can't get XAxis and YAxis to do what you want, you maybe don't need axes. Be careful!

## API Reference

#### axisStart

Type: `Object`

Specify a start point for the decorativeAxis. It should be expressed in terms of coordinates (not pixels!) as a object like ```{x: 10, y: 1}```

#### axisEnd

Type: `Object`

Specify a start point for the decorativeAxis. It should be expressed in terms of coordinates (not pixels!) as a object like ```{x: 10, y: 1}```

#### axisDomain

Type: `Array`

This array of numbers allows the user to specify the values that will be interpolated across on the axis.

#### tickTotal (optional)

Type: `number`

Total number of ticks on the axis. Already set by default. Similar to the `tickTotal()` method of d3-axis.

#### tickSize (optional)

Type: `number`

Default: `5`

Tick size for the axis. Sets both inner and outer sizes of the tick line. Similar to the `tickSize()` method of d3-axis.

#### tickValue (optional)

Type: `function(*)`

Format function for the tick label. Similar to the `tickFormat()` method of d3-axis.

#### animation (optional)
See the [XYPlot](xy-plot.md)'s `animation` section for more information.

#### style (optional)

Type: `object`

An object that contains CSS properties with which the axis component can be entirely re-styled.
As the Axis component is composite, it is possible to style its different parts individually. See [style](style.md)

The various parts of the axis can be styled by passing an object to the `line`, `ticks`, `text` and `title` properties:

```jsx
<DecorativeAxis style={{
  line: {stroke: '#ADDDE1'},
  ticks: {stroke: '#ADDDE1'},
  text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
}}/>
```
