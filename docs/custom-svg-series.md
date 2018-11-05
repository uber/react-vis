## CustomSVGSeries

When creating visualizations, it is sometimes necessary to get your hands dirty and completely take control over what SVG components will be shown. This could be necessary in situations where you have predefined SVG code that you just want to appear the way you drew it in Sketch (but positioned using coordinates), or maybe you have multiline text annotations that you want to formatted in a particular way, or you just want to use an alternative type of mark instead of the usual scatterplot mark to differentiate series in a set. To serve these and many other tasks, we use the CustomSVGSeries.

<!-- INJECT:"CustomSVGExampleWithLink" -->

The premise of the series is that it simply puts a `<g>` element at a desired x,y location, and the offers you a variety of ways to fill in the contents of that `<g>` element. Here's an example of the data format:

```javascript
const myData = [
  {x: 1, y: 10, customComponent: 'circle', size: 10},
  {x: 1.7, y: 12, size: 20, style: {stroke: 'red', fill: 'orange'}},
  {x: 2, y: 5},
  {x: 3, y: 15},
  {x: 2.5, y: 7, customComponent: (row, positionInPixels) => {
    return (
      <g className="inner-inner-component">
        <circle cx="0" cy="0" r={10} fill="green"/>
        <text x={0} y={0}>
          <tspan x="0" y="0">{`x: ${positionInPixels.x}`}</tspan>
          <tspan x="0" y="1em">{`y: ${positionInPixels.y}`}</tspan>
        </text>
      </g>
    );
  }}
]
```

Just like other series, x and y are used to position the group. The customComponent key word is used to determine how to fill in the svg (see below), and then size is used modify the size of the contents when using a string. Used in context of the series:

```javascript
<XYPlot width={300} height={300}>
  <CustomSVGSeries customComponent="square" data={myData} />
</XYPlot>
```

### Defining your marks

The type of custom svg marks can be determined in one of several ways:

- As a string on a series level
- As a function on a series level
- As a string on row level
- As a function on a row level

There are currently four types of string accessible custom marks: **star**, **square**, **circle**, and **diamond**. If using a string, it can be useful to specify a size for the mark. This is done on a row level (see above data api example), with the size prop. Size is expressed in pixels, and is NOT scaled with the normal react-vis size keyword. They look like this:

<!-- INJECT:"CustomSVGAllTheMarksWithLink" -->

If using a function to defined your mark, it is important to note that the function receives three arguments (customComponent, positionInPixels, globalStyle), where customComponent is the row of data as you have defined it. Thus if you are defining a function for the series as a whole you can make modifications based on the individual row as you go!

## API reference

#### animation (optional)
See the [XYPlot](xy-plot.md)'s `animation` section for more information.

#### className (optional)

Type: `string`

Provide an additional class name for the series.

#### customComponent (optional)

Type: `string|function`

Provides the mark type for the entire series. Defaults to a 'circle'. See `Defining You Marks` above.

#### data

Type: `Array<Object>`

Array of data for the series. See above data format reference.

#### style

Type: `object`

A list of CSS properties to style the series outside of the explicitly set properties. Note that it will override all other properties (ie fill, stroke, opacity, color). See [style](style.md)

## Interaction handlers
#### onNearestX (optional)

Type: `function(value, {event, innerX, index})`

A callback function which is triggered each time the mouse pointer moves. It can access the datapoint of the mark whose x position is the closest to that of the cursor.
Callback is triggered with two arguments. `value` is the data point, `info` object has following properties:
- `innerX` is the left position of the mark;
- `index` is the index of the data point in the array of data;
- `event` is the event object.
See [interaction](interaction.md)

#### onNearestXY (optional)

Type: `function(value, {event, innerX, innerY, index})`

A callback function which is triggered each time the mouse pointer moves. It can access the datapoint of the mark whose position is the closest to that of the cursor.
Callback is triggered with two arguments. `value` is the data point, `info` object has following properties:
- `innerX` is the left position of the mark;
- `innerY` is the top position of the mark;
- `index` is the index of the data point in the array of data;
- `event` is the event object.
See [interaction](interaction.md)

#### onValueMouseOver (optional)
Type: `function(d, {event})`
`mouseover` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.

#### onValueMouseOut (optional)
Type: `function(d, {event})`
`mouseout` event handler for the elements corresponding separate data points. First argument received is, `d`, the relevant data point, and second an object with the only `event` property.
